import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{weather.city}, {weather.country}</h2>
          <p className="description">{weather.description}</p>
        </div>
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{weather.temperature}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="temp-details">
          <p>Feels like {weather.feelsLike}°C</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌬️</div>
          <div className="detail-content">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{weather.windSpeed} m/s {getWindDirection(weather.windDirection)}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{weather.visibility} km</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">📊</div>
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.pressure} hPa</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌅</div>
          <div className="detail-content">
            <span className="detail-label">Sunrise</span>
            <span className="detail-value">{formatTime(weather.sunrise)}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌇</div>
          <div className="detail-content">
            <span className="detail-label">Sunset</span>
            <span className="detail-value">{formatTime(weather.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
