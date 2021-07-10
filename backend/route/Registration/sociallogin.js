const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");

const url = config.mongoURI;
const dbnmae = config.dbnmae;

module.exports = function (router) {
  router.post("/signupfacebook", (req, res1) => {
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

        const query = { fid: req.body.fid };
        dbo.collection("users").findOne(query, function (err, result) {
          if (result == "" || result == null) {
            var myobj = {
              email: "",
              fname: req.body.name,
              lname: "",
              pass: "",
              username: "",
              phno: "",
              address: "",
              city: "",

              FacebookLink: "",
              LinkdinLink: "",
              TwitterLink: "",
              img: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
              fid: req.body.fid,
              gid: "",
            };
            dbo.collection("users").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("account created success");
              res1.json(res.ops[0]);
            });
          } else {
            /// console.log(result);
            res1.json(result);
          }
        });
      }
    );
  });

  router.post("/signupgoogle", (req, res1) => {
    console.log(req.body);

    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbnmae);

        const query = { gid: req.body.gid, email: req.body.email };
        dbo.collection("users").findOne(query, function (err, result) {
          console.log(result);

          if (result == "" || result == null) {
            console.log(" not null");
            var myobj = {
              email: req.body.email,
              fname: req.body.name,
              lname: "",
              phno: "",
              address: "",
              city: "",
              pass: "",
              username: "",

              FacebookLink: "",
              LinkdinLink: "",
              TwitterLink: "",
              img: req.body.img,
              fid: "",
              gid: req.body.gid,
            };
            dbo.collection("users").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("account created success");
              res1.json(res.ops[0]);
            });
          } else {
            console.log("--------------------------------------");
            res1.json(result);
          }
        });
      }
    );
  });
};
