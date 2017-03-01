$(document).ready(function(){
  var x = document.getElementById("demo");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function setPosition(position){
      $.ajax( {

        url:"http://api.openweathermap.org/data/2.5/weather?",
        dataType: "JSON",
        data: "lat=" + position.coords.latitude + "&lon="+ position.coords.longitude
        + "&appid=a23cc25cf5bb29796354ebbfb426a789&units=metric",
        crossDomain:true,
        type: "GET",
        header:{
          contentType: "application/javascript",
          Accept: "application/JSON"
        },
        success: function(data){
          console.log("success");
          $("#location").html(data.name);
          $("#description").html(data.weather[0].main);
          $("#condition").html(data.main.temp_min);
          $("#temperature").html(data.main.temp_max);

          $("#icon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        },
        cache: false
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
