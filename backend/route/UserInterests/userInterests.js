const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");

const url = config.mongoURI;
const dbnmae = config.dbnmae;

module.exports = function (router) {
  router.post("/manageUserInterests", (req, res1) => {
    console.log(req.body.userInterests);
    ///  console.log(req.body);

    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbnmae);

        const query = { _id: ObjectId(req.body.id) };
        dbo
          .collection("users")
          .findOneAndUpdate(
            query,
            { $set: { userInterests: req.body.userInterests } },
            { returnOriginal: false },
            (err, doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
              }

              console.log(doc.value);
              res1.json(doc.value);
            }
          );
      }
    );
  });
};
