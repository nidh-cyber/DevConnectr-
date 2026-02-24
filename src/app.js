const express = require('express');
const app = express();
const {connectDB} =  require('./config/database');
const User = require('./models/user');
// const {authAdmin, userAuth} = require('./middlewares/authuser');

app.post('/signup', async(req,res)=>{
    const user = new User({
        firstName:'Nidhi',
        lastName:'Pal',
        emailId:'nidhi@gmail.com',
        password:'nidhi@123'
    })

    try{
        await user.save();
        res.status(200).send("user created successfully");
    }
    catch(err){
        console.error("Error creating user," + err.message);
    }
})


 connectDB().then(()=>{
        console.log("Database connection established");
        app.listen(7777, ()=>{
            console.log("server is listening on port: 7777");
        })
    })
    .catch((err)=>{
        console.log("Database can not be connected");
    })                                    