const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Visitedplaces = mongoose.model(
  "visitedplaces",
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

module.exports.Visitedplaces = Visitedplaces;
