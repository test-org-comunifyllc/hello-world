class SlackTransform {
    static getFilteredFields = (rawActivity) => {
        const neededFields = [
            "ts",
            "user",
            "subtype",
            "type",
            "text",
            "parent_user_id"
        ]
        const filteredData = {}
        for (const field of neededFields){
            filteredData[field] = rawActivity[field];
        }
        return filteredData;
    }
    static getTime = (timeStamp) => {
        return new Date(timeStamp * 1000);
    }
    static getTitle =(rawActivity) => {
        return rawActivity.text;
    }
    static getMessage = (rawActivity) => {
        return rawActivity.text;
    }
    static getType = (rawActivity) => {
        if (rawActivity.parent_user_id){
            return 'replied'
        }
        return rawActivity.subtype ?? rawActivity.type;
    }
    static getUser = (userDetails) => {
        return userDetails
    }
    static transformData = (rawActivity) => {
        const filteredRawActivity = this.getFilteredFields(rawActivity);
        return {
            id: filteredRawActivity.ts,
            createdTime: this.getTime(filteredRawActivity.ts),
            type: this.getType(filteredRawActivity),
            user: this.getUser(filteredRawActivity.user),
            message: this.getMessage(filteredRawActivity),
            title: this.getTitle(filteredRawActivity)
        }
    }
    static transformRawActivities = (rawDataList) => {
        return rawDataList.map((rawData) => SlackTransform.transformData(rawData));
    }
}

export default SlackTransform;