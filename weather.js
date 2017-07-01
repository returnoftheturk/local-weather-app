$(document).ready(function(){
  var x = document.getElementById("demo");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function setPosition(position){
      $.ajax( {

        url:"https://api.wunderground.com/api/1699727eaedf2f6e/conditions/q/"
          + position.coords.latitude + "," + position.coords.longitude + ".json",
        dataType: "json",
        //data: position.coords.latitude + "," + position.coords.longitude + ".json",
        //crossDomain:true,
        //type: "GET",
        header:{
          contentType: "application/javascript",
          Accept: "application/JSON"
        },
        success: function(data){
          console.log("success");
          console.log(this.url);
          $("#location").html(data.current_observation.display_location.full);
          console.log(data.current_observation.display_location.full);
          $("#description").html(data.current_observation.weather);
          console.log(data.current_observation.weather);
          $("#condition").html(data.current_observation.temp_f);
          console.log(data.current_observation.temp_f);
          $("#temperature").html(data.current_observation.temp_c);
          console.log(data.current_observation.temp_c);

          $("#icon").attr("src", data.icon_url);

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
