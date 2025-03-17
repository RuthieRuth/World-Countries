import { useState, useEffect } from "react";
import { Country } from "../types/country";
import { WeatherData } from "../types/weather";
//import { weatherAPI } from "../config/openweather";
import { weatherAPI } from '../config/supabase';

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
      <h2>Weather in {country.capital}</h2>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherReport;
