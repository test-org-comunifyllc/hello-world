/* eslint-disable consistent-return */
/* eslint-disable prefer-spread */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PlatformSettings, PrismaClient } from '@prisma/client';
import HttpException from '@exceptions/HttpException';
import TransformHandler from '@modules/integration/transforms/transform';
import LoadingData from '@modules/integration/loading/loading';
import * as StatusCode from '@utils/httpstatuscodes';
import { Comments, Discussion, Members } from '@/modules/integration/interface/integration.interface';
import { JobExecutionStep, JobStatus, JobType } from '../constants/integrations.constants';

const prisma = new PrismaClient();

type CommentType = Comments[];
type DiscussionType = Discussion[];
type Header = { accept: string; Authorization: string };
type InitialFetchedData = { userData: []; activityData: []; commentData: [] };
type ParamsType = { expand?: string; limit: number; page: number; dateInserted?: string; dateLastComment?: string };
class VanilaForumService {
  public vanilaBaseUrl: string;

  public vanilaAccessToken: string;

  public platform: string;

  public headers: Header;

  public workspaceId: string;

  public platformId: string;

  public workspacePlatformSettingsId: string;

  public lastFetched: Date;

  transformHandler: TransformHandler;

  loadingData: LoadingData;

  constructor(data) {
    this.vanilaBaseUrl = `${data.vanillaBaseUrl}/api/v2`;
    this.vanilaAccessToken = data.vanillaAccessToken;
    this.platform = data.type;
    this.headers = {
      accept: 'application/json',
      Authorization: this.vanilaAccessToken
    };
    this.transformHandler = new TransformHandler();

    this.workspaceId = data.workspaceId;
    this.platformId = data.platformId;
    this.workspacePlatformSettingsId = data.workspacePlatformSettingsId ?? null;
    this.lastFetched = data.lastTime ?? null;
  }

  async connect(): Promise<string> {
    try {
      await this.checkHealth();
      return this.vanilaAccessToken;
    } catch (error) {
      throw error;
    }
  }

  public async getInitialData(): Promise<InitialFetchedData> {
    const jobMasterId = await this.writeIntojobMaster();
    const responseData = await this.fetchData(jobMasterId);
    return responseData;
  }

  public async getLastActivities(): Promise<InitialFetchedData> {
    const jobMasterId = await this.writeIntojobMaster();
    const initialFetchedData = await this.fetchData(jobMasterId);
    return initialFetchedData;
  }

