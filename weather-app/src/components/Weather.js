import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const API_KEY = '97ef394bbc324c8e54dea462550dc02'; // Your Weatherstack API key
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
      console.log(`Fetching weather data for: ${city}`);
      console.log(`API URL: ${proxyUrl + apiUrl}`);
      const response = await axios.get(proxyUrl + apiUrl);

      console.log('API response status:', response.status);
      console.log('API response data:', response.data);

      if (response.data.error) {
        console.error('API error:', response.data.error);
        setError(response.data.error.info);
        setWeather(null);
      } else {
        setWeather(response.data);
        setError('');
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Unable to fetch weather data');
      setWeather(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h3>Weather in {weather.location.name}</h3>
          <p>Temperature: {weather.current.temperature}°C</p>
          <p>Condition: {weather.current.weather_descriptions[0]}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
