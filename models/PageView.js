var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PageViewSchema = new Schema({
	email: {
	    type: String,
	    required: true
  	},
 	endpoint: {
 		type: String,
 		required: true
 	},
 	device: {
 		type: String,
 		required: true
 	}
},
{ 
  timestamps: { 
    createdAt: 'created_at'
  } 
}
);

const PageView = mongoose.model("PageView", PageViewSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = {PageView: PageView};
