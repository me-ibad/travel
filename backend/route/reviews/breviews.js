const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
var dbnmae = config.dbnmae;
const { Rating } = require("../../model/Rating");
module.exports = function (router) {
  router.post("/postReview", async (req, res) => {
    await Rating.findOne(
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
          await Rating.updateOne(
            {
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              uploderid: ObjectId(req.body.uploderid),
            },
            {
              $set: {
                rating: req.body.rating,
                date: new Date(Date.now()).toISOString(),
              },
            },
            async function (err, res) {
              if (err) throw err;
              ////console.log("1 document updated");

              //////  db.close();
              /// res1.json("Request For Approvel Has been Again Sent");
            }
          );
        } else {
          var myobj = {
            uploderid: ObjectId(req.body.uploderid),
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            rating: req.body.rating,
            date: new Date(Date.now()).toISOString(),
          };
          await Rating.create(myobj, function (err, res) {
            if (err) throw err;
            ////console.log("1 document inserted");
            /// res1.json("Request For Approvel Has been  Sent");
            /// db.close();
          });
        }
      }
    );
  });

  router.post("/fetchReviews", async (req, res) => {
    console.log("======fetch--");
    console.log(req.body);
    var allposts = [];

    allposts = await Rating.aggregate([
      {
        $match: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
      },
      //  { $sort : { _id : -1}},
      {
        $group: {
          _id: {
            latitude: "$latitude",
            longitude: "$longitude",
          },
          averagerating: {
            $avg: "$rating",
          },
        },
      },
    ]);
    console.log(allposts);
    res.json(allposts);
  });

  router.post("/fetchUserReview", async (req, res) => {
    var allposts = [];

    allposts = await Rating.aggregate([
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
    console.log(allposts[0]);
    res.json(allposts);
  });
};
