var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Route for scraping data from 
router.get("/scrape", function(req,res) {

  axios.get("https://www.space.com/news").then(function(response) {
    var $ = cheerio.load(response.data);

    $("").each(function(i, element) {
      var result = {};

      // Add the text and href of every link, saving them as properties.
      // result.title = $(this).children("a").text();
      // result.link = $(this).children("a").attr("href");
      // result.summary = $(this)


    });

    res.send("Articles have been scraped");
    res.json($(this));
  });
});

// Route for retrieving all articles from the DB
router.get("", function(req, res) {

});

// Route for grabbing a specific article by ID, along with its comments
router.get("", function(req, res) {

});

// Route for saving/updating an articles comments
router.post("", function(req,res) {

});

module.exports = router;