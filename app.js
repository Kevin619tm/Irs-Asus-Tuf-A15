// API Configuration
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Get free key from https://openweathermap.org/api
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const currentWeatherEl = document.getElementById('currentWeather');
const forecastGridEl = document.getElementById('forecastGrid');
const errorMessageEl = document.getElementById('errorMessage');

// Event Listeners
searchBtn.addEventListener('click', () => searchByCity());
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchByCity();
});
locationBtn.addEventListener('click', getUserLocation);

// Initialize app
window.addEventListener('load', () => {
    const savedCity = localStorage.getItem('lastCity') || 'New York';
    fetchWeatherByCity(savedCity);
});

/**
 * Search weather by city name
 */
function searchByCity() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    fetchWeatherByCity(city);
}

/**
 * Get user's current location
 */
function getUserLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    locationBtn.disabled = true;
    locationBtn.textContent = '⏳';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
            locationBtn.disabled = false;
            locationBtn.textContent = '📍';
        },
        (error) => {
            showError('Unable to get your location: ' + error.message);
            locationBtn.disabled = false;
            locationBtn.textContent = '📍';
        }
    );
}

/**
 * Fetch weather by city name
 */
async function fetchWeatherByCity(city) {
    try {
        clearError();
        showLoading();
        
        // Get current weather
        const currentResponse = await fetch(
            `${WEATHER_API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!currentResponse.ok) {
            throw new Error('City not found. Please try again.');
        }
        
        const currentData = await currentResponse.json();
        const { lat, lon } = currentData.coord;
        
        // Get forecast
        const forecastResponse = await fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        const forecastData = await forecastResponse.json();
        
        // Display data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
        // Save to localStorage
        localStorage.setItem('lastCity', city);
        cityInput.value = '';
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Fetch weather by coordinates
 */
async function fetchWeatherByCoordinates(lat, lon) {
    try {
        clearError();
        showLoading();
        
        // Get current weather
        const currentResponse = await fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!currentResponse.ok) {
            throw new Error('Unable to fetch weather data.');
        }
        
        const currentData = await currentResponse.json();
        
        // Get forecast
        const forecastResponse = await fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        const forecastData = await forecastResponse.json();
        
        // Display data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
        // Save to localStorage
        localStorage.setItem('lastCity', currentData.name);
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Display current weather
 */
function displayCurrentWeather(data) {
    const { main, weather, wind, clouds, sys, name, country } = data;
    const icon = getWeatherIcon(weather[0].main);
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const html = `
        <div class="weather-main">
            <div class="weather-info">
                <h2>${name}, ${country}</h2>
                <p style="font-size: 1.3rem; color: #667eea; margin-top: 10px;">${weather[0].description.toUpperCase()}</p>
            </div>
            <div class="weather-icon">${icon}</div>
        </div>
        <div class="weather-details">
            <div class="detail-card">
                <h3>Temperature</h3>
                <p>${Math.round(main.temp)}°C</p>
            </div>
            <div class="detail-card">
                <h3>Feels Like</h3>
                <p>${Math.round(main.feels_like)}°C</p>
            </div>
            <div class="detail-card">
                <h3>Humidity</h3>
                <p>${main.humidity}%</p>
            </div>
            <div class="detail-card">
                <h3>Wind Speed</h3>
                <p>${wind.speed} m/s</p>
            </div>
            <div class="detail-card">
                <h3>Pressure</h3>
                <p>${main.pressure} hPa</p>
            </div>
            <div class="detail-card">
                <h3>Cloudiness</h3>
                <p>${clouds.all}%</p>
            </div>
            <div class="detail-card">
                <h3>Sunrise</h3>
                <p>${sunrise}</p>
            </div>
            <div class="detail-card">
                <h3>Sunset</h3>
                <p>${sunset}</p>
            </div>
        </div>
    `;
    currentWeatherEl.innerHTML = html;
}

/**
 * Display 5-day forecast
 */
function displayForecast(data) {
    const dailyForecasts = {};

    // Group forecasts by day
    data.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }
    });

    // Create forecast cards (5 days)
    let html = '';
    let dayCount = 0;
    for (const date in dailyForecasts) {
        if (dayCount >= 5) break;
        const forecast = dailyForecasts[date];
        const icon = getWeatherIcon(forecast.weather[0].main);
        const dateObj = new Date(forecast.dt * 1000);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

        html += `
            <div class="forecast-card">
                <h3>${dayName}</h3>
                <p>${dateObj.toLocaleDateString()}</p>
                <div class="icon">${icon}</div>
                <p>${forecast.weather[0].description}</p>
                <p class="temp-range">${Math.round(forecast.main.temp_max)}°C / ${Math.round(forecast.main.temp_min)}°C</p>
            </div>
        `;
        dayCount++;
    }
    forecastGridEl.innerHTML = html;
}

/**
 * Get weather icon based on condition
 */
function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '🌋',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    return icons[condition] || '🌤️';
}

/**
 * Show loading state
 */
function showLoading() {
    currentWeatherEl.innerHTML = '<div class="loading">Loading weather data...</div>';
    forecastGridEl.innerHTML = '';
}

/**
 * Show error message
 */
function showError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.classList.add('show');
}

/**
 * Clear error message
 */
function clearError() {
    errorMessageEl.classList.remove('show');
    errorMessageEl.textContent = '';
}