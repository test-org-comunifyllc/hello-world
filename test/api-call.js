const args = process.argv;
var https = require('follow-redirects').https;
var fs = require('fs');




const USER_NAME = args[2];
const PASSWORD = args[3];
const HOST_NAME = 'api.higherlogic.com';



class higherLogicService {
    async loginUser() {
        var options = {
            'method': 'POST',
            'hostname': HOST_NAME,
            'path': '/api/v2.0/Authentication/Login',
            'headers': {
                'Content-Type': 'application/json'
            },
            'maxRedirects': 20
        };
    
        var req = https.request(options, function (res) {
            var chunks = [];
    
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
    
            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
    
            res.on("error", function (error) {
                console.error(error);
            });
        });
    
        var postData = JSON.stringify({
            "Username": USER_NAME,
            "Password": PASSWORD
        });
    
        req.write(postData);
    
        req.end()
    }

    async getMessages() {
        var options = {
            'method': 'GET',
            'hostname': HOST_NAME,
            'path': '/api/v2.0/Messaging/GetInboxMessages',
            'headers': {
            },
            'maxRedirects': 20
          };
          
          var req = https.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function (chunk) {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
            });
          
            res.on("error", function (error) {
              console.error(error);
            });
          });
          
          req.end();
    }

    async discussionPost() {
        var options = {
            'method': 'GET',
            'hostname': HOST_NAME,
            'path': '/api/v2.0/Discussions/GetSubscribedDiscussions',
            'headers': {
            },
            'maxRedirects': 20
          };
          
          var req = https.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function (chunk) {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
            });
          
            res.on("error", function (error) {
              console.error(error);
            });
          });
          
          req.end();
    }
}


const higherLogicServices = new higherLogicService;

// async function callApi() {
//     const token = await  higherLogicServices.loginUser();
//     const message = await higherLogicServices.getMessages();
// }

higherLogicServices.loginUser();
higherLogicServices.getMessages();
higherLogicServices.discussionPost();
