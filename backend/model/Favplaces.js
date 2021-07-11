const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Favplaces = mongoose.model(
  "favplaces",
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

    date: {
      type: String,
    },
  })
);

module.exports.Favplaces = Favplaces;
