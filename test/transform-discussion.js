let communifyPlatformSchemas = [
    {
        id: 'iddiscussion0',
        name: 'discussionID',
        comunifyActivityType: 'discussion',
        viewName: 'Discussion Id',
        description: 'Discussion id  in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'iddiscussion1',
        name: 'name',
        comunifyActivityType: 'discussion',
        viewName: 'Discussion Name',
        description: 'Discussion name in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'iddiscussion2',
        name: 'type',
        comunifyActivityType: 'discussion',
        viewName: 'Discussion type',
        description: 'Discussion type of vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'iddiscussion3',
        name: 'url',
        comunifyActivityType: 'discussion',
        viewName: 'url',
        description: 'Link to user discussion in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'iddiscussion4',
        name: 'body',
        comunifyActivityType: 'discussion',
        viewName: 'url',
        description: 'Link to discussion in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'iddiscussion5',
        name: 'dateInserted',
        comunifyActivityType: 'discussion',
        viewName: 'dateInserted',
        description: 'Date discussion posted in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    }];

let communifySchemas = [
    {
        id: 'discussionschemaid0',
        name: 'workspaceId',
        viewName: 'Id',
        comunifyActivityType: 'discussion',
        description: 'Id of discussion in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'discussionschemaid1',
        name: 'name',
        viewName: 'Name',
        comunifyActivityType: 'discussion',
        description: 'Name of the user in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'discussionschemaid2',
        name: 'type',
        viewName: 'Type',
        comunifyActivityType: 'discussion',
        description: 'Discussion type in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'discussionschemaid3',
        name: 'sourceUrl',
        viewName: 'Url',
        comunifyActivityType: 'discussion',
        description: 'Url to a discussion in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'discussionschemaid4',
        name: 'description',
        viewName: 'Discription',
        comunifyActivityType: 'discussion',
        description: 'body of  a discussion in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'discussionschemaid5',
        name: 'createdDate',
        viewName: 'createdDate',
        comunifyActivityType: 'discussion',
        description: 'Date of a discussion in vanila',
        type: 'text',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
]

workpaceplatformSchemaMappings = [
    {
        id: 'wdewedw',
        communifyPlatformSchemasId: 'iddiscussion0',
        communifySchemasId: 'discussionschemaid0',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'wdewedw1',
        communifyPlatformSchemasId: 'iddiscussion1',
        communifySchemasId: 'discussionschemaid1',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'wdewedw2',
        communifyPlatformSchemasId: 'iddiscussion2',
        communifySchemasId: 'discussionschemaid2',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'wdewedw2',
        communifyPlatformSchemasId: 'iddiscussion3',
        communifySchemasId: 'discussionschemaid3',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'wdewedw2',
        communifyPlatformSchemasId: 'iddiscussion4',
        communifySchemasId: 'discussionschemaid4',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
    {
        id: 'wdewedw2',
        communifyPlatformSchemasId: 'iddiscussion5',
        communifySchemasId: 'discussionschemaid5',
        isMandatory: true,
        createdDate: new Date(),
        updatedDate: new Date(),
    },
]



let data = [
    {
        "discussionID": 22,
        "type": "discussion",
        "name": "How to begin a great discussion",
        "body": "<h2>Thank you for starting new discussions and asking questions. The more you contribute, the better this community becomes. Here are a few tips to help you create great discussions:</h2><h3>Make the discussion title or question as descriptive as possible.</h3><p>A good discussion title is a short preview of your post and is what gets people to click and read",
        "categoryID": 11,
        "dateInserted": "2021-05-06T19:39:21+00:00",
        "dateUpdated": null,
        "dateLastComment": "2021-05-06T19:39:21+00:00",
        "insertUserID": 8,
        "insertUser": {
            "userID": 8,
            "name": "Dani",
            "url": "https://community.kaltura.com/profile/Dani",
            "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/4S4RVYPY0E07/nRAMXKFGB50CJ.jpg",
            "dateLastActive": "2022-02-04T06:23:32+00:00",
            "banned": 0,
            "punished": 0,
            "private": false,
            "label": "admin"
        },
        "updateUserID": null,
        "lastUserID": 8,
        "lastUser": {
            "userID": 8,
            "name": "Dani",
            "url": "https://community.kaltura.com/profile/Dani",
            "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/4S4RVYPY0E07/nRAMXKFGB50CJ.jpg",
            "dateLastActive": "2022-02-04T06:23:32+00:00",
            "banned": 0,
            "punished": 0,
            "private": false,
            "label": "admin"
        },
        "pinned": true,
        "pinLocation": "recent",
        "closed": false,
        "sink": false,
        "countComments": 0,
        "countViews": 893,
        "score": 6,
        "hot": 6,
        "url": "https://community.kaltura.com/discussion/22/how-to-begin-a-great-discussion",
        "canonicalUrl": "https://community.kaltura.com/discussion/22/how-to-begin-a-great-discussion",
        "format": "Rich",
        "statusID": 0,
        "attributes": {},
        "internalStatusID": 8,
        "bookmarked": false,
        "unread": false,
        "resolved": true
    },
    {
        "discussionID": 380,
        "type": "discussion",
        "name": "Customers care chat services",
        "body": "<p>Greetings, </p><p>As most of you probably know, we went live with our chat services for all customers back on August 2nd!  </p><p>Many of you have already used this great chat service! We are incredibly happy that this channel of communication has been helping our customers - and the feedback from the surveys we received reinforces that belief.  </p><p>Chat support is designed to provide fast answers to how-to questions, assist with small or large issues This is a great Time for Resolution achievement that we are happy and proud to provide to our customers with. Thus, we encourage many of you that haven't taken this service for a test drive yet (including our Platinum tier customers) to give it a try!</p><p>So..... </p><p><strong>Where is it available</strong>: The new live chat module is available on the homepage of the Customer Care Portal: <a href=\"https://support.kaltura.com/\" rel=\"nofollow noreferrer ugc\">https://support.kaltura.com/</a>. Chat is available only for those of you who have access to the Customer Care Portal and permission to open tickets and inquires prior to the Chat service going live. </p><p><strong>When is it available</strong>: Chat module is available during both EMEA and US business hours. </p><p><strong>How does it work</strong>: We have a dedicated Chat Support team in place to cater this new service. </p><p><strong>Is there a cost for chat support?</strong> We have decided to include this premium service in customers’ existing service packages. </p><p>Providing you with the best possible service is our continued goal and commitment. Use this service and share your feedback with us! </p><p>Happy chatting!</p>",
        "categoryID": 21,
        "dateInserted": "2022-04-11T07:53:15+00:00",
        "dateUpdated": "2022-07-05T07:15:58+00:00",
        "dateLastComment": "2022-04-11T07:53:15+00:00",
        "insertUserID": 624,
        "insertUser": {
            "userID": 624,
            "name": "Meytal_Zeldich",
            "url": "https://community.kaltura.com/profile/Meytal_Zeldich",
            "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/YVATYID17IJX/nAM3R3VT61EX5.jpeg",
            "dateLastActive": "2022-07-28T11:16:30+00:00",
            "banned": 0,
            "punished": 0,
            "private": false,
            "label": "admin"
        },
        "updateUserID": 13,
        "lastUserID": 624,
        "lastUser": {
            "userID": 624,
            "name": "Meytal_Zeldich",
            "url": "https://community.kaltura.com/profile/Meytal_Zeldich",
            "photoUrl": "https://us.v-cdn.net/6033889/uploads/userpics/YVATYID17IJX/nAM3R3VT61EX5.jpeg",
            "dateLastActive": "2022-07-28T11:16:30+00:00",
            "banned": 0,
            "punished": 0,
            "private": false,
            "label": "admin"
        },
        "pinned": true,
        "pinLocation": "recent",
        "closed": false,
        "sink": false,
        "countComments": 0,
        "countViews": 483,
        "score": 1,
        "hot": 1,
        "url": "https://community.kaltura.com/discussion/380/customers-care-chat-services",
        "canonicalUrl": "https://community.kaltura.com/discussion/380/customers-care-chat-services",
        "format": "Rich",
        "statusID": 0,
        "attributes": {},
        "internalStatusID": 7,
        "bookmarked": false,
        "unread": false,
        "resolved": false
    },
]

data.forEach(val => {

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
    console.log(r);
    return r;

});


{
    obj: {
        name:'ajay'
    }
}

