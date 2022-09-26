// import { Members } from '../src/modules/integration/interface/member.interface';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/extensions
import HttpException from '@exceptions/HttpException';
import TransformHandler from '@/modules/integration/services/transform';
import { Comments, Discussion, Members } from '@/modules/integration/interface/integration.interface';

const prisma = new PrismaClient();

type CommentType = Comments[];
type DiscussionType = Discussion[];

// const BASE_URL: string = "https://community.kaltura.com/api/v2";
// const ACCESS_TOKEN = "Bearer va.-Dapdhsr0h0PkdDGD_mS2TDw9a9NLB4a.QjKmdQ.VQYlH3p";

// type MembersList = Members[];
// type MemberResponse = MembersList[];

// const comments = [{
//     "commentID": 1132,
//     "discussionID": 387,
//     "name": "Re: Blur or Background Options for Kaltura Meetings",
//     "categoryID": 2,
//     "body": "<p>Yay that blurred backgrounds have been released (for Chrome).</p>",
//     "dateInserted": "2022-07-25T14:12:26+00:00",
//     "dateUpdated": null,
//     "insertUserID": {
//         "name": "Choachy",
//         "email": "troy-carroll@utc.edu"
//     },
//     "updateUserID": null,
//     "score": 1,
//     "insertUser": {
//         "userID": 195,
//         "name": "Choachy",
//         "url": "https://community.kaltura.com/profile/Choachy",
//         "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/5HDZAQFYIK7S/nWURFBVCN69AK.jpg",
//         "dateLastActive": "2022-07-25T14:01:21+00:00",
//         "banned": 0,
//         "punished": 0,
//         "private": false,
//         "label": "✭"
//     },
//     "url": "https://community.kaltura.com/discussion/comment/1132#Comment_1132",
//     "type": "comment",
//     "format": "Rich",
//     "attributes": {},
//     "reactions": [
//         {
//             "tagID": 3,
//             "urlcode": "Promote",
//             "name": "Promote",
//             "class": "Positive",
//             "count": 0
//         },
//         {
//             "tagID": 5,
//             "urlcode": "Insightful",
//             "name": "Insightful",
//             "class": "Positive",
//             "count": 0
//         },
//         {
//             "tagID": 9,
//             "urlcode": "Like",
//             "name": "Like",
//             "class": "Positive",
//             "count": 1
//         },
//         {
//             "tagID": 13,
//             "urlcode": "Awesome",
//             "name": "Awesome",
//             "class": "Positive",
//             "count": 0
//         }
//     ]
// },
// {
//     "commentID": 1131,
//     "discussionID": 381,
//     "name": "Re: kalvidpres goes unsupported",
//     "categoryID": 21,
//     "body": "<p>Hi , I think this will be best to check with Kaltura customer care team.</p>",
//     "dateInserted": "2022-07-13T08:54:07+00:00",
//     "dateUpdated": null,
//     "insertUserID": {
//         "name": "Meytal_Zeldich",
//         "email": "meytal.zeldich@kaltura.com"
//     },
//     "updateUserID": null,
//     "score": null,
//     "insertUser": {
//         "userID": 624,
//         "name": "Meytal_Zeldich",
//         "url": "https://community.kaltura.com/profile/Meytal_Zeldich",
//         "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/YVATYID17IJX/nAM3R3VT61EX5.jpeg",
//         "dateLastActive": "2022-08-10T08:20:48+00:00",
//         "banned": 0,
//         "punished": 0,
//         "private": false,
//         "label": "admin"
//     },
//     "url": "https://community.kaltura.com/discussion/comment/1131#Comment_1131",
//     "type": "comment",
//     "format": "Rich",
//     "attributes": {
//         "answer": {
//             "status": "pending",
//             "dateAccepted": null,
//             "acceptUserID": null
//         }
//     },
//     "reactions": [
//         {
//             "tagID": 3,
//             "urlcode": "Promote",
//             "name": "Promote",
//             "class": "Positive",
//             "count": 0
//         },
//         {
//             "tagID": 5,
//             "urlcode": "Insightful",
//             "name": "Insightful",
//             "class": "Positive",
//             "count": 0
//         },
//         {
//             "tagID": 9,
//             "urlcode": "Like",
//             "name": "Like",
//             "class": "Positive",
//             "count": 0
//         },
//         {
//             "tagID": 13,
//             "urlcode": "Awesome",
//             "name": "Awesome",
//             "class": "Positive",
//             "count": 0
//         }
//     ]
// }];

