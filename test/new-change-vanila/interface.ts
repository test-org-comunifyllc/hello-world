export interface IntegrationParams {
    type: string;
    slackAccessToken: string;
    slackClientId: string;
    slackClientSecret: string;
    slackConnectionCode: string;
    slackChannelId: string;
    lastTime: Date;
    vanilaBaseUrl: string;
    vanilaAccessToken: string;
    vanilaDomain: string;
    vanilaToken: string;
    workspaceId: string;
    platformId: string;
  }
  
  
  export interface Comments {
      commentID: Number,
      discussionID: Number,
      name: string,
      categoryID: Number,
      body: string,
      dateInserted: Date,
      dateUpdated: Date,
      insertUserID: Object,
      updateUserID: Number,
      score: 1,
      insertUser: Object,
      url: string,
      type: string,
  };
  
  
  export interface Discussion {
      discussionID: Number,
      type: string,
      name: string,
      body: string,
      categoryID: Number,
      dateInserted: Date,
      dateUpdated: Date,
      dateLastComment: Date,
      insertUserID: Number,
      insertUser: Object,
      updateUserID: Number,
      lastUserID: Number,
      lastUser: Object,
      countComments: Number,
      countViews: Number,
      score: Number,
      hot: Number,
      url: string,
  };
  
  
  export interface Members {
      banned: Number,
      bypassSpam: boolean,
      email: Number
      emailConfirmed: boolean,
      dateInserted: Date,
      dateLastActive: Date,
      dateUpdated: Date,
      name: string,
      photoUrl: string,
      profilePhotoUrl: string,
      url: string,
      points: Number,
      showEmail: boolean,
      userID: Number,
      countDiscussions: Number,
      countComments: Number,
      countPosts: Number,
      label: string,
      private: boolean,
      rankID: Number,
      extended: Object
  };