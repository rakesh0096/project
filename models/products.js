const db  = require('./db'); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = db.Schema({
  prodName:{type:String,require:true,trim:true},
  prodDesc:{type:String,require:true,trim:true},
  prodImage:{type:String,require:true,trim:true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  reviews: {type: Array}
});
// productSchema.set('toJSON', {
//   transform: function(doc, ret, opt) {
//       delete ret['reviews']
//       return ret
//   }
// })
// compile schema to model
module.exports = db.model('Product', productSchema);