const API_KEY = '3045dd712ffe6e702e3245525ac7fa38';
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const weatherInfo = document.getElementById('weatherInfo');
        const error = document.getElementById('error');
        const loading = document.getElementById('loading');

        const weatherIcons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '🌫️',
            'Haze': '🌫️',
            'Dust': '🌫️',
            'Fog': '🌫️',
            'Sand': '🌫️',
            'Ash': '🌫️',
            'Squall': '💨',
            'Tornado': '🌪️'
        };

        function hideAll() {
            weatherInfo.style.display = 'none';
            error.style.display = 'none';
            loading.style.display = 'none';
        }

        function showError(message) {
            hideAll();
            error.textContent = message;
            error.style.display = 'block';
        }

        function showLoading() {
            hideAll();
            loading.style.display = 'block';
        }

        async function getWeather(city) {
            if (!city.trim()) {
                showError('Please enter a city name');
                return;
            }

            showLoading();

            try {
                const response = await fetch(
                    `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('City not found');
                    }
                    throw new Error('Failed to fetch weather data');
                }

                const data = await response.json();
                displayWeather(data);
            } catch (err) {
                showError(err.message);
            }
        }

        function displayWeather(data) {
            hideAll();

            document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
            document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
            
            const weatherMain = data.weather[0].main;
            document.getElementById('weatherIcon').textContent = weatherIcons[weatherMain] || '🌈';

            weatherInfo.style.display = 'block';
        }

        searchBtn.addEventListener('click', () => {
            getWeather(cityInput.value);
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                getWeather(cityInput.value);
            }
        });

        // Load weather for default city on page load
        getWeather('London');