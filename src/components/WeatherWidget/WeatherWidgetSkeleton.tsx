import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./WeatherWidget.css";

export const WeatherWidgetSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#fefefe">
      <article className="weather-card" style={{ backgroundColor: "#f3f3f3" }}>
        <div className="weather-card__content">
          <header className="weather-card__header">
            <div className="weather-card__temperature">
              <Skeleton width="150px" />
            </div>
          </header>
          <div className="weather-card__condition">
            <Skeleton width="130px" />
          </div>
          <div className="weather-card__meta">
            <Skeleton width="220px" />
          </div>
        </div>
      </article>
    </SkeletonTheme>
  );
};
