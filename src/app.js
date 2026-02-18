const express = require('express');

//create instance of express application
const app = express();


//request handlers to send response to client request
app.use("/test",(req,res)=>{
    res.send("Hello sending response to test request");
});
app.use("/hello",(req,res)=>{
    res.send("Hello sending response to hello request");
});
app.use("/",(req,res)=>{
    res.send("Hello sending response to request");
});


//start the server and listen on port 7777
app.listen(7777, ()=>{
    console.log("server is listening successfully on port 7777");
});

