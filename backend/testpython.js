const spawn = require("child_process").spawn;

// const process = spawn("python", ["uk_forecasting.py"]);
// console.log("after process");
// // collect data from script
// process.stdout.on("data", data => {
//   console.log(data.toString());

//   /// res.json(data.toString())
// });
// Process.on("end", () => {
//     // send response here
// });

// var execSync = require("exec-sync");

// var user = execSync("python uk_forecasting.py");
// console.log(user);
const exec = require("child_process").execSync;

var result = exec("python uk_forecasting.py");

// convert and show the output.
console.log(result.toString("utf8"));
