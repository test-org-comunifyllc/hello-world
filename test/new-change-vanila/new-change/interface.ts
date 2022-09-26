type LastFetchPayload = {
    type: string;
    platformId: string;
    workspaceId: string;
    slackAccessToken: string;
    slackClientId: string;
    slackClientSecret: string;
    workspacePlatformSettingsId: string;
    vanillaAccessToken: string;
    vanillaBaseUrl: string;
    lastTime: Date;
  };
  
export interface JobExecutionInitial {
    _id: mongoose.Types.ObjectId;
    jobScheduleStartAt: Date;
    jobScheduleRepeat: number;
    nextRunAt: Date;
    workspacePlatformSettingsId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    payload?: LastFetchPayload;
  }