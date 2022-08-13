const apiLocUrl = 'https://api.openweathermap.org/geo/1.0/';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'be2ea8423e0031faf9ece172477a5a27';

const setQuery = (e) => {
    if(e.keyCode === 13)
        getResult(city.value);
}

const getResult = (cityName) => {
    let query = `${apiLocUrl}direct?q=${cityName}&appid=${apiKey}`
    fetch(query)
        .then(location => {
            return location.json()
        })
        .then(locData)
}

const locData = (data) => {
    let lat = data[0].lat;
    let lon = data[0].lon;
    getVariables(lat, lon);
}

const getVariables = (lat, lon) => {
    let query = `${apiUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(query)
        .then(data => {
            return data.json()
        })
        .then(displayResults)
}

const displayResults = (result) => {
    let cityName = document.querySelector('.city')
    cityName.innerText = `${result.name}, ${result.sys.country}`

    let temperature = document.querySelector('.temperature')
    temperature.innerText = `${Math.round((result.main.temp)-273)}°C`

    let tempMinMax = document.querySelector('.min-max')
    tempMinMax.innerText = `${Math.round((result.main.temp_min)-273)}°C / ${Math.round((result.main.temp_max)-273)}°C`

    let weather = document.querySelector('.status')
    weather.innerText = `${result.weather[0].main}`
}

const city = document.getElementById('city');
city.addEventListener('keypress', setQuery);
