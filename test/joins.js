    // const [members,activities] = await Promise.all([prisma.$queryRaw`SELECT * FROM public."WorkspacePlatformSchemaMappings" a
    // INNER JOIN public."PlatformSchemas" b on a."platformSchemasId"=b.id
    // INNER JOIN public."ComunifySchemas" c on a."schemaId"=c.id
    // where "platformSettingsId"=${platformsettingsObj.id} AND b."type"='Member' AND c."type"='Member';`,prisma.$queryRaw`SELECT * FROM public."WorkspacePlatformSchemaMappings" a
    // INNER JOIN public."PlatformSchemas" b on a."platformSchemasId"=b.id
    // INNER JOIN public."ComunifySchemas" c on a."schemaId"=c.id
    // where "platformSettingsId"=${platformsettingsObj.id} AND b."type"='Activity' AND c."type"='Activity';` ])
    // const communifyFieldsFromDb = await  prisma.$queryRaw`SELECT * FROM public."WorkspacePlatformSchemaMappings" a
    // INNER JOIN public."PlatformSchemas" b on a."platformSchemasId"=b.id
    // INNER JOIN public."ComunifySchemas" c on a."schemaId"=c.id
    // where "platformSettingsId"=${platformsettingsObj.id} AND b."type"='Member' AND c."type"='Member';`
    // const communifyFieldsFromDb = await prisma.workspacePlatformSchemaMappings.findMany({
    //   where: {platformSettingsId: platformsettingsObj.id, schema: {type:"Member"}, platformSchema : {type:"Member"}},
    //   include :{
    //     schema: true,
    //     platformSchema: true
    //   }
    // });