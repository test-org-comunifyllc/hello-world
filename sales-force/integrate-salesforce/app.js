require("dotenv").config();
const express = require("express");
const app = express();
const jsforce = require('jsforce');
const {PORT, CLIENT_ID, CLIENT_SECRET_ID, REDIRECT_URI} = process.env;


// class Salesforce {
//     doAuth() {
//         const oauth2 = new jsforce.OAuth2({
//             clientId: CLIENT_ID,
//             clientSecret: CLIENT_SECRET_ID,
//             redirectUri: `${req.protocol}://${req.get('host')}/${REDIRECT_URI}`
//         });
//         res.redirect(oauth2.getAuthorizationUrl({}));
//     }
// }


app.get('/oauth2/auth', function (req, res) {
    const oauth2 = new jsforce.OAuth2({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET_ID,
        redirectUri: `${req.protocol}://${req.get('host')}/${REDIRECT_URI}`
    });
    res.redirect(oauth2.getAuthorizationUrl({}));
});

app.get('/getAccessToken', function (req, res) {
    const oauth2 = new jsforce.OAuth2({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET_ID,
        redirectUri: `${req.protocol}://${req.get('host')}/${REDIRECT_URI}`
    });
    const conn = new jsforce.Connection({ oauth2: oauth2 });
    conn.authorize(req.query.code, function (err, userInfo) {
        if (err) {
            return console.error(err);
        }
        console.log(userInfo);
        console.log(conn.accessToken, conn.instanceUrl); // access token via oauth2
        res.send('haha 🤩 got it!!')
    });
    
});




app.listen(PORT, () => {
    console.log(`Server running at http:localhost${PORT}`)
});

