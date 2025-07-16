/**
 * Controller for weather data integration.
 * Fetches weather information from OpenWeatherMap API for church location.
 * Provides current weather conditions for display on the website.
 */

import axios from 'axios';

/**
 * Get current weather data for the church location
 * @route GET /api/weather
 * @access Public
 * @param {string} req.query.city - Optional city parameter (defaults to Cape Town)
 * @returns {Object} Weather data including temperature, description, and icon
 */
export const getWeatherData = async (req, res) => {
  try {
    // Get city from query parameter or default to Cape Town (church location)
    const city = req.query.city || 'Cape Town';
    const API_KEY = process.env.WEATHER_API_KEY;

    // Check if API key is configured
    if (!API_KEY) {
      return res.status(500).json({ 
        message: "Weather service is currently unavailable",
        error: "API key not configured" 
      });
    }

    // OpenWeatherMap API endpoint
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch weather data from OpenWeatherMap
    const response = await axios.get(url);
    const data = response.data;

    // Format weather data for frontend consumption
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: weatherData
    });

  } catch (error) {
    console.error('Weather API Error:', error.message);

    // Handle different types of errors
    if (error.response) {
      // API responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || 'Weather service error';

      if (status === 404) {
        return res.status(404).json({
          message: "City not found",
          error: "Please check the city name"
        });
      } else if (status === 401) {
        return res.status(500).json({
          message: "Weather service authentication failed",
          error: "Invalid API key"
        });
      } else {
        return res.status(500).json({
          message: "Weather service temporarily unavailable",
          error: message
        });
      }
    } else if (error.request) {
      // Network error
      return res.status(500).json({
        message: "Unable to connect to weather service",
        error: "Network connection failed"
      });
    } else {
      // Other errors
      return res.status(500).json({
        message: "Weather data processing failed",
        error: error.message
      });
    }
  }
};

/**
 * Get weather forecast for multiple days
 * @route GET /api/weather/forecast
 * @access Public
 * @param {string} req.query.city - Optional city parameter
 * @returns {Object} 5-day weather forecast data
 */
export const getWeatherForecast = async (req, res) => {
  try {
    const city = req.query.city || 'Cape Town';
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ 
        message: "Weather service is currently unavailable",
        error: "API key not configured" 
      });
    }

    // 5-day forecast endpoint
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    // Process forecast data (group by day)
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: date,
          temperature: {
            min: item.main.temp,
            max: item.main.temp
          },
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        };
      } else {
        // Update min/max temperatures
        dailyForecasts[date].temperature.min = Math.min(
          dailyForecasts[date].temperature.min, 
          item.main.temp
        );
        dailyForecasts[date].temperature.max = Math.max(
          dailyForecasts[date].temperature.max, 
          item.main.temp
        );
      }
    });

    // Convert to array and round temperatures
    const forecastArray = Object.values(dailyForecasts).map(day => ({
      ...day,
      temperature: {
        min: Math.round(day.temperature.min),
        max: Math.round(day.temperature.max)
      }
    }));

    res.json({
      success: true,
      city: data.city.name,
      country: data.city.country,
      forecast: forecastArray.slice(0, 5) // Limit to 5 days
    });

  } catch (error) {
    console.error('Weather Forecast API Error:', error.message);
    res.status(500).json({
      message: "Failed to fetch weather forecast",
      error: error.message
    });
  }
};
