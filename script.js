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
h3.innerHTML = `${day} ${hours}:${minutes}`;

function showTemp(response) {
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${Math.round(response.data.main.temp)}° C`;

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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city.value}`;
  seaarchCity(city.value);
}

function seaarchCity(city) {
  let apiUrl = `http:/api.openweathermap.org/data/2.5/weather?q=${city}&appid=61585f15453918f9f78604040a26d7b6&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let cityResult = document.querySelector("form");
cityResult.addEventListener("submit", search);
