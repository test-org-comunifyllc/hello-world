// let values = '';

    // // ','${
    // //   userData[i].organization // 
    // // }

    // for (let i = 169; i < 170; i += 1) {
    //   console.log(userData[i].organization);

    //   values += `('${userData[i]?.id ?? ''}','${userData[i]?.workspaceId ?? ''}','${userData[i]?.name ?? ''}','${
    //     userData[i]?.platformName ?? ''
    //   }','${userData[i]?.organization ? userData[i].organization : ''}','${''}','${
    //     userData[i]?.comunifyMemberId ?? ''
    //   }','
    //   ${userData[i]?.email ?? ''}','${userData[i]?.profileUrl ?? ''}','${false}','${false}','${
    //     userData[i]?.platformId ?? ''
    //   }','${userData[i]?.platformMemberId ?? ''}','${
    //     userData[i]?.joinedAt ?? ''
    //   }','${new Date().toISOString()}','${new Date().toISOString()}')${i !== 170 - 1 ? ',' : ''} `;
    // }

    // console.log(values);
    // const query = `
    // INSERT INTO "Member"
    // ("id","workspaceId","name","platformName","organization","location",
    // "comunifyMemberId","email","profileUrl","isMerged","isPrimary","platformId",
    // "platformMemberId","joinedAt","createdAt","updatedAt") VALUES ${values}
    //[ ON CONFLICT ("platformId","workspaceId","platformMemberId")]
    // DO UPDATE SET
    //  "updatedAt" = EXCLUDED."updatedAt";
    // `;
    // await prisma.$executeRawUnsafe(query);
    const upsertUser = await userData.map((eachUser) =>
      prisma.member.upsert({
        where: {
          platformId_workspaceId_platformMemberId: eachUser.platformId_eachUser.workspaceId
          workspaceId: eachUser.workspaceId,
          platformId: eachUser.platformId
        },
        create: eachUser,
        update: eachUser
      })
    );

    // Promise.all(upsertUser);
    // await prisma.$transaction(upsertUser);