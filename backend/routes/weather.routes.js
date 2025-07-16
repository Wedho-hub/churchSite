
/**
 * Routes for weather data integration.
 * Provides current weather and forecast data for church location.
 * All routes are public access for display on website.
 */

import express from 'express';
import { getWeatherData, getWeatherForecast } from '../controllers/weather.controller.js';

const router = express.Router();

// 🌤️ GET: Current weather data (public access)
// Supports optional city parameter or defaults to church location
router.get(['/', '/:city'], getWeatherData);

// 📅 GET: 5-day weather forecast (public access)
// Provides extended weather information for planning church events
router.get('/forecast', getWeatherForecast);

export default router;
