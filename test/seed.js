import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function platforms() {
  await prisma.platforms.createMany({
    data: [
      {
        id: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        name: 'Slack',
        status: 'Connect',
        errorMessage: 'Slack Error',
        isActive: true
      },
      {
        id: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        name: 'Vanilla',
        status: 'Connect',
        errorMessage: 'Vanilla Forums Error',
        isActive: true
      }
    ]
  });

  await prisma.platformSettings.createMany({
    data: [
      {
        id: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        version: 'v1',
        isActive: true
      },
      {
        id: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        version: 'v1',
        isActive: true
      }
    ]
  });

  await prisma.comunifySchemas.createMany({
    data: [
      {
        id: 'd009cafc-b479-4892-8912-f93be403ca43',
        name: 'platformMemberId',
        description: 'platform member Id',
        type: 'Member',
        viewName: 'platformMemberId',
        isMandatory: true
      },
      {
        id: 'd009cafc-b479-4892-8888-f93be403ca43',
        name: 'organization',
        description: 'platform member Id',
        type: 'Member',
        viewName: 'platformMemberId',
        isMandatory: true
      },
      {
        id: '3d82771c-92de-4260-9725-f67809c17eb1',
        name: 'location',
        description: 'member location',
        type: 'Member',
        viewName: 'location',
        isMandatory: true
      },
      {
        id: '422d1b01-122f-4d4e-b308-4749be228f7e',
        name: 'name',
        description: 'member name',
        type: 'Member',
        viewName: 'name',
        isMandatory: true
      },
      {
        id: '3d19e25d-73cd-446c-ac5c-aaef9d6ed230',
        name: 'email',
        description: 'member email',
        type: 'Member',
        viewName: 'email',
        isMandatory: true
      },
      {
        id: '9604c5ed-5ec2-45d9-88d0-f56ae8cd4f09',
        name: 'profileUrl',
        description: 'member profile url',
        type: 'Member',
        viewName: 'profileUrl',
        isMandatory: true
      },
      {
        id: '3d5d94cc-3fd1-41a7-b766-95d9bb64565b',
        name: 'type',
        description: 'activity type',
        type: 'Activity',
        viewName: 'type',
        isMandatory: true
      },
      {
        id: '6448801b-0e7c-499c-8c67-c5412c762e91',
        name: 'platformMemberId',
        description: 'member Id',
        type: 'Activity',
        viewName: 'platformMemberId',
        isMandatory: true
      },
      {
        id: 'f1642e79-a6ff-43df-9c8b-3d80f4dd8933',
        name: 'value',
        description: 'activity value',
        type: 'Activity',
        viewName: 'value',
        isMandatory: true
      },
      {
        id: 'f6a4544f-b2b8-451a-8edc-e85fd3ea25f0',
        name: 'activityTime',
        description: 'activity time',
        type: 'Activity',
        viewName: 'platformMemberId',
        isMandatory: true
      },
      {
        id: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af92',
        name: 'activityId',
        description: 'activityId Id',
        type: 'Activity',
        viewName: 'activityId',
        isMandatory: true
      },
      {
        id: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af87',
        name: 'name',
        description: 'activity username',
        type: 'Activity',
        viewName: 'User',
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
      // comments
      {
        id: 'f62b51a8-1ee5-11ed-861d-0242ac120002',
        name: 'activityId',
        description: 'Comment id',
        type: 'Comments',
        viewName: 'Comment Id',
        isMandatory: true
    },
    {
        id: 'f62b4dfc-1ee5-11ed-861d-0242ac120002',
        name: 'name',
        description: 'Comment name',
        type: 'Comments',
        viewName: 'Comment Name',
        isMandatory: true
    },
    {
        id: 'f62b58a6-1ee5-11ed-861d-0242ac120002',
        name: 'value',
        description: 'Comment',
        type: 'Comments',
        viewName: 'Comment data',
        isMandatory: true
    },
    {
        id: 'f62b5be4-1ee5-11ed-861d-0242ac120002',
        name: 'sourceUrl',
        description: 'Comment url',
        type: 'Comments',
        viewName: 'Comment Url',
        isMandatory: true
    },
    {
        id: 'f62b5f0e-1ee5-11ed-861d-0242ac120002',
        name: 'platformMemberId',
        description: 'Platform MemberID',
        type: 'Comments',
        viewName: 'MemberID',
        isMandatory: true
    },
    {
        id: 'f62b631e-1ee5-11ed-861d-0242ac120002',
        name: 'activityTime',
        description: 'Comment Time',
        type: 'Comments',
        viewName: 'Comment Time',
        isMandatory: true
    }
    ]
  });

  // slack schemas
  await prisma.platformSchemas.createMany({
    data: [
      {
        id: '6f109c5e-fb65-442d-ba52-f9e6c29ed9c2',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'id',
        viewName: 'userID',
        description: 'user id',
        type: 'Member',
        isMandatory: true
      },
      {
        id: 'd397fe5d-d5d0-47f3-a61c-945420a26417',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'tz',
        viewName: 'tz',
        description: 'location',
        type: 'Member',
        isMandatory: true
      },
      {
        id: '912de78c-e617-44ed-9ac9-04061e40ce6c',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'profile_real_name',
        viewName: 'name',
        description: 'user name',
        type: 'Member',
        isMandatory: true
      },
      {
        id: 'e2108519-3d96-4a5d-9cc3-9b395299007f',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'profile_email',
        viewName: 'email',
        description: 'user email',
        type: 'Member',
        isMandatory: true
      },
      {
        id: 'efa7beb3-f1cc-47dd-87e6-affac65e76cc',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'profile_image_24',
        viewName: 'profilePhotoUrl',
        description: 'profile image url',
        type: 'Member',
        isMandatory: true
      },
      {
        id: '3f79bbb3-be95-49c2-a2f6-72458459e539',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'type',
        viewName: 'type',
        description: 'activity type',
        type: 'Activity',
        isMandatory: true
      },
      {
        id: '54c6cdd5-a016-4276-94a2-bbbfc857ddd5',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'text',
        viewName: 'text',
        description: 'activity text',
        type: 'Activity',
        isMandatory: true
      },
      {
        id: 'f20b29cc-166c-42fd-ad32-fa88d6a9b51b',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'user',
        viewName: 'userId',
        description: 'activity user id',
        type: 'Activity',
        isMandatory: true
      },
      {
        id: '33291613-b1c5-40e0-91fd-c09c827f94c0',
        comunifyPlatformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        name: 'ts',
        viewName: 'time stamp',
        description: 'activity timestamp',
        type: 'Activity',
        isMandatory: true
      }
    ]
  });

  // vanilla platform schemas
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
        viewName: 'Activity Time',
        description: 'Activity Time',
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
      },
      {
        id: '7d0b4d3f-aaaa-4e11-b5c8-82b2e4ca36b9',
        comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        name: 'insertUser_userID',
        viewName: 'activity UserId',
        description: 'activity userid',
        type: 'Activity',
        isMandatory: true
      },
      //comments
      {
        id: '62b5072-1ee5-11ed-861d-0202ac120002',
        comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        name: 'commentID',
        viewName: 'Comment Id',
        description: 'Comment Id',
        type: 'Comments',
        isMandatory: true
    },
    {
        id: '62b5072-1ee5-11ed-861d-0242ac120002',
        comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        name: 'insertUser_name',
        viewName: 'Comment Name',
        description: 'Comment name',
        type: 'Comments',
        isMandatory: true
    },
    {
        id: 'f62b59be-1ee5-11ed-861d-0242ac120002',
        comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        name: 'name',
        viewName: 'Comment Data',
        description: 'Comment Value',
        type: 'Comments',
        isMandatory: true
    },
    {
        id: 'f62b5ce8-1ee5-11ed-861d-0242ac120002',
        comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        name: 'url',
        viewName: 'Comment Url',
        description: 'Comment url',
        type: 'Comments',
        isMandatory: true
    },
    {
        id: 'f62b61fc-1ee5-11ed-861d-0242ac120002',
        comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        name: 'insertUser_userID',
        viewName: 'Comment Url',
        description: 'Comment url',
        type: 'Comments',
        isMandatory: true
    },
    {
        id: 'f62b642c-1ee5-11ed-861d-0242ac120002',
        comunifyPlatformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        name: 'dateInserted',
        viewName: 'Commented Time',
        description: 'Commented Time',
        type: 'Comments',
        isMandatory: true
    }
    ]
  });

  //slack platform mappings
  await prisma.workspacePlatformSchemaMappings.createMany({
    data: [
      {
        id: '7b76d40f-237a-49a4-b3a0-4b6b9738052c',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: '6f109c5e-fb65-442d-ba52-f9e6c29ed9c2',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: 'd009cafc-b479-4892-8912-f93be403ca43'
      },
      {
        id: '5a0f1fb8-7433-4e11-a18a-804d8c91d836',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: 'd397fe5d-d5d0-47f3-a61c-945420a26417',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: '3d82771c-92de-4260-9725-f67809c17eb1'
      },
      {
        id: 'c0b6ee9a-f16e-4386-8d2f-54808068a392',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: '912de78c-e617-44ed-9ac9-04061e40ce6c',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: '422d1b01-122f-4d4e-b308-4749be228f7e'
      },
      {
        id: '3dc6a7a3-b16f-4f7b-a662-1a67691048f1',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: 'e2108519-3d96-4a5d-9cc3-9b395299007f',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: '3d19e25d-73cd-446c-ac5c-aaef9d6ed230'
      },
      {
        id: '0f5b2a67-bb3f-462e-8602-b87a4e57f2ce',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: 'efa7beb3-f1cc-47dd-87e6-affac65e76cc',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: '9604c5ed-5ec2-45d9-88d0-f56ae8cd4f09'
      },
      {
        id: '2b0a63af-0f46-46e4-a1ce-f54f74d4d89b',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: '3f79bbb3-be95-49c2-a2f6-72458459e539',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: '3d5d94cc-3fd1-41a7-b766-95d9bb64565b'
      },
      {
        id: '1d31e2a4-cd4a-44dd-9f9e-879e114dd82e',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: 'f20b29cc-166c-42fd-ad32-fa88d6a9b51b',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: '6448801b-0e7c-499c-8c67-c5412c762e91'
      },
      {
        id: 'e18ae9e1-6a4c-49b1-bb40-e8f1138cb56e',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: '54c6cdd5-a016-4276-94a2-bbbfc857ddd5',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: 'f1642e79-a6ff-43df-9c8b-3d80f4dd8933'
      },
      {
        id: '7368dff6-e63f-4d14-a7fd-20eeb7d2330e',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: '33291613-b1c5-40e0-91fd-c09c827f94c0',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: 'f6a4544f-b2b8-451a-8edc-e85fd3ea25f0'
      },
      {
        id: '931f3f4e-abd8-4d55-8f53-09887dcf8b22',
        platformId: 'e48d2911-5dea-4b84-9eed-e6d808f016ed',
        platformSchemasId: '33291613-b1c5-40e0-91fd-c09c827f94c0',
        platformSettingsId: '0efe6cdc-cb78-4192-a430-5a27b80add9c',
        isMandatory: true,
        schemaId: 'e3f8aa3a-a7c3-45dd-ba9f-c88dae28af92'
      },
      // vanila
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
      },
      {
        id: '6fa7f746-2323-4444-bf46-ecc81ffce300',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        platformSchemasId: '7d0b4d3f-aaaa-4e11-b5c8-82b2e4ca36b9',
        schemaId: 'd009cafc-b479-4892-8912-f93be403ca43',
        platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        isMandatory: true
      },
      //comments
      {
        id: 'f62b52c0-1ee5-11ed-861d-0242ac120002',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        platformSchemasId: '62b5072-1ee5-11ed-861d-0202ac120002',
        schemaId: 'f62b51a8-1ee5-11ed-861d-0242ac120002',
        platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        isMandatory: true
    },
    {
        id: 'f62b541e-1ee5-11ed-861d-0242ac120002',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        platformSchemasId: '62b5072-1ee5-11ed-861d-0242ac120002',
        schemaId: 'f62b4dfc-1ee5-11ed-861d-0242ac120002',
        platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        isMandatory: true
    },
    {
        id: 'f62b5ae0-1ee5-11ed-861d-0242ac120002',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        platformSchemasId: 'f62b59be-1ee5-11ed-861d-0242ac120002',
        schemaId: 'f62b58a6-1ee5-11ed-861d-0242ac120002',
        platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        isMandatory: true
    },
    {
        id: 'f62b5df6-1ee5-11ed-861d-0242ac120002',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        platformSchemasId: 'f62b5ce8-1ee5-11ed-861d-0242ac120002',
        schemaId: 'f62b5be4-1ee5-11ed-861d-0242ac120002',
        platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        isMandatory: true
    },
    {
        id: 'f62b51df6-1ee5-11ed-861d-0242ac120002',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        platformSchemasId: 'f62b61fc-1ee5-11ed-861d-0242ac120002',
        schemaId: 'f62b5f0e-1ee5-11ed-861d-0242ac120002',
        platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        isMandatory: true
    },
    {
        id: 'f62b52f6-1ee5-11ed-861d-0242ac120002',
        platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
        platformSchemasId: 'f62b642c-1ee5-11ed-861d-0242ac120002',
        schemaId: 'f62b631e-1ee5-11ed-861d-0242ac120002',
        platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
        isMandatory: true
    }
    ]
  });
}