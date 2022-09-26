await prisma.comunifySchemas.createMany({
    data: [
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
        },

    ]
})


await prisma.platformSchemas.createMany({
    data: [
        {
            id: '62b5072-1ee5-11ed-861d-0242ac120002',
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
})

await prisma.workspacePlatformSchemaMappings.createMany({
    data: [
        {
            id: 'f62b52c0-1ee5-11ed-861d-0242ac120002',
            platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
            platformSchemasId: '62b5072-1ee5-11ed-861d-0242ac120002',
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
            id: 'f62b5df6-1ee5-11ed-861d-0242ac120002',
            platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
            platformSchemasId: 'f62b61fc-1ee5-11ed-861d-0242ac120002',
            schemaId: 'f62b5f0e-1ee5-11ed-861d-0242ac120002',
            platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            isMandatory: true
        },
        {
            id: 'f62b5df6-1ee5-11ed-861d-0242ac120002',
            platformId: 'da2df38c-a163-40ca-920a-d32a509bd3a7',
            platformSchemasId: 'f62b642c-1ee5-11ed-861d-0242ac120002',
            schemaId: 'f62b631e-1ee5-11ed-861d-0242ac120002',
            platformSettingsId: '465eb6c4-b5e1-4b04-9792-2e0e34a31997',
            isMandatory: true
        },
    ]
})