import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import { getCurrentWeather, getForecast } from './services/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Delhi');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const [currentWeather, forecastData] = await Promise.all([
        getCurrentWeather(cityName),
        getForecast(cityName)
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = (searchCity) => {
    if (searchCity.trim()) {
      setCity(searchCity);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <h1>Weather Report</h1>
          <p>Get current weather and 5-day forecast for any city</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {weather && !loading && !error && (
          <>
            <WeatherCard weather={weather} />
            <Forecast forecast={forecast} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