  private async fetchData(jobMasterId): Promise<InitialFetchedData> {
    try {
      const communityName = await this.getCommunity(jobMasterId);
      const [users, activities, comments] = await Promise.all([
        this.getUsers(jobMasterId),
        this.getActivity(jobMasterId),
        this.getComments(jobMasterId)
      ]);
      const schema = await this.fetchFieldFromDb();
      const jobEntryParams = { jobMasterId, header: this.headers };
      const transformedUsers = await this.transformHandler.transformWholeData(users, schema.members, jobEntryParams);
      const transformedActivities = await this.transformHandler.transformWholeData(
        activities,
        schema.activities,
        jobEntryParams
      );
      const transformedComments = await this.transformHandler.transformWholeData(
        comments,
        schema.comments,
        jobEntryParams
      );
      const platformMember = await prisma.member.findMany({
        where: { platformId: this.platformId, workspaceId: this.workspaceId }
      });
      const existedMember = null;
      let userData: [] = [];
      const promiseUserData = transformedUsers.map(async (item) => {
        const id = uuidv4();
        // if (platformMember) {
        //   existedMember = await prisma.member.findFirst({
        //     where: {
        //       workspaceId: this.workspaceId,
        //       platformId: this.platformId,
        //       platformMemberId: item.platformMemberId.toString()
        //     }
        //   });
        // }

        // if (!existedMember) {
        return {
          ...item,
          id,
          platformMemberId: item.platformMemberId.toString(),
          comunifyMemberId: id,
          workspaceId: this.workspaceId,
          platformId: this.platformId,
          platformName: this.platform
        };
        // }
      });

      userData = await Promise.all<[]>(promiseUserData);
      if (userData.length) {
        const jobExecutionParams = {
          jobMasterId,
          headers: this.headers
        };
        LoadingData.InsertUser(userData, jobExecutionParams);
      }
      let activityData: [] = [];
      const platformActivities = await prisma.activities.findMany({
        where: { platformId: this.platformId, workspaceId: this.workspaceId }
      });
      if (transformedActivities.length) {
        let existedActivities = null;
        const promiseActivityData = transformedActivities.map(async (item) => {
          const platformMemberId = item.platformMemberId.toString();
          const member = await prisma.member.findFirst({
            where: { platformId: this.platformId, platformMemberId, workspaceId: this.workspaceId }
          });

          if (platformActivities) {
            existedActivities = await prisma.activities.findFirst({
              where: {
                activityId: item.activityId.toString(),
                workspaceId: this.workspaceId,
                platformId: this.platformId
              }
            });
          }

          const communifyId = uuidv4();
          if (!existedActivities) {
            return {
              ...item,
              id: communifyId,
              type: 'Discussion',
              workspaceId: this.workspaceId,
              activityId: item.activityId.toString(),
              platform: this.platform,
              comunifyMemberId: member.id,
              platformId: this.platformId,
              displayValue: `sent a message in ${communityName}`,
              platformMemberId,
              memberId: member.id
            };
          }
        });
        activityData = await Promise.all<[]>(promiseActivityData);
        const insertActivityParams = {
          jobMasterId,
          headers: this.headers
        };
        LoadingData.InsertActivity(activityData, insertActivityParams);
      }
      let commentData: [] = [];
      if (transformedComments.length) {
        let existedComments = null;
        const promiseCommentData = transformedComments.map(async (item) => {
          const platformMemberId = item.platformMemberId.toString();
          const member = await prisma.member.findFirst({
            where: { platformId: this.platformId, platformMemberId, workspaceId: this.workspaceId }
          });

          if (platformActivities) {
            existedComments = await prisma.activities.findFirst({
              where: {
                activityId: item.activityId.toString(),
                workspaceId: this.workspaceId,
                platformId: this.platformId
              }
            });
          }

          const communifyId = uuidv4();
          if (!existedComments) {
            return {
              ...item,
              id: communifyId,
              platformMemberId,
              type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
              workspaceId: this.workspaceId,
              activityId: item.activityId.toString(),
              platform: this.platform,
              comunifyMemberId: member.id,
              platformId: this.platformId,
              displayValue: `replied to a message in ${communityName}`,
              memberId: member.id
            };
          }
        });
        commentData = await Promise.all<[]>(promiseCommentData);
        const insertCommentParams = {
          jobMasterId,
          headers: this.headers
        };
        LoadingData.InsertActivity(commentData, insertCommentParams);
      }
      const updateWorkspaceSettingsParams = {
        jobMasterId,
        headers: this.headers
      };
      LoadingData.updatePlatformsettings(this.workspacePlatformSettingsId, updateWorkspaceSettingsParams);
      LoadingData.updateJobMaster(jobMasterId, JobStatus.Success);
      return { userData, activityData, commentData };
    } catch (error) {
      const jobExecutionParams = {
        jobMasterId,
        jobExecutionStepStatus: JobStatus.Failed,
        jobExecutionStepStatusCode: error.response?.status || StatusCode.BadRequest,
        jobExecutionStepStartPayload: this.headers,
        requestParams: this.headers,
        responsePayload: error
      };
      await LoadingData.writeJobExecution(jobExecutionParams);
      LoadingData.updateJobMaster(jobMasterId, JobStatus.Failed);
    }
  }

