// password = tEMtLgmTpqjfwqc4
const mongoose = require('mongoose');
const mongoDB_URI = 'mongodb+srv://db_user07:tEMtLgmTpqjfwqc4@devconnectr.nolzrxp.mongodb.net/DevConnectr';

const connectDB = async()=>{
    try{
        await mongoose.connect(mongoDB_URI);
    }
    catch(error){
        console.log("Error connecting to database:", error);
        throw error;
    }
}
module.exports = {connectDB};