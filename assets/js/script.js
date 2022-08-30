
var searchEl = document.querySelector("#search");
var searchForm = document.querySelector("#searchForm");
var storedCities = document.querySelector("#storedCities");
var appid = "485bbc753e29e9770f09ca55c32c6d79";

var toJSon = function(response) {
  return response.json();
};

var showWeather = function(data, city) {
  console.log(data);
  var fiveDayEl = document.querySelector("#fiveDay");
  var currentEl = document.querySelector("#current");
  var h2El = document.createElement("h2");
  var tempEl = document.createElement("p");
  currentEl.innerHTML = null;
  h2El.textContent = city.name;
  tempEl.textContent = "TEMP: " + data.current.temp;
  windEL.textContent = "WIND: " + data.current.wind_speed;
  humidityEl.textContent = "HUMIDITY: " + data.current.humidity;
  UVIndexEl.textContent = "UV INDEX: " + data.current.uvi;
  currentEl.appendChild(h2El);
  currentEl.appendChild(tempEl);

  console.log("DAILY", data.daily.slice(1,6));
  var fiveDay = data.daily.slice(1,6);
  fiveDayEl.innerHTML = null;
  for (var day of fiveDay) {
    console.log("DAY", day);
    var date = new Date(day.dt * 1000).toLocaleDateString();
    var temp = day.temp.day;
    var icon = day.weather[0].icon;
    var colEl = document.createElement("div");
    var cardEl = document.createElement("div");
    var dateEl = document.createElement("p");
    dateEl.textContent = date;
    var tempEl = document.createElement("p");
    tempEl.textContent = temp;
    colEl.className = "col-12 col-md";
    cardEl.className = "card p-3 m-3";

    var imgEl = document.createElement("img");
    imgEl.alt = icon;
    imgEl.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    
    fiveDayEl.append(colEl);
    colEl.append(cardEl);
    cardEl.append(tempEl);
    cardEl.append(imgEl);
    cardEl.append(tempEl);
  };
};

var showButtons = function() {
  var cities = JSon.parse(localStorage.getItem("cities")) || [];
  storedCities.innerHTML = null;
  for (var city of cities) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = city;
    buttonEl.className = "btn btn-secondary mb-3"
    storedCities.appendChild(buttonEl);
  };
};


var getOneCall = function(city) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

  fetch(oneCall)
    .then(toJSon)
    .then(function(data) {
      showWeather(data, city);
    });
};
  var saveToLocalStorage = function(city) {
    var cities = JSon.parse(localStorage.getItem("cities")) || [];
    cities.push(city);
    var data = JSON.stringify(cities);
    localStorage.setItem("cities", data);
    showButtons();
  };


  var getGeo = function(locations) {
    var city = locations[0];
    console.log("LAT", city.lat);
    console.log("LON", city.lon);
    saveToLocalStorage(city.name);
    getOneCall(city);
  };

  var handleSearch = function(event) {
    event.preventDefault();
    var q = document.querySelector("#q");
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(geoURL)
      .then(toJSon)
      .then(getGeo);
  };
  var handleCityStored = function(event) {
    event.preventDefault();
    if (event.target.matches("button")) {
    var q = event.target.textContent;
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(geoURL)
      .then(toJSon)
      .then(getGeo);
  };
};
  searchEl.addEventListener("click", handleSearch);
  storedCities.addEventListener("click", handleCityStored);
  showButtons();
