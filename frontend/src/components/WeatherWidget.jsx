import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * WeatherWidget fetches weather data from the backend route `/api/weather`
 * and shows the temperature and condition for a preset location.
 */
function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("/api/weather");
        setWeather(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load weather info");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="card shadow-sm p-3 mb-4 bg-light border rounded-3">
      <h5 className="card-title mb-3">🌤️ Current Weather</h5>

      {error && <div className="text-danger">{error}</div>}

      {!error && !weather && <div>Loading weather...</div>}

      {weather && (
        <div>
          <h6 className="mb-1">{weather.city}</h6>
          <p className="mb-1">
            <strong>{weather.temperature}°C</strong> – {weather.description}
          </p>
          <p className="text-muted small">
            Updated: {new Date(weather.updatedAt).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
