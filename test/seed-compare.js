await prisma.platforms.createMany({
    data: [
      {
        id: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        name: 'Vanilla',
        status: 'Connect',
        errorMessage: 'Vanilla Forums Error',
        isActive: true
      }
    ]
  });

  await prisma.comunifySchemas.createMany({
    data: [
      {
        id: 'd009cafc-b479-4892-8888-f93be403ca43',
        name: 'organization',
        description: 'platform member Id',
        type: 'Member',
        viewName: 'platformMemberId',
        isMandatory: true
      },
      {
        id: 'e3f8aa3a-a7c3-45dd-bbbb-c88dae28af87',
        name: 'sourceUrl',
        description: 'activity url',
        type: 'Activity',
        viewName: 'Url',
        isMandatory: true
      },
      {
        id: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af87',
        name: 'name',
        description: 'activity username',
        type: 'Activity',
        viewName: 'User',
        isMandatory: true
      }
    ]
    });


    // slack
    await prisma.platformSchemas.createMany({
        data: [
            {
        id: '33291613-b1c5-40e0-91fd-c09c827f94c9',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'activityLink',
        viewName: 'activityLink',
        description: 'activity link',
        type: 'Activity',
        isMandatory: true
      },
      {
        id: '33291613-b1c5-40e0-91fd-c09c827f94c5',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'client_msg_id',
        viewName: 'client_msg_id',
        description: 'client message id',
        type: 'Activity',
        isMandatory: true
      }
        ]
    })
    

    // full vanilla
    await prisma.platformSchemas.createMany({
        data: [
          {
            id: '64d40f27-0bd3-4424-8fa8-20cf9d5a7f5b',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'name',
            // need to destructure same as slack members
            viewName: 'insert_user_name',
            description: 'user name',
            type: 'Member',
            isMandatory: true
          },
          {
            id: '64d40f27-0bd3-4444-8fa8-20cf9d5a7f5b',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'extended_Company',
            viewName: 'Organization',
            description: 'organization Name',
            type: 'Member',
            isMandatory: true
          },
          {
            id: '64d40f27-0bd3-4424-8fa8-20cf9d5a7g35',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'body',
            viewName: 'Message body',
            description: 'Discussion',
            type: 'Activity',
            isMandatory: true
          },
          {
            id: '09851eda-0f5d-4945-ab1d-44006b4cd262',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'userID',
            viewName: 'userID',
            description: 'user id',
            type: 'Member',
            isMandatory: true
          },
          {
            id: '0195fdb3-6726-4f20-a5a6-de9b0cf2f429',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'email',
            viewName: 'email',
            description: 'user email',
            type: 'Member',
            isMandatory: true
          },
          {
            id: '935a06fa-6d0b-4667-a06c-657101a51794',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'url',
            viewName: 'profilePhotoUrl',
            description: 'profile image url',
            type: 'Member',
            isMandatory: true
          },
          {
            id: '5dde9290-cfc3-4c2c-aa60-b46847ab0f7b',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'type',
            viewName: 'type',
            description: 'activity type',
            type: 'Activity',
            isMandatory: true
          },
          {
            id: '2a36a618-3923-465f-80db-796251eb24e1',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'insertUserID',
            viewName: 'userId',
            description: 'activity user Id',
            type: 'Activity',
            isMandatory: true
          },
          {
            id: 'c275328c-1cbe-4df2-b158-091451409715',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'name',
            viewName: 'text',
            description: 'activity text',
            type: 'Activity',
            isMandatory: true
          },
          {
            id: 'c275328c-1cbe-4df2-b158-091451409799',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'insertUser_name',
            viewName: 'text',
            description: 'activity text',
            type: 'Activity',
            isMandatory: true
          },
          {
            id: '0fd6fd75-65f0-4df5-9cef-870f782d8251',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'dateInserted',
            viewName: 'time stamp',
            description: 'activity time',
            type: 'Activity',
            isMandatory: true
          },
          {
            id: '7d0b4d3f-8faa-4e1e-b5c8-82b2e4ca36b9',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'discussionID',
            viewName: 'activityId',
            description: 'activity id',
            type: 'Activity',
            isMandatory: true
          },
          {
            id: '7d0b4d3f-8faa-4e11-b5c8-82b2e4ca36b9',
            comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            name: 'url',
            viewName: 'activityUrl',
            description: 'activity ur;',
            type: 'Activity',
            isMandatory: true
          }
        ]
      });

      // slack
     await prisma.workspacePlatformSchemaMappings.createMany({
        data:[
            {
                id: '7b76d40f-237a-49a4-b3a0-4b6b97380523',
                platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
                platformSchemasId: '33291613-b1c5-40e0-91fd-c09c827f94c5',
                platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
                isMandatory: true,
                schemaId: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af93'
              },
              {
                id: '7b76d40f-237a-49a4-b3a0-4b6b97380521',
                platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
                platformSchemasId: '33291613-b1c5-40e0-91fd-c09c827f94c9',
                platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
                isMandatory: true,
                schemaId: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af90'
              },
        ]
     })

      // vanilla
      await prisma.workspacePlatformSchemaMappings.createMany({
        data:[
            {
                id: '8e614694-f86c-45ed-b1dc-c6b04971c17f',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '09851eda-0f5d-4945-ab1d-44006b4cd262',
                schemaId: 'd009cafc-b479-4892-8912-f93be403ca43',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: 'c6c9e361-50f3-4903-87d7-fa32f170ab8b',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '64d40f27-0bd3-4424-8fa8-20cf9d5a7f5b',
                schemaId: '422d1b01-122f-4d4e-b308-4749be228f7e',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '11490c2b-c71a-4ece-8c00-de4caf3cd23c',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '0195fdb3-6726-4f20-a5a6-de9b0cf2f429',
                schemaId: '3d19e25d-73cd-446c-ac5c-aaef9d6ed230',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '95fb4f93-a3b5-4c06-8267-6f13f0a0ca1a',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '935a06fa-6d0b-4667-a06c-657101a51794',
                schemaId: '9604c5ed-5ec2-45d9-88d0-f56ae8cd4f09',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '7013f3f3-040b-4f2e-812e-02774afdb73a',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '5dde9290-cfc3-4c2c-aa60-b46847ab0f7b',
                schemaId: '3d5d94cc-3fd1-41a7-b766-95d9bb64565b',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: 'dfb40f93-8ba3-4314-ae95-1e3e360e873f',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '2a36a618-3923-465f-80db-796251eb24e1',
                schemaId: '6448801b-0e7c-499c-8c67-c5412c762e91',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '888cd776-aec2-4396-8851-63742f178550',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: 'c275328c-1cbe-4df2-b158-091451409715',
                schemaId: 'f1642e79-a6ff-43df-9c8b-3d80f4dd8933',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: 'eb99df74-f22b-495c-915c-aca4c0a1f7a5',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '0fd6fd75-65f0-4df5-9cef-870f782d8251',
                schemaId: 'f6a4544f-b2b8-451a-8edc-e85fd3ea25f0',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '6fa7f746-23b6-4d1b-bf46-ecc81ffce345',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '7d0b4d3f-8faa-4e1e-b5c8-82b2e4ca36b9',
                schemaId: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af92',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '6fa7f746-23b6-4d1b-bf46-ecc81ffce300',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: 'c275328c-1cbe-4df2-b158-091451409799',
                schemaId: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af87',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '6fa7f746-2323-4d1b-bf46-ecc81ffce300',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '64d40f27-0bd3-4444-8fa8-20cf9d5a7f5b',
                schemaId: 'd009cafc-b479-4892-8888-f93be403ca43',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              },
              {
                id: '6fa7f746-2323-4d4d-bf46-ecc81ffce300',
                platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
                platformSchemasId: '7d0b4d3f-8faa-4e11-b5c8-82b2e4ca36b9',
                schemaId: 'e3f8aa3a-a7c3-45dd-bbbb-c88dae28af87',
                platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
                isMandatory: true
              }
        ]
      })