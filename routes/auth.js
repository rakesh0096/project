var express = require('express');
var route = express.Router(); 
var bodyParser = require ("body-parser");
const app = express();
app.use(bodyParser.text());
var userSchema = require("../models/schema");

//User registration

route.post('/registration',(req,res) => {
    var content = JSON.parse((req.body).toString())
    console.log(content)
    var obj = new userSchema({
    firstName : content.firstName,
    lastName : content.lastName,
    email : content.email,
    password : content.password
    })
    obj.save(function(err,userSchema){
        if(err){
            res.json({
                sucess : false,
                message : "problem in saving user record"
            })
        }
        else{
            res.json({
                sucess : true,
                message : "successfullly saved record" 
            })
        }
        console.log('user get saved')
    })
})

// User login

route.post('/login',(req,res) => {
    var content = JSON.parse((req.body).toString())
    userSchema.find({email : content.email, password : content.password},(err,userSchema)=>{
        if (!userSchema.length) {
            res.json({
                sucess : false,
                message : "Incorrect login"
            })
        }
        else{
            res.json({
                sucess : true,
                message : "login successfull"
            })
        }
    })
})


module.exports = route;