// const fs = require('fs');

// fs.readFile('data.js', 'utf8', function (err, data) {

//     // Display the file content
//     console.log(data);
// });
const sleep = ms => new Promise(res => setTimeout(res, ms));
async function init() {
    console.log(1);
    await sleep(60000);
    console.log(2);
}

init();


// file inside discussion get in pool


// if(mergedDiscussionList.length) {
            //     console.log("new discussion found...!")
            //     for (let discussion of mergedDiscussionList) {
            //         discussionId.push(discussion.discussionID); // map

            //     };

            //     for (let id of discussionId) {
            //         const { data:comment } = await axios.get(
            //             `${BASE_URL}/comments?discussionID=${id}`,
            //             {
            //                 headers: HEADERS,
            //             },
            //         );
            //         comments.push(comment);
            //     };


            //     for (let id of discussionId) {
            //         console.log(id);
            //         const {data:reaction} = await axios.get(
            //             `${BASE_URL}/discussions/${id}/reactions`,
            //             {
            //                 headers: HEADERS,
            //             },
            //         );
            //         reactions.push(reaction);
            //     };

            //     // console.log(reactions);
            // };

            // checking for previous elements discussion to get 4 hrs back comments and reactions
            // need to take 24 hr back discussion from last connected 












            const userSchema = {
                type: "object",
                properties: {
                    userID: { type: "number" },
                    name: { type: "string" },
                    photoUrl: { type: "string" },
                    email: { type: "string"},
                    roles: { type: "array"},
                    dateInserted: { type: "string"},
                    dateLastActive: { type: "string"},
                    dateUpdated: { type: "string"},
                    points: { type: "number"},
                    emailConfirmed: { type: "boolean"},
                    hidden: { type: "boolean"},
                    bypassSpam: { type: "boolean"},
                    banned: { type: "number"},
                    rank: { type: "object"},
                    rankID: { type: "number"},
                    showEmail: {type: "boolean"}
                },
                required: ["flavour", "price", "stock"],
            }
            