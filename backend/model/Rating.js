const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Rating = mongoose.model(
  "rating",
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
    rating: {
      type: Number,

      ///  unique: true,
    },
    date: {
      type: String,
    },
  })
);

module.exports.Rating = Rating;
