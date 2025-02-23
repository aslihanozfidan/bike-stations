import React from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudRainIcon as CloudStorm,
  CloudSnow,
} from "lucide-react";
import { useWeather } from "../../context/WeatherContext.js";
import { WeatherWidgetSkeleton } from "./WeatherWidgetSkeleton.js";
import "./WeatherWidget.css";

type WeatherStatusType = {
  [key: string]: {
    Icon: typeof Sun;
    bgColor: string;
    textColor: string;
    gradient: string;
  };
};

const weatherStatus: WeatherStatusType = {
  clear: {
    Icon: Sun,
    bgColor: "bg-yellow-400",
    textColor: "text-yellow-900",
    gradient: "bg-gradient-to-r from-yellow-300 to-yellow-500",
  },
  clouds: {
    Icon: Cloud,
    bgColor: "bg-gray-400",
    textColor: "text-gray-900",
    gradient: "bg-gradient-to-r from-gray-300 to-gray-500",
  },
  rain: {
    Icon: CloudRain,
    bgColor: "bg-blue-400",
    textColor: "text-blue-900",
    gradient: "bg-gradient-to-r from-blue-300 to-blue-500",
  },
  snow: {
    Icon: CloudSnow,
    bgColor: "bg-white",
    textColor: "text-gray-700",
    gradient: "bg-gradient-to-r from-white to-gray-200",
  },
  thunderstorm: {
    Icon: CloudStorm,
    bgColor: "bg-purple-500",
    textColor: "text-purple-900",
    gradient: "bg-gradient-to-r from-purple-400 to-purple-600",
  },
};

export const WeatherWidget = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return <WeatherWidgetSkeleton />;
  }

  const status = weatherData?.status?.toLowerCase() || "clear";
  const { Icon } = weatherStatus[status] || weatherStatus.clear;

  return (
    <div className="weather-widget">
      <article className={`weather-card weather-card--${status}`}>
        <div className="weather-card__content">
          <header className="weather-card__header">
            <div className="weather-card__temperature">
              {error ? "N/A" : weatherData?.temperature ? `${weatherData.temperature}°` : "N/A"}
            </div>
            <Icon
              className="weather-card__icon"
              size={90}
              strokeWidth={1.5}
            />
          </header>
          <div className="weather-card__condition">
            {error ? "No data available" : weatherData?.description || "No data"}
          </div>
          <div className="weather-card__meta">
            {error ? (
              "Weather information unavailable"
            ) : (
              `${weatherData?.city || "Unknown"} · Current · ${weatherData?.time || ""}`
            )}
          </div>
        </div>
      </article>
    </div>
  );
};
