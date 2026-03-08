const validator = require('validator');

const validateSingnupData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName )
        throw new Error("Name is not valid");
    else if(!validator.isEmail(emailId))
        throw new Error("Email is not valid!");
    else if(!validator.isStrongPassword(password))
        throw new Error("Choose strong password !");
};

module.exports = { validateSingnupData };