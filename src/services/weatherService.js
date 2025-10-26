import axios from 'axios';

// You'll need to get a free API key from https://openweathermap.org/api
const API_KEY = '452a48e84185d48c8045f140aeb91463'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherService = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCurrentWeather = async (city) => {
  try {
    const response = await weatherService.get('/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      visibility: response.data.visibility / 1000, // Convert to km
      uvIndex: response.data.uvi || 'N/A',
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else {
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }
};

export const getForecast = async (city) => {
  try {
    const response = await weatherService.get('/forecast', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    // Group forecast by day and take the first forecast of each day
    const dailyForecasts = {};
    response.data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: new Date(item.dt * 1000),
          temperature: Math.round(item.main.temp),
          minTemp: Math.round(item.main.temp_min),
          maxTemp: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        };
      }
    });

    // Convert to array and take next 5 days
    return Object.values(dailyForecasts).slice(1, 6);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else {
      throw new Error('Failed to fetch forecast data. Please try again.');
    }
  }
};
