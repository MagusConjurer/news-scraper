function postLocal(arr) {
  $.ajax({
    url:"/saved",
    type: "PUT",
    data: arr
  })
};

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


});