import React from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { MapPin as MapPinIcon } from "lucide-react";
import { useBike } from "../../context/BikeContext.js";
import SelectBox from "../SelectBox/SelectBox.js";
import { City } from "../../types/bike.js";
import "react-loading-skeleton/dist/skeleton.css";
import "./BikeStations.css";

export const BikeStations = () => {
  const { t } = useTranslation();
  const { stations, cities, loading, error, selectedCity, setSelectedCity } =
    useBike();

  const handleCityChange = (cityId: string) => {
    const allCities = Object.values(cities).flat();
    const city = allCities.find((c: City) => c.id === cityId);
    if (city) setSelectedCity(city);
  };

  const cityOptions = Object.entries(cities).reduce(
    (acc, [country, citiesList]) => {
      acc[country] = citiesList.map((city) => ({
        value: city.id,
        label: city.location.city,
      }));
      return acc;
    },
    {} as { [key: string]: Array<{ value: string; label: string }> }
  );

  if (loading) {
    return (
      <div className="bike-stations">
        <Skeleton count={5} height={100} className="station-skeleton" />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="bike-stations">
      <div className="bike-stations__header">
        <h2>{t("BIKE_STATIONS")}</h2>
        <SelectBox
          value={selectedCity?.id || ""}
          options={cityOptions}
          onChange={handleCityChange}
          disabled={loading}
        />
      </div>
      {selectedCity && (
        <div className="bike-stations__location">
          {selectedCity.location.city}, {selectedCity.location.country}
        </div>
      )}
      <div className="bike-stations__list">
        {stations?.network?.stations?.map((station) => (
          <div key={station.id} className="station-card">
            <div className="station-card__header">
              <h3 className="station-card__name">{station.name}</h3>
              <a
                href={`https://www.google.com/maps?q=${station.latitude},${station.longitude}`}
                target="_blank"
              >
                <MapPinIcon size={16} />
              </a>
            </div>
            <div className="station-card__stats">
              <div className="stat">
                <span className="stat__label">{t("AVAILABLE_BIKES")}</span>
                <span className="stat__value">{station.free_bikes}</span>
              </div>
              <div className="stat">
                <span className="stat__label">{t("EMPTY_SLOTS")}</span>
                <span className="stat__value">{station.empty_slots}</span>
              </div>
              {station.distance && (
                <div className="stat">
                  <span className="stat__label">{t("DISTANCE")}</span>
                  <span className="stat__value">
                    {(station.distance / 1000).toFixed(2)} km
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
