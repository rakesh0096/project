const Bcrypt = require("bcryptjs");
var db = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../config/config.json');
var mongoose = require('mongoose')

exports.register = (req,res)=>{

  var content = JSON.parse(req.body)


  db.findOne({email: content.email}, function (err, docs) {

  if(!docs == null){
    res.send({"success":false,"status":400,"message":'user already exist',"data":{}})
     
  }
  else{
    var obj = new db({
      firstName: content.firstName,
      lastName: content.lastName,
      email: content.email,
      password: Bcrypt.hashSync(content.password, 10)
    })
    obj.save((err,data)=>{
      if(!err){res.send({"success":true,"status":200,"message":'user registered',"data":data})}
      else{res.send({"success":false,"status":400,"message":err,"data":obj})}
    })
  }
})

}


exports.tokengen = (req,res)=>{
  var content = JSON.parse(req.body)
  db.findOne({email: content.email}, function (err, docs) {
    if(!docs){
      res.send({"success":false,"status":400,"message":'invalid credentials',"data":content})
    }
    else{
      if(!Bcrypt.compareSync(content.password, docs.password)){
        res.send({"success":false,"status":400,"message":'invalid credentials',"data":content})  
      }
      
      else{
        
        var token = jwt.sign({
          id:docs._id,
          email:docs.email,
          firstName:docs.firstName,
          lastName:docs.lastName
        },config[1].s_key,{expiresIn: 12000});
        res.send({"success":true,"status":200,"message":"token generated","data":token})
      }
     
    }
  })

}