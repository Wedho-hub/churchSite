


/**
 * WeatherWidget component
 * Fetches weather data from the backend route `/api/weather`
 * and displays the temperature and condition for a preset location.
 * Handles both successful responses and API key configuration issues.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data from backend
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");
        
        const res = await axios.get("/api/weather");
        console.log('Weather API Response:', res.data); // Debug log
        
        // Handle the response format from the backend
        if (res.data.success && res.data.data) {
          setWeather(res.data.data);
        } else if (res.data.city) {
          // Fallback for direct weather data format
          setWeather(res.data);
        } else {
          setError("Invalid weather data format");
        }
      } catch (err) {
        console.error('Weather fetch error:', err);
        
        // Handle different error types
        if (err.response) {
          const status = err.response.status;
          const message = err.response.data?.message || 'Weather service error';
          
          if (status === 500 && message.includes('API key')) {
            setError("Weather service not configured");
          } else if (status === 404) {
            setError("Location not found");
          } else {
            setError(message);
          }
        } else if (err.request) {
          setError("Unable to connect to weather service");
        } else {
          setError("Failed to load weather info");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="card shadow-sm p-3 mb-4 bg-light border rounded-3">
      <h5 className="card-title mb-3">
        <i className="fas fa-cloud-sun me-2"></i>
        Current Weather
      </h5>

      {/* Show loading state */}
      {loading && (
        <div className="d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>Loading weather...</span>
        </div>
      )}

      {/* Show error if fetch fails */}
      {error && !loading && (
        <div className="alert alert-warning mb-0" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          {error.includes('not configured') && (
            <div className="mt-2 small">
              <strong>Note:</strong> Weather API key needs to be configured in the backend.
            </div>
          )}
        </div>
      )}

      {/* Show weather info if available */}
      {weather && !loading && !error && (
        <div>
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-map-marker-alt me-2 text-primary"></i>
            <h6 className="mb-0">{weather.city}{weather.country && `, ${weather.country}`}</h6>
          </div>
          
          <div className="d-flex align-items-center mb-2">
            <div className="me-3">
              <span className="h4 mb-0 text-primary">
                {weather.temperature}°C
              </span>
              {weather.feelsLike && (
                <small className="text-muted d-block">
                  Feels like {weather.feelsLike}°C
                </small>
              )}
            </div>
            <div>
              <div className="text-capitalize fw-bold">
                {weather.description}
              </div>
              {weather.humidity && (
                <small className="text-muted">
                  Humidity: {weather.humidity}%
                </small>
              )}
            </div>
          </div>

          {weather.windSpeed && (
            <div className="mb-2">
              <small className="text-muted">
                <i className="fas fa-wind me-1"></i>
                Wind: {weather.windSpeed} m/s
              </small>
            </div>
          )}

          <p className="text-muted small mb-0">
            <i className="fas fa-clock me-1"></i>
            Updated: {weather.lastUpdated ? 
              new Date(weather.lastUpdated).toLocaleTimeString() : 
              'Just now'
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
