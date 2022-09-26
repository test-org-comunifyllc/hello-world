/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import cron from 'node-cron';
import JobMaster from 'db/models/job-master';
import JobSchedule from 'db/models/jobSchedule';
import { ExtractedJobSchedule, FailedJobs } from '@modules/integration/interface/integration.interface';
import { PrismaClient } from '@prisma/client';
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } from '@config';
import { JobStatus, jobScheduleRepeat } from '../constants/integrations.constants';

const prisma = new PrismaClient();

export const Cron = () => {
  cron.schedule('* * * * *', async () => {
    //  * * * * *
    const failedJobs: FailedJobs[] = await JobMaster.find({
      jobStatus: JobStatus.Failed,
      isRetryAble: true,
      hasBeenScheduledForRetry: false,
      retriesLeft: { $gt: 0 }
    });

    for (const failedJob of failedJobs) {
      await JobMaster.findByIdAndUpdate(failedJob._id, {
        $set: { hasBeenScheduledForRetry: true }
      });
    }
    // return into queue
    const currentDate = new Date('2022-09-15T17:43:00.000Z'); // new Date(''2022-09-15T17:43:00.000Z');
    const extraOneMinute = new Date(currentDate);
    extraOneMinute.setMinutes(currentDate.getMinutes() + 1);
    const nextRunCron = await JobSchedule.find({
      jobScheduleEndAt: null,
      nextRunAt: {
        $gte: currentDate,
        $lte: extraOneMinute
      }
    }).lean();
    for (const schedulejob of nextRunCron) {
      await JobSchedule.findByIdAndUpdate(schedulejob._id, {
        $set: {
          nextRunAt: new Date(currentDate.getTime() + 4 * 60 * 60 * 1000)
        }
      });
    }

    const extractedCron: ExtractedJobSchedule[] = nextRunCron.filter(
      (dailyJob) => dailyJob.jobScheduleRepeat === jobScheduleRepeat.Daily
    ); // will return [{}, {}]

    console.log('extractedCron', extractedCron); // 102658001940
    const jobArray = await Promise.all<ExtractedJobSchedule>(
      extractedCron.map(async (job) => {
        console.log('job', job);
        const { workspacePlatformSettingsId } = job;
        console.log('workspacePlatformSettingsId', workspacePlatformSettingsId);

        const settings = await prisma.workspacePlatformSettings.findFirst({
          where: { id: workspacePlatformSettingsId },
          include: { WorkspacePlatformAuthSettings: true, platform: { select: { name: true, id: true } } }
        });

        const payload = {
          type: settings.platform.name,
          platformId: settings.platformId,
          workspaceId: settings.workspaceId,
          slackAccessToken: settings.WorkspacePlatformAuthSettings.auth_token,
          slackClientId: SLACK_CLIENT_ID,
          slackClientSecret: SLACK_CLIENT_SECRET,
          workspacePlatformSettingsId,
          vanillaAccessToken: settings.WorkspacePlatformAuthSettings.auth_token,
          vanillaBaseUrl: settings.WorkspacePlatformAuthSettings.domain,
          lastTime: currentDate
        };
        const executionJobs = job;
        executionJobs.payload = payload;
        return executionJobs;
      })
    );
    // return into queue
    console.log('running every minute', jobArray);
  });
};
