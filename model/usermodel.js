const mongoose =require('mongoose');

const schema = mongoose.Schema;

var userSchema = new schema({
    email:String,
    username:String
});

var userModel = mongoose.model('user',userSchema);

module.exports = userModel;