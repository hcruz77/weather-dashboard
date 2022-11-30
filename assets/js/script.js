

var appid = '692efab00ae66e9f48137e6ea4766fcd';
var searchForm = document.querySelector('#searchForm');
var cityHistory = document.querySelector('#cityHistory');
var searchBtn = document.querySelector("#search");

 
var fiveDayEl = document.querySelector('#fiveDay');
var currentEl = document.querySelector("#current");

var showWeather = function (data, city) {
  console.log(data);
var localDate = new Date(data.current.dt * 1000).toLocaleDateString();
var h2El = document.createElement('h2');
var tempEl = document.createElement('p');
var windEl = document.createElement('p');
var humidityEl = document.createElement('p');
var icon = data.current.weather[0].icon;
var uviEl = document.createElement('p');
var imgEl = document.createElement('img');
h2El.textContent = city.name + ' ' + localDate;
tempEl.textContent = 'TEMP: ' + data.current.temp + " °F";
windEl.textContent = 'WIND: ' + data.current.wind_speed;
humidityEl.textContent = 'HUMIDITY: ' + data.current.humidity + ' %';
uviEl.textContent = 'UV INDEX: ' + data.current.uvi;

imgEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
imgEl.width = 80;
imgEl.height = 80;
imgEl.alt = icon;

currentEl.appendChild(h2El);
currentEl.appendChild(imgEl)
currentEl.appendChild(tempEl);
currentEl.appendChild(windEl);
currentEl.appendChild(humidityEl);
currentEl.appendChild(uviEl);


var fiveDay = data.daily.slice(1,6);
console.log(fiveDay);
fiveDayEl.innerHTML = null;
for (var day of fiveDay) {
  var icon = day.weather[0].icon;
  var date = new Date(day.dt * 1000).toLocaleDateString();
  var colEl = document.createElement('div');
  var cardEl = document.createElement('div');
  var h5El = document.createElement('h5');
  var temp = document.createElement('p');
  var img = document.createElement('img');
  var wind = document.createElement('p');
  var humidity = document.createElement('p');
  colEl.className = "card col-12 col-md p-3 m-3 border border-dark bg-secondary text-white;";
  colEl.style.width = '20rem';
  cardEl.className = "card-body";
  h5El.className = 'card-title';
  temp.className = 'card-text';

  h5El.textContent = date;
  temp.textContent = "Temp: " + day.temp.day + " °F";
  wind.textContent = "Wind: " + day.wind_speed + " mph";
  humidity.textContent = "Humidity: " + day.humidity + " %";

  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  img.width = 40;
  img.height = 40;
  img.alt = icon;

  fiveDayEl.appendChild(colEl);
 colEl.appendChild(cardEl);
  cardEl.appendChild(h5El);
  cardEl.appendChild(img);
  cardEl.appendChild(temp);
  cardEl.appendChild(wind);
  cardEl.appendChild(humidity);
}
};



var historyBtn = function() {
var cities = JSON.parse(localStorage.getItem('cities')) || []; 
cityHistory.innerHTML = '';
for (var city of cities){
  var buttonEl = document.createElement('button');
  buttonEl.textContent = city;
  buttonEl.className = "btn btn-secondary btn-block";
  cityHistory.appendChild(buttonEl);
}

};


var getOneCall = function(city) {
var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

    fetch(oneCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        showWeather(data, city);
      })
    }

    var saveToLocalStorage =function(city) {
      var cities = JSON.parse(localStorage.getItem('cities')) || [];
      cities.push(city);
      var data = JSON.stringify(cities);
      localStorage.setItem('cities', data)
      historyBtn();
    }

    var getGeo = function(locations) {
      var city = locations[0];
      console.log('LAT', city.lat);
      console.log('LON', city.lon);
      saveToLocalStorage(city.name);
      getOneCall(city);
    }
   


var handleSearch = function(event) {
  event.preventDefault();
var q = document.querySelector('#q');
var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appid}`;
fetch(geoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getGeo(data);
  })
 
  }
  var handleCityClick = function(event){
    event.preventDefault();
    if (event.target.matches('button')) {
    var q = event.target.textContent;
    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getGeo(data);
    })
  }
  }
  
  searchBtn.addEventListener('click', handleSearch);
  cityHistory.addEventListener('click', handleCityClick);
  historyBtn();
 

   

    
     
       
       
        

   

  





 


  

 


  
  



      
 