// const discussion = [
//     {
//         "discussionID": 22,
//         "type": "discussion",
//         "name": "How to begin a great discussion",
//         "body": "<h2>Thank you for starting new discussions and asking questions. The more you contribute, the better this community becomes. Here are a few tips to help you create great discussions:</h2><h3>Make the discussion title or question as descriptive as possible.</h3><p>A good discussion title is a short preview of your post and is what gets people to click and read. A well written title is also going to help search engines better index your post which will bring more people into the discussion. For example, instead of ‘Won’t Connect’, try ‘Help, I’m having problems getting my Acme modem into bridge mode.’</p><h3>Proof read.</h3><p>Spelling mistakes, typos, and bad grammar will distract readers from the point you’re trying to make. Vanilla automatically saves drafts as you type. If you’re writing a long post, save it as a draft and come back to it after a few minutes or as long as it takes your brain to forget what you had written.</p><h3>Use minimal formatting.</h3><p>Overly formatted posts can also distract from the message and it encourages others to do likewise and you end up with a hard to read thread.</p><h3>Put your post in the right category.</h3><p>The right category can be the one that has a relevant category name or it can be a category where this kind of post is often made.</p><h3>Use tags.</h3><p>Tags are helpful for others to find keyword related posts. It also helps the site admins get a sense for what topics are popular.</p><h3>If you want responses, ask for them.</h3><p>In marketing this is called a ‘call to action’. If you want others to comment, you can encourage them by asking them to do so. If your post is just an FYI then don’t.</p><h3>Go easy on the insider jargon.</h3><p>Inside jokes and inside references can be fun and make the community unique but too much of it can turn off new members.</p><h3>Add an image.</h3><p>Images add visual interest and make your post look great when shared to social networks. You can embed an image using the button bar or you can upload one from your desktop or phone.</p><h3>Mention others.</h3><p>Credit other members if you are building off their previous comments or if you want to draw them into the discussion. Put the @ before a username to mention someone.</p><h3>Take ownership.</h3><p>Most important of all, take ownership of the discussions that you have created. Respond to comments promptly and thoughtfully. Thank others for commenting on your discussion and help with moderation if things get heated.</p><h3>Thanks for posting!</h3><h3>Have fun!</h3><p>Dani</p><p>Head of Community at Kaltura</p><p>*Click on a positive reaction if helpful</p><p>*Accept Answers if it resolved your question</p>",
//         "categoryID": 11,
//         "dateInserted": "2021-05-06T19:39:21+00:00",
//         "dateUpdated": null,
//         "dateLastComment": "2021-05-06T19:39:21+00:00",
//         "insertUserID": 8,
//         "insertUser": {
//             "userID": 8,
//             "name": "Dani",
//             "url": "https://community.kaltura.com/profile/Dani",
//             "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/4S4RVYPY0E07/nRAMXKFGB50CJ.jpg",
//             "dateLastActive": "2022-02-04T06:23:32+00:00",
//             "banned": 0,
//             "punished": 0,
//             "private": false,
//             "label": "admin"
//         },
//         "updateUserID": null,
//         "lastUserID": 8,
//         "lastUser": {
//             "userID": 8,
//             "name": "Dani",
//             "url": "https://community.kaltura.com/profile/Dani",
//             "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/4S4RVYPY0E07/nRAMXKFGB50CJ.jpg",
//             "dateLastActive": "2022-02-04T06:23:32+00:00",
//             "banned": 0,
//             "punished": 0,
//             "private": false,
//             "label": "admin"
//         },
//         "pinned": true,
//         "pinLocation": "recent",
//         "closed": false,
//         "sink": false,
//         "countComments": 0,
//         "countViews": 893,
//         "score": 6,
//         "hot": 6,
//         "url": "https://community.kaltura.com/discussion/22/how-to-begin-a-great-discussion",
//         "canonicalUrl": "https://community.kaltura.com/discussion/22/how-to-begin-a-great-discussion",
//         "format": "Rich",
//         "statusID": 0,
//         "attributes": {},
//         "internalStatusID": 8,
//         "bookmarked": false,
//         "unread": false,
//         "resolved": true
//     },
//     {
//         "discussionID": 380,
//         "type": "discussion",
//         "name": "Customers care chat services",
//         "body": "<p>Greetings, </p><p>As most of you probably know, we went live with our chat services for all customers back on August 2nd!  </p><p>Many of you have already used this great chat service! We are incredibly happy that this channel of communication has been helping our customers - and the feedback from the surveys we received reinforces that belief.  </p><p>Chat support is designed to provide fast answers to how-to questions, assist with small or large issues, speed up information-gathering, and even follow up on an existing case — all in real-time.</p><p>In fact, more than 40% of the inquiries and concerns that are being reported to us over the chat are being solved live in the same chat session in which the issue was reported. This is a great Time for Resolution achievement that we are happy and proud to provide to our customers with. Thus, we encourage many of you that haven't taken this service for a test drive yet (including our Platinum tier customers) to give it a try!</p><p>So..... </p><p><strong>Where is it available</strong>: The new live chat module is available on the homepage of the Customer Care Portal: <a href=\"https://support.kaltura.com/\" rel=\"nofollow noreferrer ugc\">https://support.kaltura.com/</a>. Chat is available only for those of you who have access to the Customer Care Portal and permission to open tickets and inquires prior to the Chat service going live. </p><p><strong>When is it available</strong>: Chat module is available during both EMEA and US business hours. </p><p><strong>How does it work</strong>: We have a dedicated Chat Support team in place to cater this new service. </p><p><strong>Is there a cost for chat support?</strong> We have decided to include this premium service in customers’ existing service packages. </p><p>Providing you with the best possible service is our continued goal and commitment. Use this service and share your feedback with us! </p><p>Happy chatting!</p>",
//         "categoryID": 21,
//         "dateInserted": "2022-04-11T07:53:15+00:00",
//         "dateUpdated": "2022-07-05T07:15:58+00:00",
//         "dateLastComment": "2022-04-11T07:53:15+00:00",
//         "insertUserID": 624,
//         "insertUser": {
//             "userID": 624,
//             "name": "Meytal_Zeldich",
//             "url": "https://community.kaltura.com/profile/Meytal_Zeldich",
//             "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/YVATYID17IJX/nAM3R3VT61EX5.jpeg",
//             "dateLastActive": "2022-08-18T13:34:37+00:00",
//             "banned": 0,
//             "punished": 0,
//             "private": false,
//             "label": "admin"
//         },
//         "updateUserID": 13,
//         "lastUserID": 624,
//         "lastUser": {
//             "userID": 624,
//             "name": "Meytal_Zeldich",
//             "url": "https://community.kaltura.com/profile/Meytal_Zeldich",
//             "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/YVATYID17IJX/nAM3R3VT61EX5.jpeg",
//             "dateLastActive": "2022-08-18T13:34:37+00:00",
//             "banned": 0,
//             "punished": 0,
//             "private": false,
//             "label": "admin"
//         },
//         "pinned": true,
//         "pinLocation": "recent",
//         "closed": false,
//         "sink": false,
//         "countComments": 0,
//         "countViews": 489,
//         "score": 1,
//         "hot": 1,
//         "url": "https://community.kaltura.com/discussion/380/customers-care-chat-services",
//         "canonicalUrl": "https://community.kaltura.com/discussion/380/customers-care-chat-services",
//         "format": "Rich",
//         "statusID": 0,
//         "attributes": {},
//         "internalStatusID": 7,
//         "bookmarked": false,
//         "unread": false,
//         "resolved": false
//     }];

