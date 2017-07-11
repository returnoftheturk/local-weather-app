$(document).ready(function(){
  var x = document.getElementById("demo");
  var temp_f, temp_c, desc_metric, desc_usa;

  $(".tempunits").click(function(){
    if($(this).text()=="\u{00B0}"+"C"){
      $(this).text("\u{00B0}"+"F");
      console.log($(this).text());
      $("#temperature").html(temp_f + "\u{00B0}");
      $("#condition").html(desc_usa);
    } else if($(this).text()=="\u{00B0}"+"F"){
      $(this).text("\u{00B0}"+"C");
      console.log($(this).text());
      $("#temperature").html(temp_c + "\u{00B0}");
      $("#condition").html(desc_metric);
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function setPosition(position){
      $.ajax( {

        url:"https://api.wunderground.com/api/1699727eaedf2f6e/forecast/conditions/q/"
          + position.coords.latitude + "," + position.coords.longitude + ".json",
        dataType: "json",

        header:{
          contentType: "application/javascript",
          Accept: "application/JSON"
        },
        success: function(data){
          console.log("success");

          temp_c = data.current_observation.temp_c;
          temp_f = data.current_observation.temp_f;
          desc_metric = data.forecast.txt_forecast.forecastday[0].fcttext_metric;
          desc_usa = data.forecast.txt_forecast.forecastday[0].fcttext;

          console.log(this.url);
          $("#location").html(data.current_observation.observation_location.full);
          console.log(data.current_observation.observation_location.full);
          // $("#description").html(data.current_observation.weather);
          console.log(data.current_observation.weather);
          $("#condition").html(data.forecast.txt_forecast.forecastday[0].fcttext_metric);
          console.log(data.forecast.txt_forecast.forecastday[0].fcttext_metric);
          $("#temperature").html(data.current_observation.temp_c + "\u{00B0}");
          console.log(data.current_observation.temp_c);

          $("#icon").attr("src", data.current_observation.icon_url);
          console.log(data.current_observation.icon_url);

        },
        cache: true
      });
    });

  } else {
    alert("You must turn on Geolocation for this app to work");
    // x.innerHTML = "Geolocation is not supported by this browser.";
  }



  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  $("#todays-date").html(date);

});
