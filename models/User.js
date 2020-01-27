var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userID: {type: String, required: true, unique: true},
  hashed_password: {type: String, required: false},
  salt: {type: Number, required: true, unique: false}
});

const UserSchema = mongoose.model("UserSchema", UserSchema);
module.exports = {UserSchema: UserSchema};