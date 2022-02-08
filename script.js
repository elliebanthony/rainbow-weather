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
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  console.log(response);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${temp}° C`;

  let wind = Math.round(response.data.wind.speed);
  console.log(wind);
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind Speed: ${wind} m/ph`;

  let humid = Math.round(response.data.main.humidity);
  console.log(humid);
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `Humidity: ${humid} %`;

  let conditions = response.data.weather[0].description;
  console.log(conditions);
  let state = document.querySelector("#state");
  state.innerHTML = `${conditions}`;

  let iconImage = response.data.weather[0].icon;
  console.log(iconImage);
  let icon = document.querySelector("#icon");
  icon.innerHTML = `${iconImage}`;
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
