 
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
var userSchema = Schema({
    email: String,
    filename:String
});
 
//User is a model which has a schema UserSchema
 
module.exports = new mongoose.model('User', userSchema);