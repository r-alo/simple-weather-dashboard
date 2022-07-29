//API key variable
const apiKey = '2d5cb8ee08306bcd2e221943675f5ba4';

// HTML get Element variables
    //Input search variables
let storedCities = document.getElementById('stored-cities');
let todayDate = moment().format('dddd, MMM Do YYYY');

let citySearch = document.querySelector('#city-search');
let searchBtn = document.querySelector('#search-btn');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentCity = citySearch.value;
    console.log(currentCity);
    
        currentWeather.getWeather(currentCity) & weatherForecast.getForecast(currentCity)
})

//Current Weather
    //Display current date
document.querySelector('#main-date').innerText = todayDate;
    // Current weather API call
let currentWeather = {
    getWeather: function(city) {
        
        fetch(
            'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey
        )
        .then(response => response.json())
        .then(data => 
            console.log(data) &
            this.displayCurrent(data) 
        );
    },

    //Get main current weather and display in HTML
    displayCurrent: function(data) {
        const {name} = data;    
        const {icon} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind ;
        const {lat, lon} = data.coord;
        console.log(name, icon, temp, speed, humidity);
        //Display data in respective HTML tags
        document.querySelector('#main-city').innerText = name,
        document.querySelector('#main-icon').src = `http://openweathermap.org/img/wn/${icon}.png`,
        document.querySelector('#main-temp').innerText = `Temperature: ${temp}`,
        document.querySelector('#main-wind').innerText = `Wind: ${speed}KPH`,
        document.querySelector('#main-humid').innerText = `Humidity: ${humidity}%`;
        this.getUV(lat, lon)
    },

    //Get UV Index via another fetch for HTML display
    getUV: function (lat, lon) {
        fetch(
            'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,daily,hourly,alerts&units=metric&appid=' + apiKey
        )
            .then(response => response.json())
            .then(data =>
                console.log(data) &
                this.displayUV(data)
            );
    },
    displayUV: function (data) {
        const { uvi } = data.current;
        console.log(uvi);
        document.querySelector('#main-uvi').innerText = uvi;
        //Assign color to UV index
        function uvLevel() {
        if (uvi < 3) {
            $('#main-uvi').css({ 'color': 'black', "background-color": "#77dd77", 'border-radius': '2px', 'padding': '0px 3px 0px 3px'});
        }
        else if (uvi >= 3 && uvi < 6 ) {
            $('#main-uvi').css({ 'color': 'black', "background-color": "#ebde34", 'border-radius': '2px', 'padding': '0px 3px 0px 3px'});
        }
        else if (uvi >= 6 && uvi < 8) {
            $('#main-uvi').css({ 'color': 'black', "background-color": "#dea92c", 'border-radius': '2px', 'padding': '0px 3px 0px 3px'});
        }
        else if (uvi >= 8 && uvi < 11) {
            $('#main-uvi').css({'color': 'white',"background-color": "#de3121", 'border-radius': '2px', 'padding': '0px 3px 0px 3px'});
        }
        else {
            $('#main-uvi').css({ 'color': 'white', "background-color": "#8e04d9", 'border-radius': '2px', 'padding': '0px 3px 0px 3px'});
        }
        }
        uvLevel();
    },
}

// Weather Forecast
    //Loop for 5 days forecast
let weatherForecast = {
    getForecast: function (city) {
        fetch(
            'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=' + apiKey
        )
            .then(response => response.json())
            .then((data) => {
                let todayDate = moment().format('dddd, MMM Do YYYY');
                let dates = ["2022-07-30", "2022-07-31", "2022-08-01", "2022-08-02", "2022-08-03"];
                let selected = []
                data.list.forEach((list) => {
                    
                    if (list.dt_txt.split(' ')[0] === dates[selected.length]) {
                        selected.push(list);
                        return list;
                    }
                    return false;
                })
                // console.log(data);
                console.log(selected) & this.displayForecast(selected);
            });
    },
    //Display data on HTML cards
    displayForecast: function (data) {
        for (let i = 0; i < 5; i++) {
            let { icon } = data[i].weather[0];
            let { temp, humidity } = data[i].main;
            let { speed } = data[i].wind;
            console.log(icon, temp, humidity, speed)
            document.querySelector('#temp-' + (i + 1)).innerText = `Temperature: ${temp}`,
            document.querySelector('#icon-' + (i + 1)).src = `http://openweathermap.org/img/wn/${icon}.png`,
            document.querySelector('#wind-' + (i + 1)).innerText = `Wind: ${speed}KPH`,
            document.querySelector('#humid-' + (i + 1)).innerText = `Humidity: ${humidity}%`;
                }
    }
}

    // currentWeather.getWeather('guadalajara') & weatherForecast.getForecast('guadalajara')


