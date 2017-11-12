
var quote = "";
var author = "";

var generateQuote = function () {
  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json){
    console.log(json);
    quote = json.quoteText;
    author = json.quoteAuthor;

    $(".quote-text").html("<p>" + quote + "</p>");
    if (author != "") {
      $(".quote-author").html("<p>-" + author + "</p>");
    } else {
      author = "Unknown";
      $(".quote-author").html("<p>-" + author + "</p>");
    }
  });
}

function openURL(url){
  window.open(url, "share", "width=600, height=400");
}



$(document).ready(function() {
  generateQuote();

  $("#generate").click(generateQuote);

  $("#tweet").click(function() {

  openURL('https://twitter.com/intent/tweet?&hashtags=quotequote&text=' + encodeURIComponent('"' + quote + '" -' + author));
  });
});
