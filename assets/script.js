var API_KEY = "c06a396859e7202b5818f80aa317171f";
    document.addEventListener('DOMContentLoaded', function () {
        const locationEntryForm = document.getElementById('location-entry-form');
        const previousLocations = document.getElementById('previous-locations');
        const forecastCard = document.getElementById('forecast-card');

        locationEntryForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const locationInput = document.getElementById('location');
            const locationValue = locationInput.value.trim();

            if (locationValue !== '') {
                // Make API call to get forecast
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationValue}&appid=${API_KEY}&units=imperial`)
                    .then(response => response.json())
                    .then(data => {
                        // Clear previous forecast
                        forecastCard.innerHTML = '';

                        // Display 5-day forecast
                        for (let i = 0; i < data.list.length; i += 8) { // Forecast for every 24 hours (8 times in 5 days)
                            const forecastItem = document.createElement('div');
                            forecastItem.textContent = `Date: ${data.list[i].dt_txt}, Temperature: ${data.list[i].main.temp}°F`;
                            forecastCard.appendChild(forecastItem);
                        }
                    })
                    .catch(error => console.error('Error fetching forecast:', error));

                // Save to local storage
                localStorage.setItem('previousLocation', locationValue);

                // Clear input
                locationInput.value = '';
            }
        });

        // Retrieve from local storage
        const savedLocation = localStorage.getItem('previousLocation');
        if (savedLocation) {
            const locationItem = document.createElement('div');
            locationItem.textContent = savedLocation;
            previousLocations.appendChild(locationItem);
        }
    });