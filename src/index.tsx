import React from "react";
import ReactDOM from "react-dom/client";
import { WeatherProvider } from "./context/WeatherContext.js";
import { BikeProvider } from "./context/BikeContext.js";
import Main from "./main.js";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BikeProvider>
      <WeatherProvider>
        <Main />
      </WeatherProvider>
    </BikeProvider>
  </React.StrictMode>
);
