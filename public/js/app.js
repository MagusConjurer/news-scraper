$(document).on("click", ".save-btn", function(event) {
  event.preventDefault();

  if(localStorage.saved){
    var savedArticles = JSON.parse(localStorage.getItem("saved"));
    savedArticles.push($(this).attr("data-id"));
    localStorage.setItem("saved", JSON.stringify(savedArticles));
  } else {
    var savedArticles = [];
    savedArticles.push($(this).attr("data-id"));
    localStorage.setItem("saved", JSON.stringify(savedArticles));
  }
});

$(document).on("click", ".comments-btn", function(event) {
  event.preventDefault();


});