const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");

var url = config.mongoURI;
var dbnmae = config.dbnmae;
const spawn = require("child_process").spawn;

module.exports = function (router) {
  router.post("/getLocations", (req, res) => {
    console.log("its orginal only here kjbdsbkfsdkjbfksj");
    var lat = 74.2227181;
    var long = 31.4137617;
    const category = ["Restaurent"];
    var regex = category.map(function (val) {
      return new RegExp(val);
    });

    MongoClient.connect(url, async function (err, db) {
      if (err) throw err;
      const dbo = db.db(dbnmae);
      // const result1 = await dbo.collection("model").find({id:1}).toArray();
      // console.log("result1", result1);
      const result = await dbo
        .collection("model")
        .aggregate(
          [
            {
              $addFields: {
                calDistance: {
                  $function: {
                    body: `function (latitutde, longitude) {
                    function distanceInKmBetweenEarthCoordinates(
                      lat1,
                      lon1,
                      lat2,
                      lon2
                    ) {
                      earthRadiusKm = 6371;
                      dLat = ((lat2 - lat1) * Math.PI) / 180;
                      dLon = ((lon2 - lon1) * Math.PI) / 180;

                      lat1 = (lat1 * Math.PI) / 180;
                      lat2 = (lat2 * Math.PI) / 180;

                      a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.sin(dLon / 2) *
                          Math.sin(dLon / 2) *
                          Math.cos(lat1) *
                          Math.cos(lat2);
                      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                      return earthRadiusKm * c;
                    }
              
                   
                      return distanceInKmBetweenEarthCoordinates(
                        ${lat},
                        ${long},
                        latitutde,
                        longitude
                      );

                    
                  }`,
                    args: ["$latitude", "$longitude"],
                    lang: "js",
                  },
                },
              },
            },
            { $match: { calDistance: { $ne: NaN } } },
            // { $match: { category: { $in: regex } } },
            { $sort: { calDistance: 1 } },
          ],
          { allowDiskUse: true }
        )
        .limit(10)
        .toArray();
      // .toArray(function (err, data) {
      //   if (err) return console.log("err", err);
      //   console.log("data", data);
      //   db.close();
      // });

      console.log(
        "result",
        result.map(value => value.category)
      );
      res.json(result);
    });
  });

  router.post("/getDiscoverLocation", async (req, res) => {
    // console.log("its orginal only here kjbdsbkfsdkjbfksj");
    // var lat = 74.2227181;
    // var long = 31.4137617;
    // const category = ["Restaurent"];
    // var regex = category.map(function (val) {
    //   return new RegExp(val);
    // });

    // MongoClient.connect(url, async function (err, db) {
    //   if (err) throw err;
    //   const dbo = db.db(dbnmae);
    //   // const result1 = await dbo.collection("model").find({id:1}).toArray();
    //   // console.log("result1", result1);
    //   const result = await dbo
    //     .collection("model")
    //     .aggregate(
    //       [
    //         {
    //           $addFields: {
    //             calDistance: {
    //               $function: {
    //                 body: `function (latitutde, longitude) {
    //                 function distanceInKmBetweenEarthCoordinates(
    //                   lat1,
    //                   lon1,
    //                   lat2,
    //                   lon2
    //                 ) {
    //                   earthRadiusKm = 6371;
    //                   dLat = ((lat2 - lat1) * Math.PI) / 180;
    //                   dLon = ((lon2 - lon1) * Math.PI) / 180;

    //                   lat1 = (lat1 * Math.PI) / 180;
    //                   lat2 = (lat2 * Math.PI) / 180;

    //                   a =
    //                     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //                     Math.sin(dLon / 2) *
    //                       Math.sin(dLon / 2) *
    //                       Math.cos(lat1) *
    //                       Math.cos(lat2);
    //                   c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //                   return earthRadiusKm * c;
    //                 }

    //                   return distanceInKmBetweenEarthCoordinates(
    //                     ${lat},
    //                     ${long},
    //                     latitutde,
    //                     longitude
    //                   );

    //               }`,
    //                 args: ["$latitude", "$longitude"],
    //                 lang: "js",
    //               },
    //             },
    //           },
    //         },
    //         { $sort: { rating: 1 } },
    //         { $match: { rating: { $regex: /\b\w{1,3}\b/ } } },
    //         // { $convert: { input: "rating", to: "int" } },
    //         // {
    //         //   $regexMatch: {
    //         //     input: "$rating",
    //         //     regex: /^("\d+)?([.]?\d{0,2})?"$/,
    //         //   },
    //         // },
    //         // { $match: { category: { $in: regex } } },
    //         // { $sort: { rating: -1 } },
    //       ],
    //       { allowDiskUse: true }
    //     )
    //     .limit(50)
    //     .toArray();
    //   // .toArray(function (err, data) {
    //   //   if (err) return console.log("err", err);
    //   //   console.log("data", data);
    //   //   db.close();
    //   // });

    //   console.log(
    //     "result",
    //     result.map(value => value.rating)
    //   );
    //   res.json(result);
    // });

    console.log(req.body.interests);
    var lat = 74.2227181;
    var long = 31.4137617;
    let intrests = [];

    intrests.push(req.body.interests);
    const category = await intrests;
    var regex = category.map(function (val) {
      return new RegExp(val, "i");
    });

    console.log(regex);

    MongoClient.connect(url, async function (err, db) {
      if (err) throw err;
      const dbo = db.db("travelproject");
      // const result1 = await dbo.collection("model").find({id:1}).toArray();
      // console.log("result1", result1);
      const result = await dbo
        .collection("model")
        .aggregate(
          [
            {
              $addFields: {
                calDistance: {
                  $function: {
                    body: `function (latitutde, longitude) {
                    function distanceInKmBetweenEarthCoordinates(
                      lat1,
                      lon1,
                      lat2,
                      lon2
                    ) {
                      earthRadiusKm = 6371;
                      dLat = ((lat2 - lat1) * Math.PI) / 180;
                      dLon = ((lon2 - lon1) * Math.PI) / 180;

                      lat1 = (lat1 * Math.PI) / 180;
                      lat2 = (lat2 * Math.PI) / 180;

                      a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.sin(dLon / 2) *
                          Math.sin(dLon / 2) *
                          Math.cos(lat1) *
                          Math.cos(lat2);
                      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                      return earthRadiusKm * c;
                    }
              
                   
                      return distanceInKmBetweenEarthCoordinates(
                        ${lat},
                        ${long},
                        latitutde,
                        longitude
                      );

                    
                  }`,
                    args: ["$latitude", "$longitude"],
                    lang: "js",
                  },
                },
              },
            },
            { $match: { rating: { $ne: null } } },
            // { $match: { category: { $in: regex } } },
            {
              $match: {
                $expr: {
                  $function: {
                    body: `function (rating) {
                      return rating.length < 4;
                    }`,
                    args: ["$rating"],
                    lang: "js",
                  },
                },
              },
            },
            { $sort: { rating: -1 } },
          ],
          { allowDiskUse: true }
        )
        .limit(10)
        .toArray();
      // .toArray(function (err, data) {
      //   if (err) return console.log("err", err);
      //   console.log("data", data);
      //   db.close();
      // });

      console.log(
        "result",
        result.map(value => value.rating)
      );
      res.json(result);
    });
  });
};
