const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
var dbnmae = config.dbnmae;
const { Visitedplaces } = require("../../model/Visitedplaces");
const { Favplaces } = require("../../model/Favplaces");
module.exports = function (router) {
  router.post("/postVisitedplaces", async (req, res) => {
    await Visitedplaces.findOne(
      {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        uploderid: ObjectId(req.body.uploderid),
      },
      async function (err, result) {
        console.log("----------------");
        console.log(result);
        console.log("----------------");
        if (result != null) {
        } else {
          var myobj = {
            uploderid: ObjectId(req.body.uploderid),
            latitude: req.body.latitude,
            longitude: req.body.longitude,

            date: new Date(Date.now()).toISOString(),
          };
          await Visitedplaces.create(myobj, function (err, res) {
            if (err) throw err;
            ////console.log("1 document inserted");
            /// res1.json("Request For Approvel Has been  Sent");
            /// db.close();
          });
        }
      }
    );
  });

  router.post("/postLikedplaces", async (req, res) => {
    await Favplaces.findOne(
      {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        uploderid: ObjectId(req.body.uploderid),
      },
      async function (err, result) {
        console.log("----------------");
        console.log(result);
        console.log("----------------");
        if (result != null) {
        } else {
          var myobj = {
            uploderid: ObjectId(req.body.uploderid),
            latitude: req.body.latitude,
            longitude: req.body.longitude,

            date: new Date(Date.now()).toISOString(),
          };
          await Favplaces.create(myobj, function (err, res) {
            if (err) throw err;
            ////console.log("1 document inserted");
            /// res1.json("Request For Approvel Has been  Sent");
            /// db.close();
          });
        }
      }
    );
  });

  router.post("/fetchUserFavplaces", async (req, res) => {
    var allposts = [];

    allposts = await Favplaces.aggregate([
      {
        $match: {
          uploderid: ObjectId(req.body.userId),
        },
      },
      {
        $lookup: {
          from: "places",

          localField: "latitude",
          foreignField: "latitude",
          localField: "longitude",
          foreignField: "longitude",
          as: "reviewplaces",
        },
      },
    ]);
    console.log(allposts);
    res.json(allposts);
  });
  router.post("/fetchUserVistedplaces", async (req, res) => {
    var allposts = [];

    allposts = await Visitedplaces.aggregate([
      {
        $match: {
          uploderid: ObjectId(req.body.userId),
        },
      },
      {
        $lookup: {
          from: "places",

          localField: "latitude",
          foreignField: "latitude",
          localField: "longitude",
          foreignField: "longitude",
          as: "reviewplaces",
        },
      },
    ]);
    console.log(allposts);
    res.json(allposts);
  });
};
