/**
	Mongoose is a package used to create schemas for MongoDB.
	Schema: a description of how data is stored in the database
	Mongo: a database used to store data
**/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Creates schema for movie with required attributes and data types
var MovieSchema = new Schema({
  title: {type: String, required: true, unique: true},
  desc: {type: String, required: false},
  year: {
  	type: Number, 
  	required: true, 
  	unique: false, 
  	min: 1888, 
  	max: 2020
  },
  cast: [{type: String}],  //This attribute is an array which stores objects of type String.
}, 
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
  } 
}
);

const Movie = mongoose.model("Movie", MovieSchema);
// Below code used for exporting the Schemas
// Used when we need to import the below Schemas in another file.
module.exports = {Movie: Movie};
