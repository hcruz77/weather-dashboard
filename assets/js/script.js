

var appid = '692efab00ae66e9f48137e6ea4766fcd';
var searchForm = document.querySelector('#searchForm');
var cityHistory = document.querySelector('#cityHistory');
var searchBtn = document.querySelector("#search");



var showWeather = function (data, city) {
  console.log(data);
 // currentEl.innerHTML = '';
var fiveDayEl = document.querySelector('fiveDay');
var currentEl = document.querySelector("#current");
var localDate = new Date(data.current.dt * 1000).toLocaleDateString();
var h2El = document.createElement('h2');
var tempEl = document.createElement('p');
var windEl = document.createElement('p');
var humidityEl = document.createElement('p');
var uviEl = document.createElement('p');
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

console.log('DAILY', data.daily.slice(1,6));
var fiveDay = data.daily.slice(1,6);

//fiveDayEl.innerHTML = '';
for (var day of fiveDay) {

  console.log('DAY', day);

  var date = new Date(data.current.dt * 1000).toLocaleDateString();
  var temp = day.temp.day;
  var colEl = document.createElement('div');
  var cardEl = document.createElement('div');
  var dateEl = document.createElement('p');
  dateEl.textContent = date;
  var tempEl = document.createElement('p');
  tempEl.textContent = temp;
  colEl.className = "col-12 col-md";
  cardEl.className = "card p=3 m-3";

  fiveDayEl.appendChild(colEl);
  colEl.appendChild(cardEl);
  cardEl.appendChild(dateEl);
  cardEl.appencChild(tempEl);
}
}



var historyBtn = function() {
var cities = JSON.parse(localStorage.getItem('cities')) || []; 
cityHistory.innerHTML = '';
for (var city of cities){
  var buttonEl = document.createElement('button');
  buttonEl.textContent = city;
  buttonEl.className = "btn btn-secondary";
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
var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appid}`;
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
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
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
 

   

    
     
       
       
        

   

  





 


  

 


  
  



      
 
