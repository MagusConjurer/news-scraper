var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

// Route for scraping data from 
app.get("", function(req,res) {

  axios.get("").then(function(response) {
    var $ = cheerio.load(response.data);

    $("").each(function(i, element) {
      var result = {};

      // Add the text and href of every link, saving them as properties.
      // result.title = $(this).children("a").text();
      // result.link = $(this).children("a").attr("href");


    });
  });
});

// Route for retrieving all articles from the DB
app.get("", function(req, res) {

});

// Route for grabbing a specific article by ID, along with its comments
app.get("", function(req, res) {

});

// Route for saving/updating an articles comments
app.post("", function(req,res) {

});

