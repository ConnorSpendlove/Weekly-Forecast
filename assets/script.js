var API_key = "c06a396859e7202b5818f80aa317171f"

var userCity = document.getElementById("input");
var submitBtn = document.getElementById("submit-btn")


let weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial"
let locationAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + userCityVal + "&limit=1&appid=" + API_KEY