//   //test below
//   var weather;

//   function gotData(data) {
//       println(data);
//       weather = data;
//   }

//   function draw() {
//       background(0);
//       isFinite(weather);
//       ellipse(50, 100, weather.main.temp, weather.main.temp);
//   }

// var search = "city name";
// var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=d3d78704f63c9721f11068069d1c1516";
// var cities = JSON.parse(localStorage.getItem("cities"));
// if (cities === null) {
//     cities = [];
//     localStorage.setItem("cities", JSON.stringify(cities));
// }

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
// });
// $.ajax({
//         url: queryURL,
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
//     });
//   window.addEventListener("load", function () {
//               let long;
//               let lat;

//               if (navigator.geolocation) {
//                   navigator.geolocation.getCurrentPosition(position => {
//                       long = position.coords.longitude;
//                       lat = position.coords.latitude;
//                   });
//               } else {
//                   h1.textContent = "YOOOO TURN ON YOUR GPS FUNCTIONS";
//   var row = $("<div>").addClass("row");
//   var col = $("<div>").addClass("col");
//   var card = $("<div>").addClass("card bg-primary text-black");
//made this portion in relation to <table ng-controller="weatherTableCtrl"
//   function weatherTableCtrl($scope, $http) {
//       $http.get("js/items.json")
//       .success(function(data) { $scope.sessions = data.sessions; })
//       .error(function(data) { console.log("error") });
//   }
