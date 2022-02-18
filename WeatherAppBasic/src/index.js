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

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentYear = currentTime.getFullYear();
let currentDay = days[currentTime.getDay()];
let currentMonth = months[currentTime.getMonth()];
let currentDate = currentTime.getDate();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let exactTime = currentTime.getMinutes();
if (exactTime < 10) {
  exactTime = `0${exactTime}`;
}
console.log(newDate);
newDate.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${hours}:${exactTime}`;

let apiKey = "719c79f57389bdae3a53f02f543b77e6";

function searchCity(event) {
  event.preventDefault();
  let newPlace = document.querySelector("#headingPlace");
  let input = document.querySelector("#searchBox");
  newPlace.innerHTML = `${input.value}`;
  let city = input.value;
  city = city.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let clickButton = document.querySelector("form");
clickButton.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#tempCF");
  currentTemp.innerHTML = `${temperature}°`;
}
