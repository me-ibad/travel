const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = require("express")();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const path = require("path");

const getlocation = require("./route/recomendationmodel/getlocation");

const review = require("./route/reviews/breviews");
const comments = require("./route/reviews/comments");
////const signupgoogle = require("./route/Registration/signupgoogle");

const sociallogin = require("./route/Registration/sociallogin");

const emaillogin = require("./route/Registration/enaillogin");
app.use(express.json());
const router = express.Router();
app.use(cors());
const { ExpressPeerServer } = require("peer");
const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/peer", peerServer);
getlocation(app);
review(app);
const exec = require("child_process").execSync;
sociallogin(app);
emaillogin(app);
comments(app);
app.post("/getResult", (req, res1) => {
  console.log(req.body);

  var result = exec("python uk_forecasting.py");

  console.log(result.toString("utf8"));
  res1.json(result.toString("utf8"));

  //// res1.json("dsfsdf");
});

app.use(express.static(path.join(__dirname, "build")));
// app.use("*", (req, res) => {
//   // res.sendFile(path.join(__dirname+'/build/index.html'));
//   res.json("sdad");
// });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running ${port}`));
io.on("connection", socket => {});
