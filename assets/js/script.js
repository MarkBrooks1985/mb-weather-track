var searchBtn = document.querySelector("#searchBtn");
var weatherDashboard = document.getElementById("weather-details");
var forecast = document.getElementById("weather-forecast");

searchBtn.addEventListener("click", searchCity);

// fetches the value from the search input

function searchCity() {
  var searchInput = document.querySelector("#search-input").value;
  fetchLocation(searchInput);
}

// fetches the city based on lat and lon

function fetchLocation(searchCity) {
  fetch(
    `https://api.openweathermap.org//geo/1.0/direct?q=${searchCity}&limit=5&appid=d63d983b773a00bdb15f82fa99ec7c45`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Location is not exist for the city");
      } else {
        console.log(data[0]);
        var lat = data[0].lat;
        var lon = data[0].lon;
        fetchWeather(lat, lon, searchCity);
        console.log(lat, lon);
        saveLocation(searchCity);
        renderHistory();
      }
    })
    .catch(function (error) {
      console.error("Error fetching data", error);
    });
}

// saves the city name to local storage

function saveLocation(cityName) {
  var existingCities = localStorage.getItem("searchCity");
  var cityArray = [];
  if (existingCities != null) {
    cityArray = JSON.parse(existingCities);
  }
  var cityExist = cityArray.includes(cityName);
  if (!cityExist) {
    if (cityArray.length > 4) {
      cityArray = cityArray.slice(1);
    }

    cityArray.push(cityName);
  }

  console.log("test", cityArray);

  localStorage.setItem("searchCity", JSON.stringify(cityArray));
}

// fetches the weather data

function fetchWeather(lat, lon, cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=d63d983b773a00bdb15f82fa99ec7c45`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderResult(data, cityName);
      renderForecast(data);
    })
    .catch(function (error) {
      console.error("Error fetching data", error);
    });
}

// renders the current weather to the index page

function renderResult(result, cityName) {
  weatherDashboard.innerHTML = "";

  var divEl = document.createElement("div");
  var h2El = document.createElement("h2");
  var iconEl = document.createElement("img");
  iconEl.src =
    "http://openweathermap.org/img/wn/" +
    result.current.weather[0].icon +
    ".png";
  h2El.textContent =
    cityName + " " + moment.unix(result.current.dt).format("DD/MM/YYYY");
  h2El.appendChild(iconEl);
  divEl.appendChild(h2El);

  var tempEl = document.createElement("p");
  tempEl.textContent = "Temp: " + result.current.temp;
  divEl.appendChild(tempEl);

  var windEl = document.createElement("p");
  windEl.textContent = "Wind: " + result.current.wind_speed;
  divEl.appendChild(windEl);

  var humidEl = document.createElement("p");
  humidEl.textContent = "Humidity: " + result.current.humidity;
  divEl.appendChild(humidEl);

  var uviEl = document.createElement("p");
  uviEl.textContent = "UV Index: " + result.current.uvi;
  divEl.appendChild(uviEl);

  divEl.setAttribute("class", "border-style");

  weatherDashboard.appendChild(divEl);
}

// renders the forecast to the index page

function renderForecast(result) {
  forecast.innerHTML = "";
  console.log(result);
  for (let index = 0; index < 5; index++) {
    var divEl = document.createElement("div");
    var h2El = document.createElement("h2");
    var iconEl = document.createElement("img");
    iconEl.src =
      "http://openweathermap.org/img/wn/" +
      result.daily[index].weather[0].icon +
      ".png";
    h2El.textContent = moment.unix(result.daily[index].dt).format("DD/MM/YYYY");
    h2El.appendChild(iconEl);
    divEl.appendChild(h2El);

    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + result.daily[index].temp.day;
    divEl.appendChild(tempEl);

    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + result.current.wind_speed;
    divEl.appendChild(windEl);

    var humidEl = document.createElement("p");
    humidEl.textContent = "Humidity: " + result.current.humidity;
    divEl.appendChild(humidEl);

    divEl.setAttribute("class", "border-style");

    forecast.appendChild(divEl);
  }
}

// renders previously searched cities to the index page as buttons which reload the weather for them

function renderHistory() {
  var searchHisEl = document.getElementById("search-history");
  var brEl = document.createElement("br");
  var existingCities = localStorage.getItem("searchCity");
  searchHisEl.textContent = "";
  var cityArray = [];
  if (existingCities != null) {
    cityArray = JSON.parse(existingCities);
  }

  for (let index = 0; index < cityArray.length; index++) {
    var button = document.createElement("button");
    button.textContent = cityArray[index];

    button.addEventListener("click", function () {
      console.log(this.innerText);
      fetchLocation(this.innerText);
    });
    searchHisEl.appendChild(button);
  }
}
