var express = require("express");
var handlebars = require("express-handlebars")
var router = require("./controllers/controller");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

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
app.use(router);

// Connect to Mongo DB using mLab or use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/spacenews";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(MONGODB_URI);

app.listen(PORT, function(){
  console.log("App running on port " + PORT + "!");
})