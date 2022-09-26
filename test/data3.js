let obj = [
    {
    id: "7b76d40f-237a-49a4-b3a0-4b6b9738052c",
    workspaceId: null,
    schemaId: "d009cafc-b479-4892-8912-f93be403ca43",
    platformSchemasId: "6f109c5e-fb65-442d-ba52-f9e6c29ed9c2",
    platformSettingsId: "0efe6cdc-cb78-4192-a430-5a27b80add9c",
    platformId: "e48d2911-5dea-4b84-9eed-e6d808f016ed",
    isMandatory: true,
    createdAt: {
    },
    updatedAt: {
    },
    schema: {
      id: "d009cafc-b479-4892-8912-f93be403ca43",
      name: "platformMemberId",
      viewName: "platformMemberId",
      description: "platform member Id",
      type: "Member",
      isMandatory: true,
      createdAt: {
      },
      updatedAt: {
      },
    },
    platformSchema: { // slack
      id: "6f109c5e-fb65-442d-ba52-f9e6c29ed9c2",
      name: "id",
      viewName: "userID",
      description: "user id",
      type: "Member",
      comunifyPlatformSettingsId: "0efe6cdc-cb78-4192-a430-5a27b80add9c",
      isMandatory: true,
      createdAt: {
      },
      updatedAt: {
      },
    },
  },
  {
    id: "c0b6ee9a-f16e-4386-8d2f-54808068a392",
    workspaceId: null,
    schemaId: "422d1b01-122f-4d4e-b308-4749be228f7e",
    platformSchemasId: "912de78c-e617-44ed-9ac9-04061e40ce6c",
    platformSettingsId: "0efe6cdc-cb78-4192-a430-5a27b80add9c",
    platformId: "e48d2911-5dea-4b84-9eed-e6d808f016ed",
    isMandatory: true,
    createdAt: {
    },
    updatedAt: {
    },
    schema: {
      id: "422d1b01-122f-4d4e-b308-4749be228f7e",
      name: "name",
      viewName: "name",
      description: "member name",
      type: "Member",
      isMandatory: true,
      createdAt: {
      },
      updatedAt: {
      },
    },
    platformSchema: { // slack schema
      id: "912de78c-e617-44ed-9ac9-04061e40ce6c",
      name: "profile_real_name",
      viewName: "name",
      description: "user name",
      type: "Member",
      comunifyPlatformSettingsId: "0efe6cdc-cb78-4192-a430-5a27b80add9c",
      isMandatory: true,
      createdAt: {
      },
      updatedAt: {
      },
    },
  }];

  let data  = obj.find(item => item.platformSchema.name == 'id')
  if(!data) return;
  const requiredKey = data.schema.name;
  console.log(requiredKey);


  
[
    {userid: "kjdgs"},
    {userid: "kjdgs"},
    {userid: "kjdgs"}
]