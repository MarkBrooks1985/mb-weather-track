var searchBtn = document.querySelector("#searchBtn")
var weatherDashboard = document.getElementById("weather-details")
var forecast = document.getElementById("weather-forecast")

searchBtn.addEventListener('click', searchCity)

function searchCity() {
    // read the value from the textbox
    var searchInput = document.querySelector("#search-input").value;
    fetchLocation(searchInput)
    console.log(searchInput);
    // call third party api to fetch the data for the city
    
    // render the data
}
// https://api.openweathermap.org//geo/1.0/direct?q=function%20searchCity()%20{%20%20%20%20//%20read%20the%20value%20from%20the%20textbox%20%20%20%20var%20searchInput%20=%20document.querySelector(%22

function fetchLocation(searchCity) {
    fetch(`https://api.openweathermap.org//geo/1.0/direct?q=${searchCity}&limit=5&appid=d63d983b773a00bdb15f82fa99ec7c45`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(!data[0]){
            alert("Location is not exist for the city")
        }
        else {
            console.log(data[0])
            var lat = data[0].lat;
            var lon =  data[0].lon;
            fetchWeather(lat, lon, searchCity);
            console.log(lat, lon)
            // $("textarea#ExampleMessage").val(result.exampleMessage);
           // var result = fetchWeather(lat, lon);
          // renderResult(result)
        }
    })
    .catch(function(error){
        console.error("Error featching data", error)
    })
}

function fetchWeather(lat, lon, cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=d63d983b773a00bdb15f82fa99ec7c45`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        renderResult(data, cityName);
        renderForecast(data);
    })
    .catch(function(error){
        console.error("Error fetching data", error)
    })
}

function renderResult(result, cityName){
    // show date next to city name
    // create element > add text > add the element to weatherDashboard
    weatherDashboard.innerHTML = "";
    
    var divEl = document.createElement('div')
    var h2El = document.createElement('h2')
    var iconEl = document.createElement("img")
    iconEl.src = "http://openweathermap.org/img/wn/"+ result.current.weather[0].icon +".png"
    h2El.textContent = cityName + " " + moment.unix(result.current.dt).format("DD/MM/YYYY")
    h2El.appendChild(iconEl);
    divEl.appendChild(h2El);

    // icon
    // extracted from result temp, wind, humidity, uv index
    var tempEl = document.createElement('p')
    tempEl.textContent = "Temp: " + result.current.temp
    divEl.appendChild(tempEl);

    var windEl = document.createElement('p')
    windEl.textContent = "Wind: " + result.current.wind_speed
    divEl.appendChild(windEl);

    var humidEl = document.createElement('p')
    humidEl.textContent = "Humidity: " + result.current.humidity
    divEl.appendChild(humidEl);

    var uviEl = document.createElement('p')
    uviEl.textContent = "UV Index: " + result.current.uvi
    divEl.appendChild(uviEl);

    divEl.setAttribute('class', 'border-style');

    weatherDashboard.appendChild(divEl);
}

function renderForecast(result) {
 // result.daily - array - use loop starting 0 till <5
 forecast.innerHTML = "";
 console.log(result)
 for (let index = 0; index < 5; index++) {
    // create 
    // add text value
    // 
    var divEl = document.createElement('div')
    var h2El = document.createElement('h2')
    var iconEl = document.createElement("img")
    iconEl.src = "http://openweathermap.org/img/wn/"+ result.daily[index].weather[0].icon +".png"
    h2El.textContent = moment.unix(result.daily[index].dt).format("DD/MM/YYYY")
    h2El.appendChild(iconEl);
    divEl.appendChild(h2El);

    var tempEl = document.createElement('p')
    tempEl.textContent = "Temp: " + result.daily[index].temp.day
    divEl.appendChild(tempEl);

    var windEl = document.createElement('p')
    windEl.textContent = "Wind: " + result.current.wind_speed
    divEl.appendChild(windEl);

    var humidEl = document.createElement('p')
    humidEl.textContent = "Humidity: " + result.current.humidity
    divEl.appendChild(humidEl);

    divEl.setAttribute('class', 'border-style');

    forecast.appendChild(divEl);
    // append to forecast
 };
};
// https://api.openweathermap.org//geo/1.0/direct?q=Adelaide&limit=5&appid=d63d983b773a00bdb15f82fa99ec7c45

console.log(searchBtn);