var titles = [];
var descriptions = [];
var links = [];

function search() {
  var searchTerm =  $("#search-field").val();


  $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch="
  + searchTerm + "&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?", function(json){
    console.log(json);
    pages = json.query.pages;
    for (var key in pages) {
      titles.push(pages[key].title);
      descriptions.push(pages[key].extract);
      links.push(pages[key].pageid);
    }

    for (var i = 0; i < titles.length; i++) {
      $("#articles").append("<a href='http://en.wikipedia.org/?curid=" + links[i] + "'><div class='article-blocks'><h2 class='article-header'>"
      + titles[i] + "</h2><br><p class='article-desc'>" + descriptions[i] + "</p></div></a>");
    }
  });
}


$(document).ready(function(){
  $(".button").click(function() {
    $("#articles").empty(); // Clears previous search results
    search();
  });

  // Allows user to search using the enter key
  $("#search-field").keyup(function(event){
    if(event.keyCode == 13){
        $(".button").click();
    }
  });
});