  public async getUsers(jobMasterId): Promise<Members[]> {
    const url = `${this.vanilaBaseUrl}/users`;
    try {
      let page = 1;
      const userData: [][] = [];
      let value = true;
      let params: ParamsType = { expand: 'extended', limit: 500, page };

      if (this.lastFetched) {
        const fetchDataFrom = new Date(this.lastFetched).toISOString();
        params = { expand: 'extended', limit: 500, page, dateInserted: `>${fetchDataFrom}` };
      }
      for (let i = 0; value; i + 1) {
        params.page = page;
        const { data } = await axios.get<[]>(url, {
          headers: this.headers,
          params
        });
        userData.push(data);
        page += 1;

        const jobExecutionParams = {
          jobMasterId,
          jobExecutionStep: JobExecutionStep['connect and extract'],
          jobExecutionStepStatus: JobStatus.Success,
          jobExecutionStepStatusCode: StatusCode.OK,
          jobExecutionStepStartPayload: this.headers,
          requestUrl: url,
          requestParams: params,
          responsePayload: userData
        };
        await LoadingData.writeJobExecution(jobExecutionParams);

        if (data.length < 500) {
          value = false;
        }
      }

      const mergedUsersList: [] = [].concat.apply([], userData);
      return mergedUsersList;
    } catch (error) {
      const jobExecutionParams = {
        jobMasterId,
        jobExecutionStepStatus: JobStatus.Failed,
        jobExecutionStepStatusCode: error.response?.status || StatusCode.BadRequest,
        jobExecutionStepStartPayload: this.headers,
        requestUrl: url,
        requestParams: this.headers,
        responsePayload: error
      };
      await LoadingData.writeJobExecution(jobExecutionParams);
      LoadingData.updateJobMaster(jobMasterId, JobStatus.Failed);
      if (axios.isAxiosError(error)) {
        throw new HttpException(500, error.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async getActivity(jobMasterId): Promise<[]> {
    const url = `${this.vanilaBaseUrl}/discussions`;
    try {
      let page = 1;
      const discussionData: [][] = [];
      let value = true;

      const yesterday: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const filterDate: string = yesterday.toISOString();
      let params: ParamsType = { dateInserted: `>${filterDate}`, limit: 500, page };

      if (this.lastFetched) {
        const fetchDataFrom = new Date(this.lastFetched).toISOString();
        params = { limit: 500, page, dateInserted: `>${fetchDataFrom}` };
      }
      for (let i = 0; value; i + 1) {
        params.page = page;
        const { data } = await axios.get<[]>(url, {
          headers: this.headers,
          params
        });
        discussionData.push(data);
        page += 1;

        const jobExecutionParams = {
          jobMasterId,
          jobExecutionStep: JobExecutionStep['connect and extract'],
          jobExecutionStepStatus: JobStatus.Success,
          jobExecutionStepStatusCode: StatusCode.OK,
          jobExecutionStepStartPayload: this.headers,
          requestUrl: url,
          requestParams: params,
          responsePayload: discussionData
        };
        await LoadingData.writeJobExecution(jobExecutionParams);

        if (data.length < 500) {
          value = false;
        }
      }

      const mergedDiscussionList = [].concat.apply([], discussionData);
      return mergedDiscussionList;
    } catch (error) {
      const jobExecutionParams = {
        jobMasterId,
        jobExecutionStepStatus: JobStatus.Failed,
        jobExecutionStepStatusCode: error.response?.status || StatusCode.BadRequest,
        jobExecutionStepStartPayload: this.headers,
        requestUrl: url,
        requestParams: this.headers,
        responsePayload: error
      };
      await LoadingData.writeJobExecution(jobExecutionParams);
      LoadingData.updateJobMaster(jobMasterId, JobStatus.Failed);
      if (axios.isAxiosError(error)) {
        throw new HttpException(500, error.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async getComments(jobMasterId): Promise<Comments[]> {
    const commentUrl = `${this.vanilaBaseUrl}/comments`;
    try {
      let page = 1;
      const discussionData: DiscussionType[] = [];
      let value = true;
      const comments: CommentType[] = [];
      let mergedComments: Comments[] = [];
      const yesterday: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const filteredDate: string = yesterday.toISOString(); // '2022-06-20T04:54:13.116Z'
      let params: ParamsType = { dateLastComment: `>${filteredDate}`, limit: 500, page };

      if (this.lastFetched) {
        const fetchDataFrom = new Date(this.lastFetched).toISOString();
        params = { limit: 500, page, dateLastComment: `>${fetchDataFrom}` };
      }
      const url = `${this.vanilaBaseUrl}/discussions`;
      for (let i = 0; value; i + 1) {
        params.page = page;
        const { data: discussions } = await axios.get<[]>(url, {
          headers: this.headers,
          params
        });
        discussionData.push(discussions);
        page += 1;

        const jobExecutionParams = {
          jobMasterId,
          jobExecutionStep: JobExecutionStep['connect and extract'],
          jobExecutionStepStatus: JobStatus.Success,
          jobExecutionStepStatusCode: StatusCode.OK,
          jobExecutionStepStartPayload: this.headers,
          requestUrl: url,
          requestParams: params,
          responsePayload: discussionData
        };
        await LoadingData.writeJobExecution(jobExecutionParams);
        if (discussions.length < 500) {
          value = false;
        }
      }
      const mergedDiscussionList: [] = [].concat.apply([], discussionData);

      if (mergedDiscussionList.length) {
        const commentParams = { discussionID: null, expand: 'all' };
        const discussionId = mergedDiscussionList.map((discussion: Discussion) => discussion.discussionID);
        for (const id of discussionId) {
          commentParams.discussionID = id;
          const { data: comment } = await axios.get(commentUrl, {
            headers: this.headers,
            params: commentParams
          });
          const jobExecutionParams = {
            jobMasterId,
            jobExecutionStep: JobExecutionStep['connect and extract'],
            jobExecutionStepStatus: JobStatus.Success,
            jobExecutionStepStatusCode: StatusCode.OK,
            jobExecutionStepStartPayload: this.headers,
            requestUrl: commentUrl,
            requestParams: commentParams,
            responsePayload: discussionData
          };
          await LoadingData.writeJobExecution(jobExecutionParams);
          if (comment.length) {
            const userId = comment[0].insertUserID;
            const { data: user } = await axios.get(`${this.vanilaBaseUrl}/users/${userId}`, {
              headers: this.headers
            });
            comment[0].insertUserID = { name: user.name, email: user.email };
            comments.push(comment);
          }
        }
        mergedComments = [].concat.apply([], comments);
      }
      return mergedComments;
    } catch (error) {
      const jobExecutionParams = {
        jobMasterId,
        jobExecutionStepStatus: JobStatus.Failed,
        jobExecutionStepStatusCode: error.response?.status || StatusCode.BadRequest,
        jobExecutionStepStartPayload: this.headers,
        requestUrl: commentUrl,
        requestParams: this.headers,
        responsePayload: error
      };
      await LoadingData.writeJobExecution(jobExecutionParams);
      LoadingData.updateJobMaster(jobMasterId, JobStatus.Failed);
      if (axios.isAxiosError(error)) {
        throw new HttpException(500, error.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async getCommunity(jobMasterId): Promise<string> {
    const url = `${this.vanilaBaseUrl}/config`;
    try {
      const { data: communityData } = await axios.get(url);
      return communityData['garden.title'];
    } catch (error) {
      const jobExecutionParams = {
        jobMasterId,
        jobExecutionStepStatus: JobStatus.Failed,
        jobExecutionStepStatusCode: error.response?.status || StatusCode.BadRequest,
        jobExecutionStepStartPayload: this.headers,
        requestUrl: url,
        requestParams: this.headers,
        responsePayload: error
      };
      await LoadingData.writeJobExecution(jobExecutionParams);
      LoadingData.updateJobMaster(jobMasterId, JobStatus.Failed);
      if (axios.isAxiosError(error)) {
        throw new HttpException(500, error.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async checkHealth(): Promise<string> {
    const userId = await this.getUserIdFromWorkSpace();
    const jobMasterParams = {
      jobOwnerId: userId,
      jobOwnerWorkspaceId: this.workspaceId,
      jobStatus: JobStatus.Inprogress,
      jobType: JobType.Connect,
      jobStatusCode: 200,
      actionPayload: JSON.stringify(this.headers)
    };
    const jobEntry = await LoadingData.writeJobMaster(jobMasterParams);
    const url = `${this.vanilaBaseUrl}/tokens`;
    try {
      const { data: communityData } = await axios.get(url, {
        headers: this.headers
      });
      const jobExecutionParams = {
        jobMasterId: jobEntry.id,
        jobExecutionStepStatus: JobStatus.Success,
        jobExecutionStepStatusCode: StatusCode.OK,
        jobExecutionStepStartPayload: this.headers,
        requestUrl: url,
        requestParams: this.headers,
        responsePayload: communityData
      };
      await LoadingData.writeJobExecution(jobExecutionParams);
      return communityData;
    } catch (error) {
      const jobExecutionParams = {
        jobMasterId: jobEntry.id,
        jobExecutionStepStatus: JobStatus.Failed,
        jobExecutionStepStatusCode: error.response?.status || StatusCode.BadRequest,
        jobExecutionStepStartPayload: this.headers,
        requestUrl: url,
        requestParams: this.headers,
        responsePayload: error
      };
      await LoadingData.writeJobExecution(jobExecutionParams);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ENOTFOUND') {
          throw new HttpException(400, 'Community not exist');
        } else if (error.response.status === 403) {
          throw new HttpException(400, 'Invalid token');
        }
        throw new HttpException(500, error.message);
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async writeIntojobMaster(): Promise<string> {
    const userId = await this.getUserIdFromWorkSpace();
    const jobMasterParams = {
      jobOwnerId: userId,
      jobOwnerWorkspaceId: this.workspaceId,
      jobStatus: JobStatus.Inprogress,
      jobType: JobType.InitialFetch,
      actionPayload: JSON.stringify(this.headers)
    };
    const { id: jobMasterId } = await LoadingData.writeJobMaster(jobMasterParams);
    return jobMasterId;
  }

  async getUserIdFromWorkSpace() {
    const workspace = await prisma.workspaces.findFirst({ where: { id: this.workspaceId } });
    return workspace.userId;
  }

  public async fetchFieldFromDb() {
    const platformsettingsObj: PlatformSettings = await prisma.platformSettings.findUnique({
      where: { platformId: this.platformId }
    });
    const members = await prisma.workspacePlatformSchemaMappings.findMany({
      where: {
        platformSettingsId: platformsettingsObj.id,
        schema: { type: 'Member' },
        platformSchema: { type: 'Member' }
      },
      include: {
        schema: true,
        platformSchema: true
      }
    });

    const activities = await prisma.workspacePlatformSchemaMappings.findMany({
      where: {
        platformSettingsId: platformsettingsObj.id,
        schema: { type: 'Activity' },
        platformSchema: { type: 'Activity' }
      },
      include: {
        schema: true,
        platformSchema: true
      }
    });
    const comments = await prisma.workspacePlatformSchemaMappings.findMany({
      where: {
        platformSettingsId: platformsettingsObj.id,
        schema: { type: 'Comments' },
        platformSchema: { type: 'Comments' }
      },
      include: {
        schema: true,
        platformSchema: true
      }
    });
    return { members, activities, comments };
  }
}

export default VanilaForumService;
