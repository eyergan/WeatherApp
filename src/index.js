let currentTime = new Date();

let newDate = document.querySelector("#currentDate");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let exactTime = currentTime.getMinutes();
if (exactTime < 10) {
  exactTime = `0${exactTime}`;
}
console.log(newDate);
newDate.innerHTML = `Last updated: ${currentDay}, ${hours}:${exactTime}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastList");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
   <li class="list-group-item weather-forecast-temp">${formatDay(
     forecastDay.dt
   )}
                <img src= "http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                     alt=""
                     width= 42/>
                <span class="weather-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </li>
  `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

let apiKey = "719c79f57389bdae3a53f02f543b77e6";

function search(city) {
  let apiKey = "719c79f57389bdae3a53f02f543b77e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#searchBox");
  search(input.value);
}

let clickButton = document.querySelector("form");
clickButton.addEventListener("submit", handleSubmit);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "719c79f57389bdae3a53f02f543b77e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#headingPlace");
  let currentTemp = document.querySelector("#tempCF");
  let descripton = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celciusTemp = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  descripton.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempCF");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempCF");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Albany");
