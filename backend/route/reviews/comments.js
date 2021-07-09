const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
var dbnmae = config.dbnmae;
const { Comments } = require("../../model/Comment");
module.exports = function (router) {
  router.post("/postComments", async (req, res1) => {
    var myobj = {
      uploderid: ObjectId(req.body.uploderid),
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      comment: req.body.comment,
      date: new Date(Date.now()).toISOString(),
    };
    await Comments.create(myobj, function (err, res) {
      if (err) throw err;
      ////console.log("1 document inserted");

      res1.json("done");
      /// res1.json("Request For Approvel Has been  Sent");
      /// db.close();
    });
  });

  router.post("/fetchComments", async (req, res) => {
    console.log(req.body);
    var allposts = [];

    allposts = await Comments.aggregate([
      {
        $match: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
      },

      {
        $lookup: {
          from: "users",

          localField: "uploderid",
          foreignField: "_id",
          as: "users",
        },
      },

      { $unwind: "$users" },
    ]);

    console.log(allposts);
    res.json(allposts);
  });
};
