class Transform {

    async transformPlatformData(data) {
        try {

            //fetch schema rules from db
            let communifyPlatformSchemas = [{
                id: 'idtstring1',
                name: 'name',
                comunifyActivityType: 'member',
                viewName: 'Name',
                description: 'Name of the user in vanila',
                type: 'text',
                isMandatory: true,
                createdDate: new Date(),
                updatedDate: new Date(),
            },
            {
                id: 'idtstring2',
                name: 'email',
                comunifyActivityType: 'member',
                viewName: 'Email',
                description: 'Email of the user in vanila',
                type: 'text',
                isMandatory: true,
                createdDate: new Date(),
                updatedDate: new Date(),
            },
            {
                id: 'idtstring3',
                name: 'url',
                comunifyActivityType: 'member',
                viewName: 'url',
                description: 'Link to user profile in vanila',
                type: 'text',
                isMandatory: true,
                createdDate: new Date(),
                updatedDate: new Date(),
            }];
            // comunify schema
            let communifySchemas = [
                {
                    id: 'dwewed',
                    name: 'user_name',
                    viewName: 'Name',
                    comunifyActivityType: 'member',
                    description: 'Name of the user in vanila',
                    type: 'text',
                    isMandatory: true,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                },
                {
                    id: 'wedwed',
                    name: 'email',
                    viewName: 'Email',
                    comunifyActivityType: 'member',
                    description: 'Email of the user in vanila',
                    type: 'text',
                    isMandatory: true,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                },
                {
                    id: 'wedwed2',
                    name: 'profilePictureUrl',
                    viewName: 'Profile',
                    comunifyActivityType: 'member',
                    description: 'Email of the user in vanila',
                    type: 'text',
                    isMandatory: true,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                }
            ]
            // workspace platform schema
            let workpaceplatformSchemaMappings = [
                {
                    id: 'wdewedw',
                    communifyPlatformSchemasId: 'idtstring1',
                    communifySchemasId: 'dwewed',
                    isMandatory: true,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                },
                {
                    id: 'wdewedw1',
                    communifyPlatformSchemasId: 'idtstring2',
                    communifySchemasId: 'wedwed',
                    isMandatory: true,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                },
                {
                    id: 'wdewedw2',
                    communifyPlatformSchemasId: 'idtstring3',
                    communifySchemasId: 'wedwed2',
                    isMandatory: true,
                    createdDate: new Date(),
                    updatedDate: new Date(),
                },
            ]

            // data
            let data = [
                {
                    "banned": 0,
                    "bypassSpam": false,
                    "email": "system@vanillaforums.com",
                    "emailConfirmed": true,
                    "dateInserted": "2021-01-22T15:26:37+00:00",
                    "dateLastActive": "2022-07-28T16:49:15+00:00",
                    "dateUpdated": "2021-06-03T14:07:29+00:00",
                    "name": "System",
                    "photoUrl": "https://us.v-cdn.net/6033889/uploads/avatarstock/nHR28GOH3KKUS.png",
                    "profilePhotoUrl": "https://us.v-cdn.net/6033889/uploads/avatarstock/nHR28GOH3KKUS.png",
                    "url": "https://community.kaltura.com/profile/System",
                    "points": 10,
                    "roles": [
                        {
                            "roleID": 16,
                            "name": "Administrator"
                        }
                    ],
                    "showEmail": false,
                    "userID": 1,
                    "countDiscussions": 0,
                    "countComments": 0,
                    "countPosts": 0,
                    "label": "admin",
                    "private": false,
                    "rankID": 110
                },
                {
                    "banned": 0,
                    "bypassSpam": false,
                    "email": "akismet@domain.com",
                    "emailConfirmed": true,
                    "dateInserted": "2021-01-22T15:26:39+00:00",
                    "dateLastActive": null,
                    "dateUpdated": null,
                    "name": "Akismet",
                    "photoUrl": "https://us.v-cdn.net/6033889/uploads/defaultavatar/nFFVQGZM9O9BH.jpg",
                    "profilePhotoUrl": "https://us.v-cdn.net/6033889/uploads/defaultavatar/pFFVQGZM9O9BH.jpg",
                    "url": "https://community.kaltura.com/profile/Akismet",
                    "points": 0,
                    "roles": [],
                    "showEmail": false,
                    "userID": 2,
                    "countDiscussions": 0,
                    "countComments": 0,
                    "countPosts": 0,
                    "label": "",
                    "private": false,
                    "rankID": null
                },
            ];
            // transform wrt schema rules
            const tranformedData = data.map(val => {

                const r = {};
                const keys = Object.keys(val);

                for (let key of keys) {
                    // console.log(key)

                    // if(key!='url') continue;
                    // debugger;
                    const obj = communifyPlatformSchemas.find(item => item.name == key);
                    if (!obj) continue;
                    const requiredKey = workpaceplatformSchemaMappings.find(item => item.communifyPlatformSchemasId == obj.id);
                    const v = communifySchemas.find(item => item.id == requiredKey.communifySchemasId).name;
                    r[v] = val[key];
                }
                // console.log(r);
                // const copiesRemovedData = await Transform.removeCopies(r,key)
                return r;
            });
            const copiesRemovedData = await Transform.removeCopies(tranformedData,'user_name')
            console.log(copiesRemovedData);
        } catch (e) {
            console.log(e);
        }
    }

    static removeCopies(data, key) {
        return [...new Map(data.map(item => [item[key], item])).values()]
    }

}

Transform.transformPlatformData()

module.exports = Transform;
