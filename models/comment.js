var mongoose = require("mongoose");

// Simplify reference to the Schema constructor
var Schema = mongoose.Schema;

// Use the contructor to create the object model
var CommentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;