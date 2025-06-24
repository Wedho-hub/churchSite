// utils/weather.js
const axios = require('axios');

/**
 * Fetch current weather for a given city
 * @param {string} city - default to Cape Town
 * @returns {Promise<Object>} weather data
 */
exports.getWeather = async (city = 'Cape Town') => {
  const API_KEY = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const { data } = await axios.get(url);
  return {
    city: data.name,
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};
