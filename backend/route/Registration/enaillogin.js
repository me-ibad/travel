const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
const Users = require("../../model/Users");
const url = config.mongoURI;
const dbnmae = config.dbnmae;

module.exports = function (router) {
  router.post("/signinemail", (req, res1) => {
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

        const query = { email: req.body.email, pass: req.body.pass };
        dbo.collection("users").findOne(query, function (err, result) {
          if (result == "" || result == null) {
            res1.json("fail");
          } else {
            res1.json(result);
          }
        });
      }
    );
  });

  router.post("/signupemail", (req, res1) => {
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

        const query = { email: req.body.email, pass: req.body.pass };
        dbo.collection("users").findOne(query, function (err, result) {
          if (result == "" || result == null) {
            var myobj = {
              email: req.body.email,
              fname: req.body.name,
              lname: "",
              phno: "",
              address: "",
              city: "",
              pass: req.body.pass,
              username: "",

              FacebookLink: "",
              LinkdinLink: "",
              TwitterLink: "",
              img: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
              fid: "",
              gid: "",
            };
            dbo.collection("users").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("account created success");
              res1.json(res.ops[0]);
            });
          } else {
            res1.json("account already");
          }
        });
      }
    );
  });

  router.post("/signupemail", (req, res1) => {
    let data = {
      email: req.body.email,
      fname: req.body.name,
      lname: "",
      phno: "",
      address: "",
      city: "",
      pass: req.body.pass,
      username: "",

      FacebookLink: "",
      LinkdinLink: "",
      TwitterLink: "",
      img: "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
      fid: "",
      gid: "",
    };

    Users.find(
      { email: req.body.email, pass: req.body.pass },
      async function (err, docs) {
        if (docs == null || docs == "") {
          let userdata = new Users(req.body.data);

          userdata = await userdata
            .save()
            .then(() => {
              //// console.log(userdata);

              console.log(userdata);
              res.json(userdata);
            })
            .catch(err => {
              console.log("error occured " + err);
              res.json("some thing went wrong");
            });
        } else {
          res1.json("account already");
        }
      }
    );
  });
};
