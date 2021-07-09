const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Comments = mongoose.model(
  "comments ",
  new mongoose.Schema({
    uploderid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    comment: {
      type: String,

      ///  unique: true,
    },
    date: {
      type: String,
    },
  })
);

module.exports.Comments = Comments;
