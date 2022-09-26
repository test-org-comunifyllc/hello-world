const express = require("express");
const app = express();
const axios = require("axios")

const PORT = 3000


app.get("/", async(req,res) => {
   try {
    axios.post("https://api/v2.0/Discussions/UpdateSubscription").then(data => {
        console.log(data);
    });
    res.send("success");
   } catch(e) {
    console.log(e);
   }
});



app.listen(PORT, () => {
    console.log("connected..");
});

