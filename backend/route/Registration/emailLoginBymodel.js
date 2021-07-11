const express = require("express");
const router = express.Router();

const { Users } = require("../../model/Users");

const ObjectId = require("mongodb").ObjectID;
router.post("/updateProfile", async (req, res1) => {
  await Users.findOne(
    {
      email: req.body.email,
    },
    async function (err, result) {
      console.log("----------------");
      console.log(result);
      console.log("----------------");
      if (result != null) {
        await Users.updateOne(
          {
            _id: ObjectId(req.body._id),
          },
          {
            $set: {
              fname: req.body.fname,
              lname: req.body.lname,
              img: req.body.img,
            },
          },
          async function (err, res) {
            if (err) throw err;
            ////console.log("1 document updated");

            //////  db.close();
            res1.json("Profile Updated");
          }
        );
      } else {
        res1.json("Email Already Exist");
      }
    }
  );
});

router.post("/signinemail", (req, res1) => {
  Users.find(
    { email: req.body.email, pass: req.body.pass },
    async function (err, docs) {
      if (docs == null || docs == "") {
        res1.json("fail");
      } else {
        res1.json(docs);
      }
    }
  );
});
router.post("/signupemail", (req, res) => {
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
        let userdata = new Users(data);

        userdata = await userdata
          .save()
          .then(() => {
            //// console.log(userdata);

            console.log(userdata);
            res.json("Please Sigin in for Login");
          })
          .catch(err => {
            console.log("error occured " + err);
            res.json("some thing went wrong");
          });
      } else {
        res.json("account already");
      }
    }
  );
});
module.exports = router;
