import React from 'react';
import './Forecast.css';

const Forecast = ({ forecast }) => {
  const formatDay = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="forecast">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-date">
              <span className="day">{formatDay(day.date)}</span>
              <span className="date">{formatDate(day.date)}</span>
            </div>
            
            <div className="forecast-weather">
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="forecast-icon"
              />
              <span className="forecast-description">{day.description}</span>
            </div>
            
            <div className="forecast-temps">
              <div className="temp-range">
                <span className="max-temp">{day.maxTemp}°</span>
                <span className="min-temp">{day.minTemp}°</span>
              </div>
              <div className="temp-current">{day.temperature}°</div>
            </div>
            
            <div className="forecast-details">
              <div className="forecast-detail">
                <span className="detail-icon">💧</span>
                <span className="detail-text">{day.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <span className="detail-icon">🌬️</span>
                <span className="detail-text">{day.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
