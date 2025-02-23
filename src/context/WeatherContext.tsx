import React, { createContext, useState, useContext, useEffect } from "react";
import { WeatherData, WeatherContextType } from "../types/weather.js";
import { getWeather } from "../services/weatherService.js";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getWeather({ city });

      setWeatherData({
        temperature: parseInt(response.main.temp),
        description: response.weather[0].description,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        city: response.name,
        status: response.weather[0].main.toLowerCase(),
        time: new Date().toLocaleTimeString()
      });
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weatherData, loading, error, fetchWeather }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
