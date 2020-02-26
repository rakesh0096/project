var express = require('express');
var route = express.Router(); 
var bodyParser = require ("body-parser");
const app = express();
app.use(bodyParser.text());
var userSchema = require("../models/schema");
var config = require('../config/config.json');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




//User registration

route.post('/registration',(req,res) => {
    var content = JSON.parse((req.body).toString())
    var obj = new userSchema({
    firstName : content.firstName,
    lastName : content.lastName,
    email : content.email,
    password : content.password
    });
    var newobj = {
        firstName : content.firstName,
        lastName : content.lastName,
        email : content.email
    };
    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(obj.password,salt,(err,hash)=>{
            if(err) throw err;
            obj.password = hash;
            obj.save(function(err,userSchema){
                if(err){
                    res.json({
                        sucess : false,
                        message : "problem in user registration"
                    })
                }
                else{
                    res.json({
                        sucess : true,
                        message : "User registered successfullly ",
                        data : newobj
                    })
                }
            })
        })
    });
})

// User login

route.post('/login',(req,res) => {
    var content = JSON.parse((req.body).toString())
    var reg = {
        firstName : userSchema.firstName,
        lastName : userSchema.lastName,
        email : userSchema.email,
        password : userSchema.password
    }
    userSchema.findOne({email : content.email},(err,data)=>{
        if (!data) {
            res.json({
                sucess : false,
                message : "problem in token genration",
                data: data
            })
        }
        else{
            var token = jwt.sign({reg:data},config.key , { expiresIn: 60 * 60 });
            console.log("here");
                res.json({
                    sucess : true,
                    message : "Token genrated successfully",
                    token: token
                })

            var decode = jwt.verify(token, config.key , function(err, decoded) {
            console.log(decoded) 
            });
        }
    })
})

module.exports = route;