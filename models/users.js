const db  = require('./db'); 
var userSchema = db.Schema({
  firstName :{type:String,require:true,trim:true},
  lastName : {type:String,require:true,trim:true},
  email :    {type:String,require:true,trim:true},
  password : {type:String,require:true,trim:true}
});


userSchema.set('toJSON', {
  transform: function(doc, ret, opt) {
      delete ret['password']
      return ret
  }
})


// compile schema to model
module.exports = db.model('User', userSchema);