class VanilaForumService {
  public vanilaBaseUrl: string;

  public vanilaAccessToken: string;

  public platform: string;

  public headers: {};

  public workspaceId: string;

  public platformId: string;

  transformHandler: TransformHandler;

  constructor(data) {
    this.vanilaBaseUrl = `${data.vanilaBaseUrl}/api/v2`;
    this.vanilaAccessToken = data.vanilaAccessToken;
    this.platform = data.type;
    this.headers = {
      accept: 'application/json',
      Authorization: this.vanilaAccessToken
    };
    this.transformHandler = new TransformHandler(data.platformId);

    this.workspaceId = data.workspaceId;
    this.platformId = data.platformId;
  }

  async getIntialdb(type) {
    const db = await this.transformHandler.getDb(type);
    this.transformHandler.setDb(db);
    return 'null';
  }

  async connect(): Promise<string> {
    try {
      await this.checkHealth();
      return this.vanilaAccessToken;
    } catch (error) {
      throw error;
    }
  }

  public async getInitialData(): Promise<{}> {
    // const users = await this.getUsers();
    // const activities = await this.getActivity();
    const communityName = await this.getCommunity();
    const [users, activities, comments] = await Promise.all<any>([
      this.getUsers(),
      this.getActivity(),
      this.getComments()
    ]);
    const transformedUsers = this.transformWholeData(users, 'Member');
    const transformedActivities = this.transformWholeData(activities, 'Activity');
    const transformedComments = await this.transformWholeData(comments, 'Comments');
    const userData = transformedUsers.map((item) => {
      const id = uuidv4();

      return {
        ...item,
        id,
        platformMemberId: item.platformMemberId.toString(),
        comunifyMemberId: id,
        workspaceId: this.workspaceId,
        platformId: this.platformId,
        platformName: this.platform
      };
    });
    await prisma.member.createMany({
      data: userData,
      skipDuplicates: true
    });
    let activityData: [] = [];
    if (transformedActivities) {
      const promiseActivityData = transformedActivities.map(async (item) => {
        // find memberId
        console.log(item.type.charAt(0).toUpperCase() + item.type.slice(1));

        const platformMemberId = item.platformMemberId.toString();
        const member = await prisma.member.findFirst({
          where: { platformId: this.platformId, platformMemberId }
        });

        const communifyId = uuidv4();
        return {
          ...item,
          id: communifyId,
          type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
          workspaceId: this.workspaceId,
          activityId: item.activityId.toString(),
          platform: this.platform,
          comunifyMemberId: member.id,
          platformId: this.platformId,
          displayValue: `sent a message in ${communityName}`,
          channelId: communityName,
          platformMemberId,
          memberId: member.id
        };
      });
      activityData = await Promise.all<[]>(promiseActivityData);
      await prisma.activities.createMany({
        data: activityData,
        skipDuplicates: true
      });
    }
    let commentData: [] = [];
    if (transformedComments) {
      const promiseCommentData = transformedComments.map(async (item) => {
        const platformMemberId = item.platformMemberId.toString();
        const member = await prisma.member.findFirst({
          where: { platformId: this.platformId, platformMemberId }
        });
        const communifyId = uuidv4();
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
          channelId: communityName,
          memberId: member.id
        };
      });
      commentData = await Promise.all<[]>(promiseCommentData);
      await prisma.activities.createMany({
        data: commentData,
        skipDuplicates: true
      });
    }

