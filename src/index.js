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
