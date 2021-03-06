function postLocal(arr) {
  $.ajax({
    url:"/saved",
    type: "PUT",
    data: arr
  })
};

$(document).ready(function() {
  $.ajax({
    url:"/scrape",
    type: "GET"
  })
  .done(function() {
    setTimeout(function() {
      $(".card-deck").load(location.href + " .card-deck");
    }, 2000);
  });
})

$(document).on("click", ".save-btn", function(event) {
  event.preventDefault();
  let id = $(this).attr("data-id");
  let savedID = JSON.parse(localStorage.getItem("saved")); 
  if(localStorage.saved && savedID.includes(id) === false){
    var savedArticles = JSON.parse(localStorage.getItem("saved"));
    savedArticles.push($(this).attr("data-id"));
    localStorage.setItem("saved", JSON.stringify(savedArticles));
  } else if(!localStorage.saved) {
    var savedArticles = [];
    savedArticles.push($(this).attr("data-id"));
    localStorage.setItem("saved", JSON.stringify(savedArticles));
  }
  postLocal(localStorage.getItem("saved"));
});

$(document).on("click", ".comments-btn", function(event) {
  event.preventDefault();

  window.location = "/articles/" + $(this).attr("data-id");
});

$(document).on("click", "#commentSave", function(event) {
  event.preventDefault();

  var commentTitle = $("#commentTitle").val();
  var commentBody = $("#commentBody").val();

  var URL = "/articles/" + $(this).attr("data-id");

  $.ajax({
    url: URL,
    type: "POST",
    data: {
      title: commentTitle,
      body: commentBody
    }
  }).done(function() {
    $("#commentBody").val("");
    $("#commentTitle").val("");

    window.location = URL;

  });

});