
# Weather Application

## Overview

The Weather Application is a responsive web app built with React that fetches and displays real-time weather data using the Weatherstack API. The application allows users to enter a city name and view current weather conditions including temperature, humidity, wind speed, and weather descriptions. The app is deployed on Vercel for easy access and usage.

## Features

- Fetches and displays current weather information for any city.
- Displays temperature, weather conditions, humidity, and wind speed.
- Provides loading indicators while fetching data.
- Handles errors gracefully and provides user-friendly messages.
- Deployed on Vercel for seamless access.

## Technologies Used

- React: For building the user interface.
- Axios: For making API requests.
- Weatherstack API: For fetching weather data.
- CORS-Anywhere: To handle CORS issues.
- Vercel: For deployment.

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter the name of a city in the input field and click "Get Weather".
3. The current weather information for the specified city will be displayed.

## Project Structure

```plaintext
weather-app/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   │   └── Weather.js
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── .gitignore
├── package.json
└── README.md
```

### Key Files

- **src/components/Weather.js**: Contains the main logic for fetching and displaying weather data.
- **src/App.js**: The main component that includes the `Weather` component.

## API Integration

### Weatherstack API

The application uses the Weatherstack API to fetch weather data. To use the API, you need an API key which you can obtain by signing up at [Weatherstack](https://weatherstack.com/signup/free).

### Handling CORS Issues

To handle CORS issues, the application uses CORS-Anywhere. Ensure that CORS-Anywhere is running on `http://localhost:8080`.

### Weather Component Code

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const API_KEY = 'YOUR_API_KEY'; // Replace with your Weatherstack API key
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
    setLoading(false);
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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h3>Weather in {weather.location.name}</h3>
          <p>Temperature: {weather.current.temperature}°C</p>
          <p>Condition: {weather.current.weather_descriptions[0]}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_speed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
```

## Deployment

The application is deployed on Vercel. Follow these steps to deploy your own version:

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Deploy the Application**:

```bash
vercel
```

3. **Follow the Prompts**:
   - Connect to your Vercel account.
   - Select the project directory.
   - Confirm settings and deploy.

## Contribution

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Weatherstack](https://weatherstack.com/) for providing the weather data API.
- [CORS-Anywhere](https://github.com/Rob--W/cors-anywhere) for handling CORS issues.

---

This README provides a comprehensive overview of your project, including setup instructions, project structure, API integration details, and deployment steps. Feel free to customize any part of it to better fit your project.