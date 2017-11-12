var key = config.myKey;

var apiRequest = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var link = 'https://api.wunderground.com/api/' + key + '/forecast/geolookup/conditions/q/' + position.coords.latitude + "," + position.coords.longitude + '.json';
      $.getJSON(link, function(json) {
        console.log(json);

        //Variables
        var location = json.location.city;
        var state = json.location.state;
        var tempC = json.current_observation.feelslike_c;
        var tempF = json.current_observation.feelslike_f;
        var weatherDesc = json.current_observation.weather;
        var weatherIcon = json.current_observation.icon_url;


        var tempCel = "<h3>" + location + ", " + state + "<br>" + tempC + " &#8451" + "<br>" + weatherDesc + "</h3>";
        var tempFah = "<h3>" + location + ", " + state + "<br>" + tempF + " &#8457" + "<br>" + weatherDesc + "</h3>";

        // Default
        $(".main-info").html(tempCel);
        $(".weather-icon").attr("src", weatherIcon);

        // Toggle temperature units
        var unit = "C";
        $(".toggle-button").click(function() {
          if (unit === "C") {
            $(".main-info").html(tempFah);
            unit = "F";
          } else {
            $(".main-info").html(tempCel);
            unit = "C";
          }
        });

      });
    });
  }
}



$(document).ready(function() {
  apiRequest();


});
