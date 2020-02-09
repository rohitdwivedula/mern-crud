var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
	    type: String,
	    required: true
  	},
 	email: {
	    type: String,
	    required: true,
	    unique: true
  	},
  	photo: {
	    type: String
  	}
});

module.exports = User = mongoose.model("users", UserSchema);

