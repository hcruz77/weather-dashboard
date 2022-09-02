
var searchEl = document.querySelector("#search");
var appid = '692efab00ae66e9f48137e6ea4766fcd';
var q = "Chicago";
//var searchForm = document.querySelector("#searchForm");

//pull location for weather
var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

fetch(geoURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (locations) {
    var city = locations[0];
    console.log('LAT', city.lat);
    console.log('LON', city.lon);

    //pull weather for location
    var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

    fetch(oneCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
//will display current data

        var currentEl = document.querySelector("#current");

        var h2El = document.createElement('h2');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        var uviEl = document.createElement('p');
        h2El.textContent = city.name;
        tempEl.textContent = 'TEMP: ' + data.current.temp;
        windEl.textContent = 'WIND: ' + data.current.wind_speed;
        humidityEl.textContent = 'HUMIDITY: ' + data.current.humidity;
        uviEl.textContent = 'UV INDEX: ' + data.current.uvi
        currentEl.appendChild(h2El);
        currentEl.appendChild(tempEl);
        currentEl.appendChild(windEl);
        currentEl.appendChild(humidityEl);
        currentEl.appendChild(uviEl);

//will display 5-day

       // var fiveDayEl = document.querySelector('#fiveDay');

        var h5El = document.createElement('h5');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        console.log(data.daily)
        for(var i = 0; i < 5; i++) {
          tempEl.textContent = 'TEMP: ' + data.daily[i].day.temp;
          windEl.textContent = 'WIND: ' + data.daily.wind_speed;
          humidityEl.textContent = 'HUMIDITY: ' + data.daily.humidity;
          fiveDayEl.appendChild(h5El);
          fiveDayEl.appendChild(tempEl);
          fiveDayEl.appendChild(windEl);
          fiveDayEl.appendChild(humidityEl);
          
        }


        //date
      });
  });
  //searchEl.addEventListener("click", handleSearch);
