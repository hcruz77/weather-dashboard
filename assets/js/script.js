

var appid = '692efab00ae66e9f48137e6ea4766fcd';

var storedCities = document.querySelector('#storedCities');
var searchBtn = document.querySelector("#search");



var showWeather = function (data, city) {
  console.log(data);
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
}



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
 
    getGeo(locations)
    
  }
  
  searchBtn.addEventListener('click', handleSearch);
 

   

    
     
       
       
        

      //   var fiveForecast = function(data){
      //    for(var i = 0; i < 5; i++) {
      //  console.log(data.daily[i])
      //  forecastDate[i].textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString()
      //  var h5El = document.createElement('h5');
      //  temp[i].innerHTML = 'TEMP:'
      //  tempEl.textContent = 'TEMP: ' + data.daily[i].temp.day;
      //  windEl.textContent = 'WIND: ' + data.daily[i].wind_speed;
      //  humidityEl.textContent = 'HUMIDITY: ' + data.daily[i].humidity;
      //  cardEl.appendChild(h5El);
      //  cardEl.appendChild(tempEl);
      //  cardEl.appendChild(windEl);
      //  cardEl.appendChild(humidityEl);

  
 

  





 


  //var fiveDayEl = document.querySelector('#fiveDay');

 //var h5El = document.createElement('h5');
 //var tempEl = document.createElement('p');
 //var windEl = document.createElement('p');
 
 //var fiveForecast = function(data){
 //for(var i = 0; i < 5; i++) {
 // console.log(data.daily[i])
 // forecastDate[i].textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString()
 // temp[i].innerHTML = 'TEMP:'
  //tempEl.textContent = 'TEMP: ' + data.daily[i].temp.day;
  //windEl.textContent = 'WIND: ' + data.daily.wind_speed;
  //humidityEl.textContent = 'HUMIDITY: ' + data.daily.humidity;
  //fiveDayEl.appendChild(h5El);
  //fiveDayEl.appendChild(tempEl);
  //fiveDayEl.appendChild(windEl);
  //fiveDayEl.appendChild(humidityEl);
 

 


  
  



      
 
