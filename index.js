require("dotenv").config();
require("./config/db");
var express = require("express");
var path = require("path");
var cors = require("cors");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//To allow cross-origin requests
app.use(cors());

//Route Prefixes  here

app.use("/api", require("./router/auth"))



// index page
app.get("/", function(req,res){
    res.status(200).json({ status: true, message: "online Test App backend Working" });
})
// throw 404 if URL not found
app.all("*", function (req, res) {
  return res.status(404).json({ status: false, message: "Page not found" });
});


// listening on the port number
app.listen(process.env.PORT || "3000", () => {
  console.log("App is Running on Port 3001");
});