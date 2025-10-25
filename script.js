const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const bgVideo = document.getElementById('bgVideo');

// When user clicks the button
getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

// Fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    displayWeather(data);
    updateBackground(data.weather[0].main.toLowerCase());
  } catch (error) {
    weatherDisplay.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

// Display weather info
function displayWeather(data) {
  const { name, main, weather, wind } = data;

  weatherDisplay.innerHTML = `
    <h2>${name}</h2>
    <p>🌡️ Temperature: ${main.temp}°C</p>
    <p>🤒 Feels like: ${main.feels_like}°C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>☁️ Weather: ${weather[0].description}</p>
    <p>🌬️ Wind Speed: ${wind.speed} m/s</p>
  `;
}

// Update background video based on weather
function updateBackground(condition) {
  let videoSrc = 'videos/Sunshine.mp4'; // default

  if (condition.includes('cloud')) videoSrc = 'videos/Clouds.mp4';
  else if (condition.includes('rain')) videoSrc = 'videos/Rain.mp4';
  else if (condition.includes('snow')) videoSrc = 'videos/Snow.mp4';
  else if (condition.includes('thunderstorm')) videoSrc = 'videos/Thunderstorm.mp4';
  else if (condition.includes('clear')) videoSrc = 'videos/Sunshine.mp4';

  const videoSource = bgVideo.querySelector('source');

  if (videoSource.getAttribute('src') !== videoSrc) {
    videoSource.setAttribute('src', videoSrc);
    bgVideo.load();
    bgVideo.play();
  }
}  