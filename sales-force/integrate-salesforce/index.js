require("dotenv").config();
const express = require("express");
const jsforce = require('jsforce');
const app = express();
const PORT = 3001;

const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;
const conn = new jsforce.Connection({
    loginUrl:SF_LOGIN_URL
});

conn.login(SF_USERNAME, SF_PASSWORD+SF_TOKEN, (err, userinfo) => {
    if(err) {
        console.log(err);
    } else {
        console.log("User id:"+userinfo.id)
    }
});

app.get('/',(req,res) =>{
    conn.query("SELECT Id, Name FROM Account", (err, result) => {
        if(err) {
           res.send(err); 
        } else {
            console.log("Total records" + result.totalSize);
            res.json(result.records);
        }
    })
    // res.send('Salesforce')
});

app.listen(PORT,() => {
    console.log(`Server running at http:localhost${PORT}`)
});