$(document).ready(function() 
{
var apiKey = "d3d78704f63c9721f11068069d1c1516";
var city = "Chicago";
var currentWeatherForcast = "https://api.openweathermap.org/data/2.5/weather?appid=";
var fiveDayWeatherForcast = "https://api.openweathermap.org/data/2.5/forecast?d3d78704f63c9721f11068069d1c1516&q={city name},{country code}";
var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
var arraySearch = JSON.parse(localStorage.getItem("Search History")) || [];
var localCity = localStorage.getItem("city");
$("#list").append(`<li>${localCity}</li>`);
  $("#searchQuary").on("click", function(event) 
  {
    var userInputData = $("#cityQuary").val();
    getWeather(userInputData);
  
  });
});

function getWeather(cityName) 
{
  var api = "";

  if (cityName !== "") 
  {
    api = "https://api.openweathermap.org/data/2.5/weather?appid=" + "d3d78704f63c9721f11068069d1c1516" + "&q=" + cityName;
  } else 
  {
    api = currentWeatherForcast + apiKey + "&q=" + city;
  }

  $.ajax(
      {
    url: api,
    method: "GET"
  }).then(function(res) 
  {
    var currentWeather = res.main.temp;
    console.log(res);

    currentWeather = (currentWeather - 273) * 1.8 + 32;
    currentWeather = Math.floor(currentWeather);
    citySearched = res.name;
    localStorage.setItem("city", citySearched);

    $("#weatherNow").append("<div>" + currentWeather + "</div>");
    $("#weatherNow").append("<div>" + citySearched + "</div>");
    fiveDayWeatherForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

     $.ajax(
         {
      url: fiveDayWeatherForcast,
      method: "GET"
    }).then(function(response) 
    {

      var avgWeatherTemp = 0;
      var pastHistoricalDate = "";
      var totalCount = 0;
      var weatherDataResults = 0;
      pastHistoricalDate = moment().format("MM/DD/YYYY");
      for (var index = 0; index < response.list.length; index++) 
      {
        var todaysDate = moment(response.list[index].dt, "").format(
          "MM/DD/YYYY"
        );
        var tempCalculation = response.list[index].main.tempCalculation;
        tempCalculation = (tempCalculation - 273) * 1.8 + 32;
        tempCalculation = Math.floor(tempCalculation);

        if (pastHistoricalDate === todaysDate) 
        {
          avgWeatherTemp = avgWeatherTemp + tempCalculation;
          totalCount++;
          pastHistoricalDate = todaysDate;
        } else 
        {
          weatherDataResults = avgWeatherTemp / totalCount;
          weatherDataResults = Math.floor(weatherDataResults);

          var displayWeatherCard = $("<div class = 'card col-md-12'>");

          var headDiv = $("<div id= 'card-header'>");
          headDiv.append("Date: " + '' + todaysDate);
          displayWeatherCard.append(headDiv);

          var bodydiv = $("<div id= 'card-body'>");
          bodydiv.append("Average Temperature: " + weatherDataResults);
          displayWeatherCard.append(bodydiv);

          $("#fiveDayWeather").append(displayWeatherCard);

          totalCount = 0;
          avgWeatherTemp = 0;
          pastHistoricalDate = todaysDate;
        }
        console.log(response);
          if (window.localStorage) {
            var search = document.getElementById("fiveDayWeather");
            search.addEventListener("change", function () {
              localStorage.setItem("fiveDayWeather", search.value);
              }, false);
        }
      }
    });
         console.log(response);
            if (window.localStorage) {
              var search = document.getElementById("searchQuary");
              search.addEventListener("change", function () {
                localStorage.setItem("searchQuary", search.value);
                }, false);
        }
      });
}