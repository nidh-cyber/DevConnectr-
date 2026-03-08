const express = require('express');
const app = express();
const {connectDB} =  require('./config/database');
const User = require('./models/user');
const { validateSingnupData } = require('./utils/validation');
const bcrypt = require('bcrypt');


app.use(express.json()); 
//request body else we will get undefined when we try to access req.body


app.post('/signup', async(req,res)=>{

    try{
        validateSingnupData(req);
        //creating new instance of User model
        // const user = new User(req.body);// never trust req.body
        const {firstName,lastName,emailId,password}=req.body
        //Encrypt the password
        const hashPassword = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword
        });
        await user.save();
        res.status(200).send("user created successfully");
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

app.post("/login", async(req,res) =>{

    try{
            const {email, password } = req.body;
            const user = await User.findOne({emailId:email});
            if(!user)
                throw new Error("invalid credentials");
            const ispassvalid = await bcrypt.compare(password,user.password);
            if(!ispassvalid)
                throw new Error("invalid credentials");
            else{
                res.send("Login successfull");
            }
    } catch (err){
        res.status(400).send("Error: " + err.message);
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
    const {id, data } = req.body;
    // const {first,last} = req.body;
    try{
        const user = await User.findByIdAndUpdate(id, data,{
            runValidators: true,
            new: true,
            context: "query",
        } ) ;
        // const user = await User.findOneAndUpdate({firstName:first},{lastName:last});
        // await user.save();
        // console.log(user);
        res.send("User updated suuceessfully");
    }
    catch(err){
        console.log("somethig went wrong "+ err.message);
    }

});

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
    

