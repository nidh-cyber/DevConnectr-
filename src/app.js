const express = require('express');
const app = express();
const {connectDB} =  require('./config/database');
const User = require('./models/user');


app.use(express.json()); 
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

app.get('/GetAllData',async(req,res)=>{
    // const useremail = req.body.emailId;
    const userid  = req.body.userid;
    try{
        // const user = await User.find({}); //find and read all user in db
        // const user = await User.find({emailId:useremail});//find 1st user by given emailid
        const user = await User.findById(userid);

        res.send(user);
    }
    catch(err){
        console.log("somethig went wrong "+ err.message);
    }
})

app.patch('/users', async(req,res)=>{
    // const {id, firstName} = req.body;
    const {first,last} = req.body;
    try{
        // const user = await User.findByIdAndUpdate(id, {firstName:firstName}) ;
        const user = await User.findOneAndUpdate({firstName:first},{lastName:last});
        await user.save();
        console.log(user);
        res.send("User updated suuceessfully");
    }
    catch(err){
        console.log("somethig went wrong "+ err.message);
    }

})

app.delete('/delete',async(req,res)=>{
    const {id} = req.body;
    try{
        const user = await User.findByIdAndDelete(id);
        res.send("user deleted successfully");
    }
    catch(err){
        console.log("somethig went wrong "+ err.message);
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
    

//PUT replaces entire object, if you dont update some value it removes them and create object with updated data only
//PATCH updated partial resource, it keeps other data as it is and updated only given data.

