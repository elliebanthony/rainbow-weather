let now = new Date();
let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h3.innerHTML = `Last Updated: ${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function showTemp(response) {
  let number = document.querySelector("#number");
  number.innerHTML = `${Math.round(response.data.main.temp)}`;

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} m/ph`;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;

  let state = document.querySelector("#state");
  state.innerHTML = `${response.data.weather[0].description}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celcTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "61585f15453918f9f78604040a26d7b6&";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
    <div class="col-2">
          <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="40"
            class="forecast-icon"
          />
          <div class="forecast-temp">
            <span> ${Math.round(forecastDay.temp.max)}° </span>
            <span> ${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>

  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city.value}`;
  seaarchCity(city.value);
}

function seaarchCity(city) {
  let apiKey = "61585f15453918f9f78604040a26d7b6&";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let cityResult = document.querySelector("form");
cityResult.addEventListener("submit", search);

let celcTemp = null;

function fahrConvert(event) {
  event.preventDefault();

  let fahrTemp = document.querySelector("#number");
  let fahrElement = (celcTemp * 9) / 5 + 32;
  fahrTemp.innerHTML = Math.round(fahrElement);
}
let fah = document.querySelector("#fahr");
fah.addEventListener("click", fahrConvert);

function celcConvert(event) {
  event.preventDefault();
  let celcElement = document.querySelector("#number");
  celcElement.innerHTML = Math.round(celcTemp);
}
let celc = document.querySelector("#celc");
celc.addEventListener("click", celcConvert);
