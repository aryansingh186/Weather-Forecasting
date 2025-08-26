// first , here i will put api keys and Api url 
const apiKey = "9616ef5c884710a781a0841757022167"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// using Dom , here i am selecting  important Elements like input , button , icon 
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

/* here , i am  creating async function that accept city name
 --- Inside this function , here i will use try catch for error handling  */

async function checkWeather(city) {
  try { 
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric"
      }
    });

    const data = response.data;
    console.log(data);

    // here , i am storing  the API response in a variable 
    document.querySelector(".city").innerText = data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    const windKmh = Math.round(data.wind.speed * 3.6);
    document.querySelector(".wind").innerText = windKmh + " km/h";


    // update icon
 if (data.weather[0].main === "Clouds") {
  weatherIcon.src = "images/clouds.png";
  document.body.style.backgroundImage = "url('images/clearly.jpg')";
} else if (data.weather[0].main === "Clear") {
  weatherIcon.src = "images/clear.png";
  document.body.style.backgroundImage = "url('images/clearly.jpg')";
} else if (data.weather[0].main === "Rain") {
  weatherIcon.src = "images/rain.png";
  document.body.style.backgroundImage = "url('images/rainy.jpg')";
} else if (data.weather[0].main === "Mist") {
  weatherIcon.src = "images/mist.png";
  document.body.style.backgroundImage = "url('images/misty.jpg')";
} 
else {
  weatherIcon.src = "images/clear.png";
  document.body.style.backgroundImage = "url('images/clearly.jpg')";
}

  } catch (error) {
    if (error.response && error.response.status === 404) {
      document.querySelector(".city").innerText = "City not found";
      document.querySelector(".temp").innerText = "--°C";
      document.querySelector(".humidity").innerText = "--%";
      document.querySelector(".wind").innerText = "-- km/h";
      weatherIcon.src = "images/error.png";
    } else {
      console.error("API Error:", error.message);
    }
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
