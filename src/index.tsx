import React from "react";
import ReactDOM from "react-dom/client";
import { LanguageProvider } from "./context/LanguageContext.js";
import { WeatherProvider } from "./context/WeatherContext.js";
import { BikeProvider } from "./context/BikeContext.js";
import Main from "./main.js";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BikeProvider>
        <WeatherProvider>
          <Main />
        </WeatherProvider>
      </BikeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
