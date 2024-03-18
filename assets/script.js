document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'c06a396859e7202b5818f80aa317171f';
    const locationEntryForm = document.getElementById('location-entry-form');
    const previousLocations = document.getElementById('previous-locations');
    const forecastCard = document.getElementById('forecast-card');
    const header = document.getElementById('header')
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
        if (!data || !data.name || !data.weather || !data.weather[0] || !data.main || !data.wind) {
            console.error("Invalid data format for current weather.");
            return;
        }
    
        const currentWeather = document.createElement('div');
        currentWeather.innerHTML = `
           
            <p>Today: ${new Date().toLocaleDateString()}</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <p>Temperature: ${(data.main.temp.toFixed(3) * 9/5) + 32}°F</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        header.innerHTML = `City: ${data.name}`
    
        forecastCard.innerHTML = ''; // Clear previous data
        forecastCard.appendChild(currentWeather);
        currentWeather.className = 'forecast-item';
    }

    function displayForecast(data) {
        const today = new Date();
        const nextFiveDays = [];
        const displayedDates = []; // To keep track of dates for which cards have been displayed
    
        for (let i = 1; i < 5; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            nextFiveDays.push(nextDay.toLocaleDateString());
        }
    
        data.list.forEach(item => {
            const itemDate = new Date(item.dt * 1000).toLocaleDateString();
            if (nextFiveDays.includes(itemDate) && !displayedDates.includes(itemDate)) {
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
    
                const date = document.createElement('p');
                date.textContent = `Date: ${itemDate}`;
    
                const weatherIcon = document.createElement('img');
                weatherIcon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    
                const temperature = document.createElement('p');
                // Convert temperature to Fahrenheit
                const tempFahrenheit = (item.main.temp * 9/5) + 32;
                temperature.textContent = `Temperature: ${tempFahrenheit.toFixed(2)}°F`;
    
                const humidity = document.createElement('p');
                humidity.textContent = `Humidity: ${item.main.humidity}%`;
    
                const windSpeed = document.createElement('p');
                windSpeed.textContent = `Wind Speed: ${item.wind.speed} m/s`;
    
                forecastItem.appendChild(date);
                forecastItem.appendChild(weatherIcon);
                forecastItem.appendChild(temperature);
                forecastItem.appendChild(humidity);
                forecastItem.appendChild(windSpeed);
    
                forecastCard.appendChild(forecastItem);
                
                displayedDates.push(itemDate); // Mark this date as displayed
            }
    
            // Check if the current date matches the item's date
            if (itemDate === today.toLocaleDateString()) {
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
    
                const date = document.createElement('p');
                date.textContent = `Date: ${itemDate}`;
    
                const weatherIcon = document.createElement('img');
                weatherIcon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    
                const temperature = document.createElement('p');
                // Convert temperature to Fahrenheit
                const tempFahrenheit = (item.main.temp * 9/5) + 32;
                temperature.textContent = `Temperature: ${tempFahrenheit.toFixed(2)}°F`;
    
                const humidity = document.createElement('p');
                humidity.textContent = `Humidity: ${item.main.humidity}%`;
    
                const windSpeed = document.createElement('p');
                windSpeed.textContent = `Wind Speed: ${item.wind.speed} m/s`;
    
                forecastItem.appendChild(date);
                forecastItem.appendChild(weatherIcon);
                forecastItem.appendChild(temperature);
                forecastItem.appendChild(humidity);
                forecastItem.appendChild(windSpeed);
            }
        });
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