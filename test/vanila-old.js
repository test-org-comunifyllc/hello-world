const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { VanilaTransform, VanilaTransformDiscussion } = require('../transforms/vanila.transform');
const { userSchema, discussionSchema, commentSchema } = require('../validations/vanila.validation');
const { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } = require('../../../config/index');

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

class VanilaForumService {
  vanilaBaseUrl;
  vanilaAccessToken;
  platform = 'vanila';
  headers = {
    accept: 'application/json',
    Authorization: this.vanilaAccessToken
  };
  constructor(data) {
    this.vanilaBaseUrl = data.vanilaBaseUrl;
    this.vanilaAccessToken = data.vanilaAccessToken;
  }
  async connect(data) {
    try {
      // store in db
      // const token: string = token;
      console.log(data.vanilaToken, data.vanilaDomain);
      return data.vanilaToken;
    } catch (error) {
      console.log(error);
    }
  }

  async getIntialData() {
    VanilaForumService.getUsers();
    VanilaForumService.getActivityList();
    VanilaForumService.getComments();
    return 'success';
  }

  static async getUsers() {
    try {
      const filteredDate = '2021-07-27T04:54:13.116Z';
      let url = `${this.vanilaBaseUrl}/users?limit=500&dateInserted=>${filteredDate}`;

      let page = 1;
      let userData = [];
      let value = true;

      for (let i = 0; value; i++) {
        const { data } = await axios.get(`${url}&page=${page}`, {
          headers: this.headers
        });
        userData.push(data);
        page += 1;
        if (data.length < 500) {
          value = false;
        }
      }

      const mergedUsersList = [].concat.apply([], userData);
      let { error } = userSchema.validate(mergedUsersList);

      if (error) return error.message;
      if (mergedUsersList.length) {
        //     const obj = eval(mergedUsersList);
        // VanilaForumService.uploadToFile('raw-data',obj);
        // VanilaForumService.uploadToBucket('raw-data', obj)

        const data = await VanilaTransform.transformRawActivities(mergedUsersList);
        VanilaForumService.uploadToFile('transformed-data', data);
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
  }

  static async getActivityList() {
    try {
      let value = true;
      let discussionData = [];
      let page = 1;
      const filteredDate = '2021-07-27T04:54:13.116Z';

      for (let i = 0; value; i++) {
        const { data } = await axios.get(
          `${this.vanilaBaseUrl}/discussions?dateInserted=>${filteredDate}&limit=500&page=${page}`,
          {
            headers: this.headers
          }
        );
        console.log(data);
        discussionData.push(data);
        page += 1;
        if (data.length < 500) {
          value = false;
        }
      }

      const mergedDiscussionList = [].concat.apply([], discussionData);
      const { error } = discussionSchema.validate(mergedDiscussionList);

      if (error) return error.message;

      console.timeEnd('Time this');
      const transaformedData = await VanilaTransformDiscussion.transformRawActivities(mergedDiscussionList);
      //   VanilaForumService.uploadToFile('transformed-data', transaformedData);
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
  }

  static async getComments() {
    try {
      let page = 1;
      let discussionData = [];
      let value = true;
      let comments = [];
      let mergedComments = [];
      var filteredDate = '2022-06-20T04:54:13.116Z';

      for (let i = 0; value; i++) {
        const { data: discussions } = await axios.get(
          `${this.vanilaBaseUrl}/discussions?dateLastComment=>${filteredDate}&limit=500&page=${page}`,
          {
            headers: this.headers
          }
        );
        discussionData.push(discussions);
        page += 1;
        if (discussions.length < 500) {
          value = false;
        }
      }
      const mergedDiscussionList = [].concat.apply([], discussionData);
      console.log(mergedDiscussionList.length);
      if (mergedDiscussionList.length) {
        const discussionId = mergedDiscussionList.map((discussion) => {
          return discussion.discussionID;
        });

        for (let id of discussionId) {
          const { data: comment } = await axios.get(`${this.vanilaBaseUrl}/comments?discussionID=${id}`, {
            headers: this.headers
          });
          console.log(comment.length, 'len');
          if (comment.length) {
            const userId = comment[0].insertUserID;
            const { data: user } = await axios.get(`${this.vanilaBaseUrl}/users/${userId}`, {
              headers: this.headers
            });

            comment[0].insertUserID = { name: user.name, email: user.email };
            comments.push(comment);
          }
        }
        mergedComments = [].concat.apply([], comments);
        let { error } = commentSchema.validate(mergedComments);
        console.log(error);
        if (error) return error.message;
      }

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
    fs.writeFile(
      path.join(__dirname, `../../../data/${location}/${Date.now()}.json`),
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) console.log(err);
        else {
          console.log(`File written successfully ${location}`);
        }
      }
    );
  }

  static uploadToBucket(location, data) {
    let today = new Date();
    s3.putObject(
      {
        Bucket: `${AWS_BUCKET_NAME}/${this.platform}/${location}`,
        Key: `${today}member-list.json`,
        Body: JSON.stringify(data),
        ContentType: 'application/json'
      },
      function (err, data) {
        console.log(JSON.stringify(err) + ' ' + JSON.stringify(data));
      }
    );
  }
}

module.exports = VanilaForumService;
