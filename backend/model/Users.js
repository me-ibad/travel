const mongoose = require("mongoose");

const Users = mongoose.model(
  "Users",
  new mongoose.Schema({
    email: {
      type: String,
    },

    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,

      ///  unique: true,
    },
    phno: {
      type: String,
    },
    address: {
      type: String,
    },

    city: {
      type: String,
    },
    pass: {
      type: String,
    },
    username: {
      type: String,
    },
    FacebookLink: {
      type: String,
    },
    TwitterLink: {
      type: String,
    },
    img: {
      type: String,
    },
    fid: {
      type: String,
    },

    gid: {
      type: String,
    },
  })
);

module.exports.Users = Users;
