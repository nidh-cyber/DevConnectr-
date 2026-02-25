const express = require('express');
const app = express();
const {connectDB} =  require('./config/database');
const User = require('./models/user');
// const {authAdmin, userAuth} = require('./middlewares/authuser');


app.use(express.json()); 
//middleware provide by express to parse incoming JSON data in
//request body else we will get undefined when we try to access req.body


app.post('/signup', async(req,res)=>{
    //creating new instance of user object 
    // const user = new User({
    //     firstName:'MS',
    //     lastName:'Dhoni',
    //     emailId:'dhoni2@gmail.com',
    //     password:'dhoni@123'
    // })
    const user = new User(req.body);
    console.log(req.body);

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
    

//Diff between js object and json object
/** 
 * A Javascript object is a data structure used inside JS that can store properties and methods. 
 * JSON is a string format used to transfer data between systems.
 * JSON does not support functions and requires keys in double quotes.
*/
