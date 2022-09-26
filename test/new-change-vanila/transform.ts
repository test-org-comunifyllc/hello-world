import { PlatformSettings } from '@prisma/client';
import prisma from '@utils/prisma';

class TransformHandler {
  private communifyFields;

  private platformMembers;

  private platformId;

  constructor(platformId?) {
    this.platformId = platformId;
  }

  public async getDb(platform) {
    const communifyFields = await this.fetchFieldFromDb(platform);
    const platformMembers = await this.fetchPlatformMembers();
    return { communifyFields, platformMembers };
  }

  public setDb(communifyFields, platformMembers = null) {
    this.communifyFields = communifyFields;
    this.platformMembers = platformMembers;
  }

  private async fetchFieldFromDb(platformName) {
    // const platform = await prisma.platforms.findFirst({ where: { name: platformName } })
    const platformsettingsObj: PlatformSettings = await prisma.platformSettings.findUnique({
      where: { platformId: platformName }
    });
    const members = await prisma.workspacePlatformSchemaMappings.findMany({
      where: {
        platformSettingsId: platformsettingsObj.id,
        schema: { type: 'Member' },
        platformSchema: { type: 'Member' }
      },
      include: {
        schema: true,
        platformSchema: true
      }
    });
    const activities = await prisma.workspacePlatformSchemaMappings.findMany({
      where: {
        platformSettingsId: platformsettingsObj.id,
        schema: { type: 'Activity' },
        platformSchema: { type: 'Activity' }
      },
      include: {
        schema: true,
        platformSchema: true
      }
    });
    const comments = await prisma.workspacePlatformSchemaMappings.findMany({
      where: {
        platformSettingsId: platformsettingsObj.id,
        schema: { type: 'Comments' },
        platformSchema: { type: 'Comments' }
      },
      include: {
        schema: true,
        platformSchema: true
      }
    });
    return { members, activities, comments };
  }

  private async fetchPlatformMembers() {
    // fetch from members list
    const members = await prisma.member.findMany({
      where: { platformId: this.platformId }
    });
    return members;
  }

  public fetchFieldName(fieldName: string, type) {
    let obj = [];
    if (type === 'Member') {
      obj = this.communifyFields.communifyFields.members.filter((item) => item.platformSchema.name == fieldName);
    } else if (type === 'Activity') {
      obj = this.communifyFields.communifyFields.activities.filter((item) => item.platformSchema.name == fieldName);
    } else {
      obj = this.communifyFields.communifyFields.comments.filter((item) => item.platformSchema.name == fieldName);
    }
    // const obj = this.communifyFields.communifyFields.filter(item => item.platformSchema.name == fieldName)
    if (!obj || obj.length === 0) {
      return;
    }
    const requiredKeyId = obj[0].schema.name;
    return requiredKeyId;
  }

  public async fetchUserDetails(memberId) {
    // fetch userDetails for assigning the member ID.\
    const userDetails = this.communifyFields.platformMembers.find((item) => item.platformMemberId == memberId);
    return userDetails;
  }

  public async tranformGivenData(rawData) {
    const data1 = rawData.map((val) => {
      const r = {};
      const keys = Object.keys(val);

      for (const key of keys) {
        // console.log(key)

        // if(key!='url') continue;
        // debugger;
        const obj = this.communifyFields.find((item) => item.platformSchema.name == key);
        if (!obj) {
          continue;
        }
        // const requiredKey = workpaceplatformSchemaMappings.find(item=>item.communifyPlatformSchemasId == obj.id);
        const v = obj.schema.name;
        r[v] = val[key];
      }
      // console.log(r);
      return r;
    });
    // console.log(data1);
  }
}

export default TransformHandler;