    return { userData, activityData, commentData };
  }

  public async getUsers(): Promise<Members[]> {
    try {
      let page = 1;
      const userData: [][] = [];
      let value = true;

      for (let i = 0; value; i++) {
        const { data } = await axios.get<[]>(`${this.vanilaBaseUrl}/users?expand=extended&limit=500&page=${page}`, {
          headers: this.headers
        });
        userData.push(data);
        page += 1;
        if (data.length < 500) {
          value = false;
        }
      }

      const mergedUsersList: [] = [].concat.apply([], userData);
      return mergedUsersList;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw error.message;
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async getActivity(): Promise<[]> {
    try {
      let page = 1;
      const discussionData: [][] = [];
      let value = true;

      const yesterday: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const filterDate: string = yesterday.toISOString();
      for (let i = 0; value; i++) {
        const { data } = await axios.get<[]>(
          `${this.vanilaBaseUrl}/discussions?dateInserted=>${filterDate}&limit=500&page=${page}`,
          {
            headers: this.headers
          }
        );
        discussionData.push(data);
        page += 1;
        if (data.length < 500) {
          value = false;
        }
      }

      const mergedDiscussionList = [].concat.apply([], discussionData);
      console.log('mergedDiscussionList>>>>>>>', mergedDiscussionList);
      return mergedDiscussionList;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw error.message;
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async getComments(): Promise<Comments[]> {
    try {
      let page = 1;
      const discussionData: DiscussionType[] = [];
      let value = true;
      const comments: CommentType[] = [];
      let mergedComments: Comments[] = [];
      const yesterday: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const filteredDate: string = yesterday.toISOString(); // '2022-06-20T04:54:13.116Z'
      for (let i = 0; value; i++) {
        const { data: discussions } = await axios.get<[]>(
          `${this.vanilaBaseUrl}/discussions?dateLastComment=>${filteredDate}&limit=500&page=${page}`,
          {
            headers: this.headers
          }
        );
        discussionData.push(discussions);
        page += 1;
        if (discussions.length < 500) {
          value = false;
        }
      }
      const mergedDiscussionList: [] = [].concat.apply([], discussionData);
      if (mergedDiscussionList.length) {
        const discussionId = mergedDiscussionList.map((discussion: Discussion) => discussion.discussionID);
        for (const id of discussionId) {
          const { data: comment } = await axios.get(`${this.vanilaBaseUrl}/comments?discussionID=${id}&expand=all`, {
            headers: this.headers
          });
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
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw error.message;
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async getReactions(): Promise<Comments[]> {
    try {
      let page = 1;
      const discussionData: DiscussionType[] = [];
      let value = true;
      const comments: CommentType[] = [];
      let mergedComments: Comments[] = [];
      const yesterday: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const filteredDate: string = yesterday.toISOString(); // '2022-06-20T04:54:13.116Z'
      for (let i = 0; value; i++) {
        const { data: discussions } = await axios.get<[]>(
          `${this.vanilaBaseUrl}/discussions?dateLastComment=>${filteredDate}&limit=500&page=${page}`,
          {
            headers: this.headers
          }
        );
        discussionData.push(discussions);
        page += 1;
        if (discussions.length < 500) {
          value = false;
        }
      }
      const mergedDiscussionList: [] = [].concat.apply([], discussionData);
      if (mergedDiscussionList.length) {
        const discussionId = mergedDiscussionList.map((discussion: Discussion) => discussion.discussionID);
        for (const id of discussionId) {
          const { data: comment } = await axios.get(`${this.vanilaBaseUrl}/comments?discussionID=${id}&expand=all`, {
            headers: this.headers
          });
          // if (comment.length) {
          //     const userId = comment[0].insertUserID;
          //     const { data: user } = await axios.get(`${this.vanilaBaseUrl}/users/${userId}`, {
          //         headers: this.headers
          //     });
          //     comment[0].insertUserID = { name: user.name, email: user.email };
          //     comments.push(comment);
          // }
        }
        mergedComments = [].concat.apply([], comments);
      }
      return mergedComments;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.message;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async getCommunity(): Promise<string> {
    try {
      const { data: communityData } = await axios.get(`${this.vanilaBaseUrl}/config`);
      return communityData['garden.title'];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw error.message;
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  public async checkHealth(): Promise<string> {
    try {
      const { data: communityData } = await axios.get(`${this.vanilaBaseUrl}/tokens`, {
        headers: this.headers
      });

      return communityData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.code);
        if (error.code == 'ENOTFOUND') {
          throw new HttpException(400, 'Community not exist');
        } else if (error.response.status === 403) {
          throw new HttpException(400, 'Invalid token');
        }
        throw error.message;
      } else {
        console.log('unexpected error: ', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  destructure(rawData) {
    const output = {};
    Object.entries(rawData).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([innerKey, innerValue]) => {
          const newKey = `${key}_${innerKey}`;
          output[newKey] = innerValue;
        });
      } else {
        output[key] = value;
      }
    });
    return output;
  }

  getFieldName(key, type) {
    return this.transformHandler.fetchFieldName(key, type);
  }

  filterKeys(rawData, type) {
    const outputData = {};
    for (const item in rawData) {
      const transformedKey = this.getFieldName(item, type);
      if (transformedKey) {
        outputData[transformedKey] = rawData[item];
      }
    }
    return outputData;
  }

  transformRawData(rawData, type) {
    const destructuredData = this.destructure(rawData);
    const filterData = this.filterKeys(destructuredData, type);
    return filterData;
  }

  transformWholeData(rawDatas, type) {
    return rawDatas.map((rawData) => this.transformRawData(rawData, type));
  }
}

export default VanilaForumService;
