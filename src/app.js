const express = require('express');
const app = express();
const {authAdmin, userAuth} = require('./middlewares/authuser');

app.use('/admin',authAdmin);
app.use('/user',userAuth);

app.get('/admin/GetUsers',(req,res)=>{
    console.log("after authenticated use");
    res.send("All data for admin");
});

app.delete('/admin/DeleteUsers', (req,res)=>{
    res.send("deleted user from records");
});

app.get('/user/readuser',(req,res)=>{
    res.send("You can read user data");
})
//Dummy auth middleware
//repeated code for authorization where come now middleware to help
// app.get('/admin/getAllData',(req,res,next)=>{
//     const token='abc';
//     const isAdminAuthorized = token==='abc';
//     if(isAdminAuthorized){
//         res.send("All data for admin sent successfully");
//     }
//     else{
//         res.status(401).send("unauthorized");
//     }
// });


// app.use("/test",[(req,res,next)=>{
//     console.log("testing middleware");
//     // next();
//     // res.send("Test request");
//     next();
// },
// (req,res,next)=>{
//     console.log("testing middleware 2!");
//     // res.send("Test request 2");
//     next();
//     res.send("Test request 2"); //this will not throw error 
// }]
// );
//Middleware is function tnat runs between request and response (err,req,res,next)
//middleware is a function that executes before final response is sent
/**
 * why do we need middleware?
 * to not repeat common logic in every route.
 * Authentication, Logging, Validation, Error Handling, Parsing JSON, Checking permissions
 * Instead of writing it in every route, we use middleware.
 * 
 * Diff b/w app.use() and app.all()
 * app.use() is used to apply middleware functions and performs prefix matching.
 *  It can be used for any HTTP method (GET, POST, etc.) and it will execute for all matching routes.
 * app.all() is used to define route handlers for all HTTP methods (GET, POST, etc.) for a specific route.
 * It does not perform prefix matching and will only execute for the exact route specified.
 */

app.listen(7777, ()=>{
    console.log("server is listening successfully on port 7777");
});


// app.get('/users/:userId/:action',(req,res)=>{
// // app.get('/users',(req,res)=>{
//     // console.log(req.query);
//     // console.log(req.query.userId);
//     // console.log(req.params.userId);
//     // console.log(req.params.action);
//     // console.log(req);
//     console.log(req.url);
//     // console.log(req.params);
//     res.send("Connected to users");
// })
// req.query will work after '?' in url
//req.params will work after ':' in url