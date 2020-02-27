const db  = require('./db'); 
const mongoose = require('mongoose');
var reviewSchema = mongoose.Schema;
var reviewSchema = db.Schema({
  reviewMsg: {type:String,require:true,trim:true},
  p_id: { type:String}
});

// compile schema to model
module.exports = db.model('review', reviewSchema);