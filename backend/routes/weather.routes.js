
/**
 * Routes for weather data.
 * Uses ES module syntax.
 */

import express from 'express';
import { getWeatherData } from '../controllers/weather.controller.js';

const router = express.Router();

// Public route — used by frontend
// Refactored optional parameter route to array of paths to comply with path-to-regexp v1+
// Original route: '/:city?'
router.get(['/', '/:city'], getWeatherData);

export default router;
