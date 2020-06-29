var express = require("express");
var handlebars = require("express-handlebars")
var routes = require("./controllers/controller");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse requests as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Make public files static for easier access on pages
app.use(express.static("public"));

// Setup Handlebars
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(routes);

// Connect to Mongo DB using mLab or use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function(){
  console.log("App running on port " + PORT + "!");
})