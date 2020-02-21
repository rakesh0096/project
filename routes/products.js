var express = require('express');
var route = express.Router(); 
var bodyParser = require ("body-parser");
const app = express();
app.use(bodyParser.text());
const prodSchema = require('../models/schema').prodSchema;

// Add product by using user Id

route.post('/:uid',(req,res) => {
    var content = JSON.parse((req.body).toString())
    console.log(content)
    var obj = new prodSchema({
    prodName : content.prodName,
    prodDesc : content.prodDesc,
    prodImage : content.prodImage,
    obj_id : req.params.uid
    })
    obj.save(function(err,prodSchema){
        if(err){
            res.json({
                sucess : false,
                message : "problem in saving product record"
            })
        }
        else{
            res.json({
                sucess : true,
                message : "successfullly saved product" 
            })
        }
        console.log('product get saved')
    })
})

route.get('/:uid',(req,res)=>{
    const id = req.params.uid;
    prodSchema.find({obj_id : id},(err,data)=>{
if(err) throw err;
res.send(data);
    })
})

module.exports = route;