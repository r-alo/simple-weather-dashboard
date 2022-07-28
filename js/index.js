//API key variable
const apiKey = '2d5cb8ee08306bcd2e221943675f5ba4';

// HTML get Element variables
    //Input search variables
const citySearch = document.getElementById('city-search');
let storedCities = document.getElementById('stored-cities');

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
        document.querySelector('#main-icon').src = "http://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector('#main-temp').innerText = 'Temperature: ' + temp + ' C°',
        document.querySelector('#main-wind').innerText = 'Wind: ' + speed + ' KPH',
        document.querySelector('#main-humid').innerText = 'Humidity: ' + humidity + ' %';
        this.getUV(lat, lon);
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
        document.querySelector('#main-uvi').innerText = 'UV Index: ' + uvi;
    }

}

// Forecast API call
let weatherForecast = {
        getForecast: function(city) {
            fetch(
                'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=' + apiKey
            )
        .then(response => response.json())
                .then((data) => 
            console.log(data) &
            this.displayForecast(data)
        );
    },
    displayForecast: function(data) {
        let { icon } = data.list[0];
        let { temp, humidity } = data.list[0];
        let { speed } = data.wind;
        console.log(icon, temp, humidity, speed)
        // for (let i = 0; i < 5; i++) {
        //     const element = array[i];
        // }
    }
}

