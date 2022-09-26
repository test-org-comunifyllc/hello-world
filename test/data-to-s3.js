require('dotenv').config();
const data = require("./data");
const AWS = require('aws-sdk');
const fs = require('fs');
// const filename = 'data.js'
// const fileContent = fs.readFileSync(data);

var buf = Buffer.from(data);
const PLATFORM = "slack"
console.log(buf);

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env;


const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

let today = new Date

const params = {
    Bucket: `${AWS_BUCKET_NAME}/raw-data/${PLATFORM}`,
    Key: `${today}member-list.json`,
    Body: buf
}

s3.upload(params, (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.Location);
})



// console.log(data,"data>>>>>>>");

