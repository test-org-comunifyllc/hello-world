const COMMUNITY = 'Kaltura'

class VanilaTransformDiscussion {
    static getFilteredFields = (rawActivity) => {
        const neededFields = [
            "discussionID",
            "name",
            "body",
            "dateInserted",
            "insertUser",
            "url",
            "type"
        ]
        const filteredData = {}
        for (const field of neededFields){
            filteredData[field] = rawActivity[field];
        }
        // console.log(filteredData);
        return filteredData;
    }
    static transformData = (rawActivity) => {
        const filteredRawActivity = this.getFilteredFields(rawActivity);
        // console.log("filteredRawActivity",filteredRawActivity);
        return {
            id: filteredRawActivity.discussionID,
            name: filteredRawActivity.name,
            url: filteredRawActivity.url,
            body: filteredRawActivity.body,
            type: filteredRawActivity.type,
            title: `${filteredRawActivity.insertUser.name} send a messsage in ${COMMUNITY}`,
            user: { name:filteredRawActivity.insertUser.name, url:filteredRawActivity.insertUser.url}
        }
    }
    static transformRawActivities = (rawDataList) => {
        return rawDataList.map((rawData) => VanilaTransformDiscussion.transformData(rawData));
    };
}

module.exports =  VanilaTransformDiscussion;