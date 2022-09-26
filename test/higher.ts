import axios from 'axios';

var blogRequestData = JSON.stringify({
    "MaxRecords": 1,
    "CommunityKeyFilter": "20e57a3a-845c-46c0-a83f-71aab06e2f58",
    "IgnoreStaffBlogs": true,
    "MaxDaysOld": 4
});

var loginRequestData = JSON.stringify({
    "Username": "sample string 1",
    "Password": "sample string 2"
});

var discussionData = JSON.stringify({
    "MaxContentLength": 1,
    "IncludeStaffPosts": true,
    "DiscussionKeyFilter": "e6cb1917-e6c4-44b9-81fd-5cc5030dc1e7",
    "MaxNumberToRetrieve": 3,
    "MaxSubjectLength": 4,
    "ContinuationToken": "sample string 5"
});



async function loginUser() {
    try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.post<any>(
            'https://api.higherlogic.com/api/v2.0/Authentication/Login',
            {
                headers: {
                    Accept: 'application/json',
                },
                data: loginRequestData
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
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

async function discussionPost() {
    try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.post<any>(
            'https://api.higherlogic.com/api/v2.0/Discussions/GetDiscussionPosts',
            {
                headers: {
                    Accept: 'application/json',
                },
                data: discussionData
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
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

async function getUsers() {
    try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.get<any>(
            'https://api.higherlogic.com/api/v2.0/Blogs/GetLatestEntries',
            {
                headers: {
                    Accept: 'application/json',
                },
                data: blogRequestData
            },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
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

getUsers();
loginUser();
discussionPost();