const express = require("express");
const router = express.Router();

const { Users } = require("../../model/Users");

const ObjectId = require("mongodb").ObjectID;

router.post("/signupfacebook", (req, res) => {
  let data = {
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
  Users.find({ fid: req.body.fid }, async function (err, docs) {
    if (docs == null || docs == "") {
      let userdata = new Users(data);
      console.log(userdata);

      userdata = await userdata
        .save()
        .then(() => {
          //// console.log(userdata);

          console.log(userdata);
          res.json(userdata);
        })
        .catch((err) => {
          console.log("error occured " + err);
          res.json("fail");
        });
    } else {
      res.json(docs[0]);
    }
  });
});
router.post("/signupgoogle", (req, res) => {
  console.log(req.body);
  let data = {
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

  Users.find(
    { gid: req.body.gid, email: req.body.email },
    async function (err, docs) {
      if (docs == null || docs == "") {
        let userdata = new Users(data);
        console.log(userdata, docs, err);
        userdata = await userdata
          .save()
          .then(() => {
            //// console.log(userdata);

            console.log(userdata);
            res.json(userdata);
          })
          .catch((err) => {
            console.log("error occured " + err);
            res.json("fail");
          });
      } else {
        res.json(docs[0]);
      }
    }
  );
});
module.exports = router;
