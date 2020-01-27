var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
  userID: {type: String, required: true, unique: true},
  movieID: {},
  rating: {type: Number, required: true}
});

const RatingSchema = mongoose.model("RatingSchema", RatingSchema);
module.exports = {RatingSchema: RatingSchema};