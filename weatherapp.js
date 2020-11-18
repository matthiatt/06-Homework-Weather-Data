var apiKey = "d3d78704f63c9721f11068069d1c1516";
var city = "Chicago";
var currentWeatherForcast =
  "https://api.openweathermap.org/data/2.5/weather?appid=";

var fiveDayWeatherForcast =
  "https://api.openweathermap.org/data/2.5/forecast?d3d78704f63c9721f11068069d1c1516&q={city name},{country code}";

$(document).ready(function () {
  var localCity = localStorage.getItem("city");
  $("#list").append(`<li>${localCity}</li>`);
  $("#searchQuary").on("click", function (e) {
    var userInputData = $("#cityQuary").val();
    getWeather(userInputData);
    e.localStorage = true;
  });
});

function getWeather(cityName) {
  var api = "";

  if (cityName !== "") {
    api =
      "https://api.openweathermap.org/data/2.5/weather?appid=" +
      "d3d78704f63c9721f11068069d1c1516" +
      "&q=" +
      cityName;
  } else {
    api = currentWeatherForcast + apiKey + "&q=" + city;
  }

  $.ajax({
    url: api,
    method: "GET",
  }).then(function (response) {
    var currentWeather = response.main.temp;
    console.log(response);

    currentWeather = (currentWeather - 273) * 1.8 + 32;
    currentWeather = Math.floor(currentWeather);
    citySearched = response.name;
    localStorage.setItem("city", citySearched);

    $("#weatherNow").append(
      "<div class= 'weatherSearched'>" +
        "Currently it is: " +
        currentWeather +
        "&degC " +
        "</div>"
    );
    $("#weatherNow").append(
      "<div class='weatherSearched'>" +
        "Location searched: " +
        citySearched +
        "</div>"
    );
    fiveDayWeatherForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.ajax({
      url: fiveDayWeatherForcast,
      method: "GET",
    }).then(function (response) {
      var avgWeatherTemp = 0;
      var pastHistoricalDate = "";
      var totalCount = 0;
      pastHistoricalDate = moment().format("MM/DD/YYYY");

      var key = "d3d78704f63c9721f11068069d1c1516";
      var city = "chicago";
      var url = "https://api.openweathermap.org/data/2.5/forecast";

      $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        data: {
          q: city,
          appid: key,
          units: "imperial",
          cnt: "5",
        },
        success: function (meta) {
          console.log(meta);
          var showFive = "";
          showFive +=
            "<h5>" + meta.city.name + " " + "Five Day Forcast: " + "</h5>";
          $.each(meta.list, function (i, val) {
            showFive += "<p>";
            // showFive += "<br />";
            showFive += "<br />";
            showFive += "<b id='dayNumber'> Day" + i + "</b>: " + " ";
            showFive += "<br />";
            showFive += "<br />";
            showFive += val.main.temp + "&degC";
            showFive += "<br />";
            showFive += "<br />";
            showFive +=
              "<span id='weatherDescription'> | " +
              " " +
              val.weather[0].description +
              " " +
              "</span>";
            showFive += "<br />";
            showFive += "<br />";
            showFive +=
              "<img src='https://openweathermap.org/img/w/" +
              val.weather[0].icon +
              ".png'>";
            showFive += "<br />";
            showFive += "<br />";
            showFive += "</p>";
          });
          $("#fiveDayWeather").html(showFive);
        },
      });
      for (var i = 0; i < response.list.length; i++) {
        var todaysDate = moment(response.list[i]).format("MM/DD/YYYY");
        var tempCalculation = response.list[i].main.tempCalculation;
        tempCalculation = (tempCalculation - 273) * 1.8 + 32;
        tempCalculation = Math.floor(tempCalculation);

        if (pastHistoricalDate === todaysDate) {
          avgWeatherTemp = avgWeatherTemp + tempCalculation;
          totalCount++;
          pastHistoricalDate = todaysDate;
        } else {
          var weatherDataResults = 0;

          weatherDataResults = avgWeatherTemp / totalCount;
          weatherDataResults = Math.floor(weatherDataResults);

          totalCount = 0;
          avgWeatherTemp = 0;
          pastHistoricalDate = todaysDate;
        }
        console.log(response);
      }
    });

    console.log(response);
    if (window.localStorage) {
      var search = document.getElementById("searchQuary");
      search.addEventListener(
        "change",
        function (e) {
          localStorage.setItem("searchQuary", e.search.value);
        },
        false
      );
    }
    if (window.localStorage) {
      var searchFiveDay = document.getElementById("fiveDayWeather");
      searchFiveDay.addEventListener(
        "change",
        function () {
          localStorage.setItem("fiveDayWeather", searchFiveDay.value);
        },
        false
      );
    }
  });
}
