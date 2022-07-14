var searchBtn = document.querySelector("#searchBtn")

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

function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org//geo/1.0/direct?q=${searchCity}&limit=5&appid=d63d983b773a00bdb15f82fa99ec7c45`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(!data[0]){
            alert("Location is not exist for the city")
        }
        else {

        }
    })
    .catch(function(error){
        console.error("Error featching data", error)
    })
}

function renderResult(result){
   
}

// https://api.openweathermap.org//geo/1.0/direct?q=Adelaide&limit=5&appid=d63d983b773a00bdb15f82fa99ec7c45

console.log(searchBtn);