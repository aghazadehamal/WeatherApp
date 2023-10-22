import React, { useState } from 'react';
import axios from 'axios';


function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
        setLoading(true);
        setError(null);
        const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        setWeather(response.data);
      } catch (error) {
        setError('Hava durumu bilgisi alınamadı.');
        setWeather(null);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="weather-container">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
       <button onClick={getWeather} className="search-button">
  Get Weather
</button>

      </div>

      <div className="result-container">
  {loading && <p className="text-blue-400">Loading...</p>}
  {error && <p className="error-text">{error}</p>}
  {weather && (
    <div className="weather-result">
      <h2 className="city-name">{weather.name}</h2>
      <p className="temperature">Temperature: {weather.main.temp}°C</p>
      <p className="weather-description">Weather Condition: {weather.weather[0].description}</p>
    </div>
  )}
</div>

    </div>
  );
}

export default Weather;
