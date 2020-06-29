var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Default route
router.get("/", function(req, res) {
  res.render("articles");
});


// Route for scraping data from 
router.get("/scrape", function(req,res) {

  axios.get("https://www.space.com/news").then(function(response) {
    var $ = cheerio.load(response.data);
    // Remove sponsored posts, which do not include the same fields as articles
    $(".sponsored-post").remove();

    $(".listingResult").each(function(i, element) {
      var result = {};
      
      // Add the title, href and summary of the articles.
      result.title = $(this).find(".article-name").text();
      result.summary = $(this).find(".synopsis").text();
      result.url = $(this).children("a").attr("href");

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    res.send("Articles have been scraped.")
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