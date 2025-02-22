import React, { useEffect } from "react";
import { WeatherWidget } from "./components/WeatherWidget/WeatherWidget.js";
import { BikeStations } from "./components/BikeStations/BikeStations.js";
import { useBike } from "./context/BikeContext.js";
import { useWeather } from "./context/WeatherContext.js";

const Main = () => {
  const { selectedCity } = useBike();
  const { fetchWeather } = useWeather();

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity.location.city);
    }
  }, [selectedCity]);

  return (
    <div className="app">
      <div className="app__container">
        <WeatherWidget />
        <BikeStations />
      </div>
    </div>
  );
};

export default Main; 