var mongoose = require("mongoose");

//User Schema

var userSchema = new mongoose.Schema({

firstName :String,
lastName : String,
email : String,
password : String

});

module.exports = mongoose.model('user', userSchema, 'user');

// Product Schema

var prodSchema = new mongoose.Schema({

    prodName : String,
    prodDesc : String,
    prodImage : String,
    obj_id : String

});

module.exports.prodSchema = mongoose.model('product', prodSchema);

//Reviews Schema

var reviewSchema = new mongoose.Schema({

    reviewMsg : Array,
    reviewDate : Date,
    prodID : String

});

module.exports.reviewSchema = mongoose.model('review', reviewSchema);