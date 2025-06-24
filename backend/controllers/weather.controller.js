/**
 * Stub controller for weather data.
 * Returns 501 Not Implemented.
 */

export const getWeatherData = (req, res) => {
  res.status(501).json({ message: "Weather data endpoint not implemented yet." });
};
