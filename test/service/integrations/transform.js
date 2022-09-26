class VanilaTransform {
    static getFilteredFields = (rawActivity) => {
        const neededFields = [
            "name",
            "userID",
            "email",
            "url",
            "name"
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
            id: filteredRawActivity.userID,
            email: filteredRawActivity.email,
            url: filteredRawActivity.url,
            name: filteredRawActivity.name
        }
    }
    static transformRawActivities = (rawDataList) => {
        return rawDataList.map((rawData) => VanilaTransform.transformData(rawData));
    };
}

module.exports =  VanilaTransform;