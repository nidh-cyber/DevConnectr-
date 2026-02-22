const authAdmin = (req,res,next)=>{
    const token='abc';
    if(token==='abc'){
        console.log("seems like authenticated");
        next();
    }
    else {
        res.status(400).send("unauthorised request");
    }
};

const userAuth = (req,res,next)=>{
    const token ='123';
    if(token==='123'){
        console.log('user authenticated');
        next();
    }
    else {
        res.status(400).send("error with auth");
    }
}

module.exports={authAdmin, userAuth};