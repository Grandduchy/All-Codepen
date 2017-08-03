$(document).ready(function () {
  var temp_measure,city,country,lat,lon,region,link,sign; //creates variables that will be used later on.
  var getIp = function() { //finds the location of the user
    $.ajax({//through the ip.ap.com/json api
    url:"http://ip-api.com/json",
    type:"GET",
    dataType:"json",
    success:function (ip) {
      city = ip.city; //assigning variables that we will use for location of the user.
      country = ip.country;
      lat = ip.lat;
      lon = ip.lon;
      region = ip.region;
    },//sucess
    error:function () {
      $("#weather").html("<h3>Cannot Find Position.</h3>");
      alert("Cannot find coordinates of your location."); //what will display incase of error.
      alert("If you have not already, in your address bar remove the s in 'https'.");
     }//err
    })//ajax
  };//getIp
  getIp();
    if (temp_measure === undefined) { //if there is no measuring tempature, automatically set it to kelvin.
    temp_measure = "kelvin";
      sign = "K"
  }
    setTimeout(function() {link = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=1064b04bb7f8a69e72e2e4238f31cf6d&units=" + temp_measure;}, 2000);
  // wait a two seconds for all the variables to be fulfilled and then set the variable link.
  function getWeather () {
    link = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=1064b04bb7f8a69e72e2e4238f31cf6d&units=" + temp_measure; //redefines link so it can be changed in the future
    $.ajax({
      url:link,
      type:"GET",
      dataType:"json",
      success:function (weatherData) {
          if (weatherData.weather[0].main == 'Clouds') {//changes background image according to the weather.
           $("body").css("background-image", "url('https://www.scss.tcd.ie/~mgrogan/eusipco/TargetPalette/landscape1.jpg')");
         }
          else if (weatherData.weather[0].main == "Clear") {
            $("body").css("background-image", "url('http://image5.tuku.cn/wallpaper/Landscape%20Wallpapers/10416_1280x800.jpg')")
          }
        else if (weatherData.weather[0].main == "Rain") {
          $("body").css("background-image", "url('http://ngm.nationalgeographic.com/u/TvyamNb-BivtNwcoxtkc5xGBuGkIMh_nj4UJHQKuq1gPz4fsBWCZs83e4FIIOk5CIZXGagdYZy91/')")
        }
        else if (weatherData.weather[0].main == "Snow") {
          $("body").css("background-image", "url('http://previews.123rf.com/images/adam1975/adam19751010/adam1975101000003/8143605-View-of-bench-and-trees-through-snowing-Blue-tone--Stock-Photo-snowing-snow.jpg')")
        }
        $("#city").html(city + ", " + region + ", " + country);
        $("#weather").html("<h2>Tempature : " + weatherData.main.temp + " " +sign+"</h2");
        $("#weather").append("<p class = 'temp'>Min tempature : "+ weatherData.main.temp_min +sign +",   "+"Max tempature : "+ weatherData.main.temp_max + sign + "</p>");
        $("#weather").append("<h2>" + weatherData.weather[0].main+"</h2>");
        $("#weather").append("<h4>" + weatherData.weather[0].description + "</h4>");
        $("#weather").append("<h3>Humidity : " + weatherData.main.humidity + "%</h3>");
        $("#weather").append("<h3>Wind : " + weatherData.wind.speed + " m/s</h3>");
      },//sucess
      error:function () {
        alert("Cannot find your weather data.")
        $("#weather").html("<h3>Cannot load weather.</h3>");
      }//error
    })//ajax
  }//getWeather
  setTimeout(getWeather,3000); //wait 3 seconds to getWeather so all the variables are fulfilled
  //if setTimeout wasn't set in the script, all variable would have undefined due to the it skipping/going to fast.
  
  $("#kelvin").click(function() {
    if (temp_measure === "kelvin") {
      
    }  // if it is already the tempmeasure, do nothing.
    else { //otherwise reset the information and run the getWeather function again to get info.
      temp_measure = "kelvin";
      sign = "K";
      getWeather();
    }
  });//#kelvin
  
  $("#imperial").click(function() {
    if (temp_measure === "imperial") {
      
    }
    else {
      temp_measure = "imperial";
      sign = "F°";
      getWeather();
    }
  });//#imperial
  
  $("#metric").click(function() {
    if (temp_measure === "metric") {
      
    }
    else {
    temp_measure = "metric";
    sign = "C°";
    getWeather();
    }
  });//#metric
  
});//.ready(function