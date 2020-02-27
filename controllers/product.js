var db_product= require('../models/products')
var db_user= require('../models/users')
var jwt = require('jsonwebtoken')
var db_review = require('../models/reviews')
var Product = require('../models/products')
var conn = require('../config/config.json')
var key = conn[1].s_key;

exports.create_product = (req,res)=>{
var content = JSON.parse(req.body.toString())
jwt.verify(req.headers.token,key,(err,data)=>{

db_user.findOne({ _id: data.id}, function (err, docs) {
  if(docs !== null && docs !== undefined){
      var obj = new Product({
      prodName: content.prodName,
      prodDesc: content.prodDesc,
      prodImage:content.prodImage,
      reviews: []
    })
    obj.save((err,data)=>{
      if(!err){
        res.send({"success":true,"status":200,"message":'product registered',"data":data})}
      else{res.send(err)}
    })
}else{
    res.send({"success":false,"status":400,"message":'user not exist',"data":[]});
  }
})
})
}






exports.delete_product = (req,res)=>{
    var u_id = req.params.id
    db_product.deleteOne({_id: u_id},function (err, doc) {
           if (doc.deletedCount === 0) {
        res.send({"success":false,"status":400,"message":'product not exist',"data":u_id});
    } else {
       res.send({"success":true,"status":200,"message":'product deleted',"data":u_id});

    }
  })
}





exports.update_product = (req,res)=>{
    
    var pro_id = req.params.id
    var content = JSON.parse(req.body.toString())
    db_product.findOneAndUpdate({_id: pro_id },content,{new: true},function (err, doc) {
           if (doc === null) {
        res.send({"success":false,"status":400,"message":'product not exist',"data":content});
    } else {
       res.send({"success":true,"status":200,"message":'product updated',"data":doc});

    }
})}




exports.show_product = (req,res)=>{
    
    Product.
      find({}).
      populate('user').
      exec(function (err, doc) {
        res.send({"success":true,"status":200,"message":'product got',"data":doc});
      });
}



exports.show_one_product = (req,res)=>{
    
  var id = req.params.id
  Product.find({_id : id}).populate('user').exec(function (err, doc) {
      db_review.find({p_id: id},function(err,docss){
          var l = (docss.length).toString()
          if(docss!==null && docss!==undefined){
            var z = []
            for(i = 0;i<=l-1;i++){
               keys= docss[i].reviewMsg;
               z.push(keys)
            }
            doc[0].reviews = z  
            res.send(doc[0])
          }else{
            res.send({"success":true,"status":200,"message":'data undefined'})
          }
        })
           
    });

}