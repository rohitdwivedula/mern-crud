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
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
  } 
}	
);

module.exports = User = mongoose.model("users", UserSchema);

