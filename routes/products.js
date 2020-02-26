var express = require('express');
var route = express.Router(); 
var bodyParser = require ("body-parser");
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.text());
app.use( bodyParser.json()); 
const prodSchema = require('../models/schema').prodSchema;
var config = require('../config/config.json');



// Add product by using user Id

route.post('/', (req,res) => {
    var content = JSON.parse(req.body);
    var userId ;
    const bearerHeader = req.headers['authorization'];
    jwt.verify(bearerHeader,config.key, (err,authData) =>{
        if(err) {
            console.log(err);
            res.sendStatus(403);    // Forbidden
        }
        
        {
            userId = authData._id;
            console.log("AuthData",authData);
            try{
                var obj = new prodSchema({
                    prodName : content.prodName,
                    prodDesc : content.prodDesc,
                    prodImage : content.prodImage,
                    user_id : userId
                });
                obj.save().then((data) => {
                        res.json({
                            success: true,
                            message: 'Product Added Successfully!',
                            data: data
                        })
                    });   
            }
            catch(err){console.log("Your Error",err)}
        } 
    });
});


//Get product by using product id


route.get('/:prodid',(req,res)=>{
    const prodID = req.params.prodid;
    prodSchema.findOne({_id: prodID}).exec()
    .then(data =>{
        if(data)
        {
            prodSchema.find({_id:prodID}).exec()
            .then(data=>{
                if (data){  
                    res.json({
                        sucess : true,
                        message: 'Product Fetched Successfully!',
                        data: data
                    })
            }
                else{
                    res.json({
                        sucess : false,
                        message : "problem in featching product"
                    })
                }
            })
        }
    })        
})


// update product information by using product id

route.put('/:prodid',(req,res) => {
    const prodID = req.params.prodid;
    var content = JSON.parse((req.body).toString())
    var obj = {
    prodName : content.prodName,
    prodDesc : content.prodDesc,
    prodImage : content.prodImage,
    user_id : req.params.obj_id
    }
    prodSchema.findOneAndUpdate({_id: prodID},obj)
    .then(data =>{
        if(data)
        {
            prodSchema.find({_id:prodID}).exec()
            .then(data=>{
                res.json({
                    success: true,
                    message: 'product successfullly updated ',
                    data: data
                })
            })
        }
        else
        {
            res.json({
                success: false,
                message: 'problem in updating product'
            })
        }
        
    })
})


// Delete product information by using product id


route.delete('/:prodid', (req,res) => {
    let prodId = req.params.prodid;
    console.log(prodId);
    prodSchema.deleteOne({_id:prodId},(err, data)=> {
        if(err) throw err;
        else{
            res.json({
                success:true,
                message: "Product Delete Successfully",
                data: data
            })
        }
    })
})


module.exports = route;