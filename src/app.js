const express = require('express');

//create instance of express application
const app = express();

app.get('/users',(req,res)=>{
    res.send({firstname: "Nidhi", lastname:"Pal"});
})
app.post('/users',(req,res)=>{
    console.log("Data save to DB");
    res.send("Data savig to database");
})
app.put('/users',(req,res)=>{
    console.log("Data updated in DB");
    res.send("Data updated in database");
})
app.patch('/users',(req,res)=>{
    console.log("data patched in db");
    res.send("data patched in database");
})
app.delete('/users',(req,res)=>{
    console.log("data deleted from db");
    res.send("data deleted from database");
})
app.use("/test",(req,res)=>{
    res.send("Hello sending response to test request");
});


//start the server and listen on port 7777
app.listen(7777, ()=>{
    console.log("server is listening successfully on port 7777");
});

/**
 * order of routes matter
 * it maches with start 
 */

