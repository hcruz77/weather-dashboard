
var searchEl = document.querySelector("#search");
var appid = '692efab00ae66e9f48137e6ea4766fcd';
var searchForm = document.querySelector('#searchForm');
var city = document.querySelector("#city");
var storedCities = document.querySelector('#storedCities');
var currentEl = document.getElementById("#current");

function displayWeather(city) {
//var getGeo = function(locations){
var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${appid}`;
fetch(geoURL)
.then(function (response) {
  return response.json();
})
.then(function (locations) {
  console.log(locations);
  var city = locations[0];
  console.log('LAT', city.lat);
  console.log('LON', city.lon);
  saveToLocalStorage(city.name);
  getOneCall(city);
})
}



 //pull weather for location
  var getOneCall = function (city) {
  var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

  fetch(oneCall)
  .then(function (response){
    return response.json();
  })
   
    .then(function (data) {
      console.log(data);
      city.innerHTML = city.name;

      currentEl(data, city);
      
    });
  }

var saveToLocalStorage = function(city) {
  var cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.push(city);
  var data = JSON.stringify(cities);
  localStorage.setItem("cities", data);
  showButtons();
}





var showWeather = function (data, city) {
  console.log(data);
  var localDate = new Date(data.current.dt * 1000).toLocaleDateString();
  var h2El = document.createElement('h2');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');
  var uviEl = document.createElement('p');
  currentEl.innerHTML = '';
  h2El.textContent = city.name + ' ' + localDate;
  tempEl.textContent = 'TEMP: ' + data.current.temp;
  windEl.textContent = 'WIND: ' + data.current.wind_speed;
  humidityEl.textContent = 'HUMIDITY: ' + data.current.humidity;
  uviEl.textContent = 'UV INDEX: ' + data.current.uvi
  currentEl.appendChild(h2El);
  currentEl.appendChild(tempEl);
  currentEl.appendChild(windEl);
  currentEl.appendChild(humidityEl);
  currentEl.appendChild(uviEl);
}

  //will display 5-day

  var fiveDayEl = document.querySelector('#fiveDay');

 //var h5El = document.createElement('h5');
 //var tempEl = document.createElement('p');
 //var windEl = document.createElement('p');
 
 var fiveForecast = function(data){
 for(var i = 0; i < 5; i++) {
  console.log(data.daily[i])
  forecastDate[i].textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString()
  temp[i].innerHTML = 'TEMP:'
  //tempEl.textContent = 'TEMP: ' + data.daily[i].temp.day;
  //windEl.textContent = 'WIND: ' + data.daily.wind_speed;
  //humidityEl.textContent = 'HUMIDITY: ' + data.daily.humidity;
  //fiveDayEl.appendChild(h5El);
  //fiveDayEl.appendChild(tempEl);
  //fiveDayEl.appendChild(windEl);
  //fiveDayEl.appendChild(humidityEl);
 }
 }

  var displaySearch = function () {
    var city = JSON.parse(localStorage.getItem("city")) || [];
    storedCities.innerHTML = '';
    for (var i = 0;i < city.length; i ++) {
      var buttonEl = document.createElement("button");
      buttonEl.textContent = city[i];
      buttonEl.className = "btn btn-info mb-3"
      storedCities.appendChild(buttonEl);
    }
  }


    var handleSearch = function(event){
      event.preventDefault();
      //var city = document.querySelector('#city');
      
      fetch(geoURL)
      .then(toJSon)
      .then(getGeo);
    }
    var handleCityStored = function(event) {
      event.preventDefault();
      if (event.target.matches("button")) {
        var city = event.target.textContent;
        var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${appid}`;
        fetch(geoURL)
        .then(toJSon)
        .then(getGeo);
      }
    }
    searchForm.addEventListener("click", handleSearch);
    storedCities.addEventListener("click", handleCityStored);
  



      
 
