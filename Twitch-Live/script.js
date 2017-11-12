var streamers = ["voyboy", "scarra", "shroud", "summit1g", "c9sneaky",
                "timthetatman", "lolrenaynay", "freecodecamp"];

var streamName, streamGame, streamLink;
var streamLogo = "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_600x600.png";

// Get stream data
function getStreamData() {
  for (var i = 0; i < streamers.length; i++) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"
                + streamers[i] + "?callback=?", function(data) {
      // Check if offline
      if (data.stream === null) {
        // If offline, get channel info from channel api call
        streamName = data._links.channel.substr(38);
        getChannelData();
      } else {
        streamName = data.stream.channel.display_name;
        streamGame = streamName + " is currently playing " + data.stream.channel.game;
        streamLogo = data.stream.channel.logo;
        streamLink = data.stream.channel.url;
        updateHTML("online");
      }
    });
  }
}

// Get channel data
function getChannelData() {
  $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/"
              + streamName + "?callback=?", function(data) {
    if (data.status === 422 || data.status === 404) {
      // User does not exist
      streamGame = data.message;
      alert(streamGame);
    } else {
      streamName = data.display_name;
      streamGame = streamName + " is currently offline";
      streamLogo = data.logo;
      streamLink = data.url;
      updateHTML("offline");
    }
  });
}

// Add a new streamer
function addStreamer() {
  var addStreamName =  $("#search-input").val().toLowerCase();

  // Check if the streamer has already been added
  if (streamers.indexOf(addStreamName) === -1) {
    // Add new streamer to array and create a new block
    streamers.push(addStreamName);
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"
                + addStreamName + "?callback=?", function(data) {
      // Check if offline
      if (data.stream === null) {
        // If offline, get channel info from channel api call
        streamName = data._links.channel.substr(38);
        getChannelData();
      } else {
        streamName = data.stream.channel.display_name;
        streamGame = streamName + " is currently playing " + data.stream.channel.game;
        streamLogo = data.stream.channel.logo;
        streamLink = data.stream.channel.url;
        updateHTML("online");
      }
    });
  } else {
    alert(addStreamName + " has already been added to the list.");
  }
}

// Update the HTML to add a new streamer block
function updateHTML(arg) {
  if (arg === "online") {
    $(".stream-online").prepend("<div class='stream-block online'><a href='" + streamLink + "' target='_blank'><img class='stream-logo' src='" +
    streamLogo + "'>" + "<p class='stream-status'>"
    + streamGame + "</p></a></div>");
  } else {
    $(".stream-offline").prepend("<div class='stream-block offline'><a href='" + streamLink + "' target='_blank'><img class='stream-logo' src='" +
    streamLogo + "'>" + "<p class='stream-status'>"
    + streamGame + "</p></a></div>");
  }
}


$("document").ready(function() {
  // Get data once page loads
  getStreamData();

  // Hide/show streamers using buttons
  $("#button-all").click(function() {
    $(".online").show();
    $(".offline").show();
  });
  $("#button-online").click(function() {
    $(".online").show();
    $(".offline").hide();
  });
  $("#button-offline").click(function() {
    $(".offline").show();
    $(".online").hide();
  });

  $(".button-add").click(function() {
    addStreamer();
    $("#search-input").val("");
  });

  // Allows user to search using the enter key
  $("#search-input").keyup(function(event){
    if(event.keyCode == 13){
        $(".button-add").click();
    }
  });
});
