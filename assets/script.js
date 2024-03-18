document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'c06a396859e7202b5818f80aa317171f';
    const locationEntryForm = document.getElementById('location-entry-form');
    const previousLocations = document.getElementById('previous-locations');
    const forecastCard = document.getElementById('forecast-card');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function fetchWeatherData(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
            })
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayCurrentWeather(data) {
        const currentWeather = document.createElement('div');
        currentWeather.innerHTML = `
            <h2>${data.name}</h2>
            <p>${new Date().toLocaleDateString()}</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        forecastCard.innerHTML = ''; // Clear previous data
        forecastCard.appendChild(currentWeather);
    }

    function displayForecast(data) {
        const forecast = document.createElement('div');
        data.list.forEach(item => {
            const forecastItem = document.createElement('div');
            forecastItem.innerHTML = `
                <p>Date: ${new Date(item.dt * 1000).toLocaleDateString()}</p>
                <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                <p>Temperature: ${item.main.temp}°C</p>
                <p>Humidity: ${item.main.humidity}%</p>
                <p>Wind Speed: ${item.wind.speed} m/s</p>
            `;
            forecast.appendChild(forecastItem);
        });
        forecastCard.appendChild(forecast);
    }

    function updateSearchHistory(city) {
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
        previousLocations.innerHTML = ''; // Clear previous data
        searchHistory.forEach(city => {
            const historyItem = document.createElement('div');
            historyItem.textContent = city;
            historyItem.addEventListener('click', () => fetchWeatherData(city));
            previousLocations.appendChild(historyItem);
        });
    }

    locationEntryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const cityInput = document.getElementById('location');
        const city = cityInput.value.trim();
        if (city !== '') {
            fetchWeatherData(city);
            updateSearchHistory(city);
            cityInput.value = '';
        }
    });

    updateSearchHistory(''); // Initialize search history
});