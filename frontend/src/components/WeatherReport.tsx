import { useState, useEffect } from "react";
import { Country } from "../types/country";
import { WeatherData } from "../types/weather";
import { weatherAPI } from '../config/supabase';
import { Typography } from "@mui/material";

import FilterDramaIcon from '@mui/icons-material/FilterDrama';

interface WeatherReportProps {
  country: Country;
}

const WeatherReport = ({ country }: WeatherReportProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = weatherAPI; // bring it from .env file
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setWeather(data);
          setError(null);
        } else {
          setWeather(null);
          setError(data.message || "City not found");
        }
      } catch (err) {
        console.error("Error fetching weather data", err);
        setWeather(null);
        setError("Something went wrong. Try again later.");
      }
    };

    if (country.capital) {
      fetchWeather();
    }
  }, [country.capital]);

  return (
    <div>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FilterDramaIcon />
            <Typography variant="h6" component="h2" gutterBottom>Weather in {country.capital}</Typography>
          </div>
          <Typography>{weather.weather[0].description}</Typography>
          <Typography>Temperature: {weather.main.temp}°C</Typography>
          <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
        </div>
      )}
    </div>
  );
};

export default WeatherReport;
