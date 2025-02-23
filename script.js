const city = document.getElementById("city");
const currentWeather = document.getElementById("current-desc");
const currentTemp = document.getElementById("current-temp");
const currentWindChill = document.getElementById("current-windChill");
const currentHumidity = document.getElementById("current-humid");
const currentWindSpeed = document.getElementById("current-windSpeed");
const forecastDay = [
  document.getElementById("data1"),
  document.getElementById("data2"),
  document.getElementById("data3"),
  document.getElementById("data4"),
  document.getElementById("data5"),
];
const forecastImg = [
  document.getElementById("weatherIcon1"),
  document.getElementById("weatherIcon2"),
  document.getElementById("weatherIcon3"),
  document.getElementById("weatherIcon4"),
  document.getElementById("weatherIcon5"),
];

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
  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(forecastApi)
    .then((response) => response.json())
    .then((forecastData) => {
      //   console.log(forecastData);
      // index numbers for the 5 days 7,15,23,31,39 (list is every 3 hours for 5 days).
      let loopNum = 0;
      for (let i = 7; i < 40; i += 8) {
        displayForecast(forecastData.list[i].main.temp, loopNum);
        displayIcon(
          forecastData.list[i].weather[0].icon,
          forecastData.list[i].weather[0].description,
          loopNum
        );
        loopNum++;
      }
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

function displayForecast(temp, index) {
  forecastDay[index].textContent = temp;
}

function displayIcon(iconCode, altDesc, index) {
  const imgUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  //   console.log(imgUrl);
  forecastImg[index].src = imgUrl;
  //   console.log(altDesc);
  forecastImg[index].alt = altDesc;
}
