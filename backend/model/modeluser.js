var mongoose = require("mongoose");

var config = require("../config/config");

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var userschm = new mongoose.Schema({
  fname: String,
  lname: String,

  username: String,
  pass: String,
  email: String,
  pic: String,
  follower: Number,
  following: Number,
  verify: String,
  expotoken: String,
  userInterests: { type: Array, default: [] },
});

var usersmodel = mongoose.model("users", userschm);
module.exports = usersmodel;
