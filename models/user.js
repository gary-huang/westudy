// models/user.js

var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var UserSchema = new Schema({
		id: Number,
		firstname: String,
		lastname: String,
		email: String,
		password: String,
		admin: Boolean,
		university: String,
		courses: [String]
});


module.exports = mongoose.model('User', UserSchema);