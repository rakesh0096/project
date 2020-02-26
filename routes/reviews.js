var express = require('express');
var route = express.Router(); 
var bodyParser = require ("body-parser");
const app = express();
app.use(bodyParser.text());
const reviewSchema = require('../models/schema').reviewSchema;


// post product reviews by using product Id

route.post('/:uid',(req,res) => {
    var content = JSON.parse(req.body);
    let reviewMsg = content.reviewMsg;
    
    try{
        var obj = new reviewSchema({
            reviewMsg : reviewMsg,
            reviewDate : new Date(),
            user_id : req.params.uid
            })
            obj.save(function(err){
                if(err){
                    res.json({
                        sucess : false,
                        message : "problem in posting reviews"
                    })
                }
                else{
                    res.json({
                        sucess : true,
                        message : "Reviews successfullly posted", 
                        data : obj
                    })
                }
            })
    }
    catch(err)
    {
        console.log('Error',err);
    }
    
});

route.get('/:prodid',(req,res)=>{
    const id = req.params.prodid;
    reviewSchema.find({_id : prodID},(err,data)=>{
    if(err) throw err;
    res.send(data);
    })
})


module.exports = route;