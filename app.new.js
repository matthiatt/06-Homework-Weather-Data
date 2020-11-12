var icontElement = document.getElementById("#weatherIcon");
var tempElement = document.getElementById("#tempValue p");
var descElement = document.getElementById("#tempDescription p");
var locationElement = document.getElementById("#location p");
var notificationElement = document.getElementById("#notification");
var inputValue = document.getElementById("#inputValue");
const weather = {};
weather.temperature = {
    unit: "celsius"
}

const kelvin = 273;
const key = "d3d78704f63c9721f11068069d1c1516";

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.notification = "<p>Browser Doesn't support Geolocation</p>";
}

function setPosition(currentLocation) {
    var latitude = currentLocation.coords.latitude;
    var longitude = currentLocation.coords.longitude;

    getWeather(latitude, longitude);
}
setPosition();

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.notification = "<p>${error.message}</p>";
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=$latitude&lon=$longitude&appid=d3d78704f63c9721f11068069d1c1516`;

    fetch(api)
        .then(function (response) {
            var data = response.json();
            weather.temperature.value = Math.floor(data.main.temperature - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        });
}
getWeather();

function displayWeather() {
    icontElement.weatherIcon = "<img src=";
    icons / $ `{weather.iconId}.jpg` > "";
    tempElement.tempValue = `${weather.temperature.value}°<span>C</span>`;
    descElement.tempDescription = weather.description;
    locationElement.location = `${weather.city}, ${weather.country}`;
    $ `window.sessionStorage` ["weather"] = "this will be here even after refresh";
    var weather = $ `window.sessionStorage` ["weather"];
}
displayWeather();

function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}
celsiusToFahrenheit();
function TempClick() {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.value === "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = math.floor(fahrenheit);

        tempElement.tempValue = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
};

function getWeather(displayWeather) {
    var search = "city name";
    var cities = JSON.parse(localStorage.getItem("cities"));
    if (cities === null) {
        cities = [];
        localStorage.setItem("cities", JSON.stringify(cities));

        fetch(api)
            .then(function (response) {
                let data = response.json();
                return data;
            })
            .then(function (data) {
                weather.temperature.value = Math.floor(data.main.temperature - kelvin);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
            })
            .then(function () {
                displayWeather();
            });
    }
}
getWeather();

// function displayCities() {
//     newDiv = $("<div>");
//     newDiv.addClass("container");
//     for (var i = 0; i < displayCities.length; i++) {
//         var newCity = $("<h3>");
//         newCity.text(cities[i]);
//         newCity.addClass("border bg-black p-2");
//         newDiv.append(newCity);
//     }
//     $("aside").append(newDiv);
// }

// function addCity() {
//     cities.push($("#city-input").val().trim());
//     localStorage.setItem("cities", JSON.stringify(cities));
// }
// $("#city-submit").on("click", function (e) {
//     e.preventDefault;
//     addCity();
//     displayCities();
// })
// $.ajax({
//         url: queryURL, //not defined
//         method: "GET",
//         accept: "application/JSON",
//     })
//     .then(function (response) {
//         console.log(response);
//         if (window.localStorage) {
//             var search = document.getElementById("city-input");
//             search.addEventListener("change", function () {
//                 localStorage.setItem("city-input", search.value);
//             }, false);
//         }
//         $window.sessionStorage["search"] = 'this will be here even after refresh';
//         var search = $window.sessionStorage["search"];
//     });