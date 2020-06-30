var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Default route
router.get("/", function(req, res) {
  db.Article.find({})
    .then(function(data) {
      
    })
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
      // Check if article exists and only add if it does not
      db.Article.findOne({title: result.title}, function(err, value) {
        if(err) console.log(err);
        if(!value) {
          db.Article.create(result)
            .then(function(dbArticle) {
              console.log(dbArticle);
            })
            .catch(function(err) {
              console.log(err);
          });
        };
      });  
    });
    
    res.send("Articles have been scraped.")
  });
});

// Route for retrieving all articles from the DB
router.get("/articles", function(req, res) {
  db.Article.find({}).lean()
    .then(function(dbArticle) {
      res.render("articles", {article: dbArticle});
    })
    .catch(function(err) {
      res.json(err);
    })
});

// Route for grabbing a specific article by ID, along with its comments
router.get("/articles/:id", function(req, res) {
  db.Article.find({_id: req.params.id})
  .populate("comments")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  })
});

// Route for saving/updating an articles comments
router.post("/articles/:id", function(req,res) {
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.Article.findOneAndUpdate({_id: req.params.id}, 
        {$push: {comments: dbComment._id}}, {new: true});
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    })
});

module.exports = router;