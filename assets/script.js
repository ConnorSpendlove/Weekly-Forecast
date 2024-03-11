var API_key = "c06a396859e7202b5818f80aa317171f"

var submitBtn = document.getElementById("submit-btn")

// let weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial"
// let locationAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + userCityVal + "&limit=1&appid=" + API_KEY

document.addEventListener('DOMContentLoaded', function () {
    const locationEntryForm = document.getElementById('location-entry-form');
    const previousLocations = document.getElementById('previous-locations');

    locationEntryForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const locationInput = document.getElementById('location');
        const locationValue = locationInput.value.trim();

        if (locationValue !== '') {
            const locationItem = document.createElement('div');
            locationItem.textContent = locationValue;
            previousLocations.appendChild(locationItem);

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