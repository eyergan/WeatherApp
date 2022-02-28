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

search("Albany");

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#headingPlace");
  let currentTemp = document.querySelector("#tempCF");
  let descripton = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  currentTemp.innerHTML = `${temperature}°`;
  descripton.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
