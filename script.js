const city = document.getElementById("city");
const currentWeather = document.getElementById("current-desc");
const currentTemp = document.getElementById("current-temp");
const currentWindChill = document.getElementById("current-windChill");
const currentHumidity = document.getElementById("current-humid");
const currentWindSpeed = document.getElementById("current-windSpeed");

const apiKey = "856ff3b913c4ebc84e7e9012d881adf7";

const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=tooele&&units=imperial&appid=${apiKey}`;

fetch(weatherApi)
  .then((response) => response.json())
  .then((weatherData) => {
    // console.log(weatherData);

    displayCurrentWeather(weatherData);
    fiveDayForcastApi(weatherData);
  });

function fiveDayForcastApi(weatherData) {
  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;
  const days = "5";
  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(forecastApi)
    .then((response) => response.json())
    .then((forecastData) => {
      console.log(forecastData);
      // index numbers for the 5 days 7,15,23,31,39 (list is every 3 hours for 5 days).
    });
}

function displayCurrentWeather(weatherData) {
  let spanCity = document.createElement("span");
  spanCity.textContent = weatherData.name;
  city.appendChild(spanCity);

  currently = upperCase(weatherData.weather[0].description);
  currentWeather.textContent = currently;

  currentTemp.textContent = weatherData.main.temp;
  deg = createDeg();
  currentTemp.appendChild(deg);

  currentWindChill.textContent = weatherData.main.feels_like;
  deg = createDeg();
  currentWindChill.appendChild(deg);

  currentHumidity.textContent = weatherData.main.humidity;
  let per = document.createElement("span");
  per.textContent = " %";
  currentHumidity.appendChild(per);

  currentWindSpeed.textContent = weatherData.wind.speed;
  let mph = document.createElement("span");
  mph.textContent = " mph";
  currentWindSpeed.appendChild(mph);
}

function upperCase(lower) {
  let upper = lower
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return upper;
}

function createDeg() {
  let deg = document.createElement("span");
  deg.textContent = " °F";
  return deg;
}
