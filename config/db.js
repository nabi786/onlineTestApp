// DB connection
var mongoose = require("mongoose");
var MONGODB_URL = process.env.MONGODB_URL;

// console.log("this is dataBase URL", MONGODB_URL);
// var MONGODB_URL = `mongodb://localhost:27017/nexusgalaxy`;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("databse connected")
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });