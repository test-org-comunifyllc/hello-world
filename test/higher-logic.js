var request = require('request');
var loginOptions = {
    'method': 'POST',
    'url': 'https://api.higherlogic.com/api/v2.0/Authentication/Login',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "Username": "sample string 1",
        "Password": "sample string 2"
    })

};

var blogOptions = {
    'method': 'POST',
    'url': 'https://api.higherlogic.com/api/v2.0/Blogs/GetLatestEntries',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "MaxRecords": 1,
      "CommunityKeyFilter": "20e57a3a-845c-46c0-a83f-71aab06e2f58",
      "IgnoreStaffBlogs": true,
      "MaxDaysOld": 4
    })
  
  };

let blogData = async() => {
    await request(blogOptions, function (error, response) {
        if (error) throw new Error(error);
    }); 
}


async function userFlow() {
    await request(loginOptions, function (error, response) {
        if (error) throw new Error(error);
        if(response.body){
            const blog = await blogData();
        }
    });
    
}



