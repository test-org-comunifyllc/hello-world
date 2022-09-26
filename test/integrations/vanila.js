
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const VanilaTransform = require('./transform');
const VanilaTransformDiscussion = require('./transaform.discussion')
const {userSchema, discussionSchema, commentSchema} = require('./validate-data');

const BASE_URL = "https://community.kaltura.com/api/v2";
const ACCESS_TOKEN = "Bearer va.-Dapdhsr0h0PkdDGD_mS2TDw9a9NLB4a.QjKmdQ.VQYlH3p";
const PLATFORM = 'vanila'
const HEADERS = {
    'accept': 'application/json',
    'Authorization': ACCESS_TOKEN,
};

const AWS_ACCESS_KEY_ID = "AKIASGFBEFGSRYLZ2EB6"
const AWS_SECRET_ACCESS_KEY = "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"
const AWS_BUCKET_NAME = "comunify-dev-test"

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const CONNECTED_DATE = '2021-07-27T04:54:13.116Z'

class VanilaForumService {

    async connectUserAccount(domain, token) {
        try {
            // store in db
            // const token: string = token; 
            console.log(token, domain);
            return token;
        } catch (error) {
            console.log(error);
        }
    };

    async getUsers(poolValue = false) {
        try {

            let url = `${BASE_URL}/users?limit=500`;
            if (poolValue) {
                let now = new Date();
                let fourHoursBack = new Date(now.setHours(now.getHours() - 4));
                url = `${BASE_URL}/users?limit=500&dateInserted=>${fourHoursBack.toISOString()}`;
            };

            let page = 1;
            let userData = [];
            let value = true;

            for (let i = 0; value; i++) {
                const { data } = await axios.get(
                    `${url}&page=${page}`,
                    {
                        headers: HEADERS,
                    },
                );
                userData.push(data);
                page += 1;
                if (data.length < 500) {
                    value = false;
                }
            };

            const mergedUsersList = [].concat.apply([], userData);
            let {error} = userSchema.validate(mergedUsersList);

            if(error) return error.message;
            // console.log(mergedUsersList);
            if (mergedUsersList.length) {
            //     const obj = eval(mergedUsersList);
                // VanilaForumService.uploadToFile('raw-data',obj);
                // VanilaForumService.uploadToBucket('raw-data', obj)

                const data = await VanilaTransform.transformRawActivities(mergedUsersList);
                VanilaForumService.uploadToFile('transformed-data',data);
                // VanilaForumService.uploadToBucket('transformed-data', data)
            }

            return mergedUsersList;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    };

    async getActivityList(filteredDate = null) {
        try {
            console.time("Time this");
            let value = true;
            let discussionData = [];
            let page = 1;

            if (filteredDate == null) {
                const now = new Date();
                // const fourHoursBack = new Date(now.setHours(now.getHours() - 4));
                // var filteredDate = fourHoursBack.toISOString();
                var filteredDate = '2021-07-27T04:54:13.116Z'
            };
            console.log(`${BASE_URL}/discussions?dateInserted=>${filteredDate}&limit=500&page=${page}`);
            for (let i = 0; value; i++) {
                const { data } = await axios.get(
                    `${BASE_URL}/discussions?dateInserted=>${filteredDate}&limit=500&page=${page}`,
                    {
                        headers: HEADERS,
                    },
                );
                console.log(data);
                discussionData.push(data);
                page += 1;
                if (data.length < 500) {
                    value = false;
                }
            };

            const mergedDiscussionList = [].concat.apply([], discussionData);
            const {error} = discussionSchema.validate(mergedDiscussionList);

            if(error) return error.message;

            console.timeEnd("Time this");
            const transaformedData = await VanilaTransformDiscussion.transformRawActivities(mergedDiscussionList);
            VanilaForumService.uploadToFile('transformed-data',transaformedData);
            return mergedDiscussionList;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }

    };

    async getComments(filteredDate) {
        try {
            let page = 1;
            let discussionData = [];
            let value = true;
            let comments = [];
            let mergedComments = [];

            if (filteredDate == null) {
                // const now = new Date();
                // const fourHoursBack = new Date(now.setHours(now.getHours() - 4));
                // var filteredDate = fourHoursBack.toISOString();
                var filteredDate = '2022-06-20T04:54:13.116Z'
            };

            for (let i = 0; value; i++) {
                const { data: discussions } = await axios.get(
                    `${BASE_URL}/discussions?dateLastComment=>${filteredDate}&limit=500&page=${page}`,
                    {
                        headers: HEADERS,
                    },
                );
                discussionData.push(discussions);
                page += 1;
                if (discussions.length < 500) {
                    value = false;
                }
            };
            const mergedDiscussionList = [].concat.apply([], discussionData);
            console.log(mergedDiscussionList.length);
            if(mergedDiscussionList.length) {
                const discussionId = mergedDiscussionList.map((discussion) =>{
                    return discussion.discussionID;
                });

                for (let id of discussionId) {
                    const { data:comment } = await axios.get(
                        `${BASE_URL}/comments?discussionID=${id}`,
                        {
                            headers: HEADERS,
                        },
                    );
                    console.log(comment.length,'len');
                    if(comment.length) {
                        const userId = comment[0].insertUserID;
                        const { data:user } = await axios.get(
                            `${BASE_URL}/users/${userId}`,
                            {
                                headers: HEADERS,
                            },
                        );

                        comment[0].insertUserID = { name:user.name, email:user.email};
                        comments.push(comment);
                    };  
                }
                mergedComments = [].concat.apply([], comments);
                let {error} = commentSchema.validate(mergedComments);
                console.log(error)
                if(error) return error.message;

            };

            return mergedComments;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }

    }

    static uploadToFile(location, data) {
        fs.writeFile(path.join(__dirname, `./data/${location}/${Date.now()}.json`), JSON.stringify(data, null, 2), (err) => {
            if (err)
                console.log(err);
            else {
                console.log(`File written successfully ${location}`);
            }
        });
    };

    static uploadToBucket(location, data) {
        let today = new Date();
        s3.putObject({
            Bucket: `${AWS_BUCKET_NAME}/${PLATFORM}/${location}`,
            Key: `${today}member-list.json`,
            Body: JSON.stringify(data),
            ContentType: "application/json"
        },
            function (err, data) {
                console.log(JSON.stringify(err) + " " + JSON.stringify(data));
            }
        );
    }



}

module.exports = VanilaForumService;
