const mongoose = require("mongoose");

const Places = mongoose.model(
  "Places",
  new mongoose.Schema({
    no: {
      type: Number,
    },

    placeUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    rating: {
      type: String,
    },
    category: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },

    pic1: {
      type: String,
    },

    pic2: {
      type: String,
    },
    pic3: {
      type: String,
    },
    pic4: {
      type: String,
    },
    pic5: {
      type: String,
    },
  })
);

module.exports.Places = Places;
