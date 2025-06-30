const apiKey = "YOUR_API_KEY"; // Replace this with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("locationInput").value;
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();

    document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = data.main.temp.toFixed(1);
    document.getElementById("wind").innerText = data.wind.speed;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Something went wrong. Please try again.");
  }
}