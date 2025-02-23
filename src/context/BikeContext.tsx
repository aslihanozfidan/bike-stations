import React, { createContext, useState, useContext, useEffect } from "react";
import { BikeContextType, City, GroupedCities, NetworkResponse } from "../types/bike.js";
import {
  getCities,
  getStationsByCityId,
} from "../services/bikeService.js";
import { getCityName } from "../services/locationService.js";

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export function BikeProvider({ children }: { children: React.ReactNode }) {
  const [stations, setStations] = useState<NetworkResponse | null>(null);
  const [cities, setCities] = useState<GroupedCities>({});
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const findCityByName = (cityName: string, citiesMap: GroupedCities): City | null => {
    const allCities = Object.values(citiesMap).flat();
    
    return allCities.find(
      city => city.location.city.toLowerCase() === cityName.toLowerCase()
    ) || null;
  };

  const initializeCity = async (citiesMap: GroupedCities) => {
    try {
      const cityName = await getCityName();
      const foundCity = findCityByName(cityName, citiesMap);
      
      const firstCountryCities = Object.values(citiesMap)[0] || [];
      setSelectedCity(foundCity || firstCountryCities[0] || null);
    } catch (err) {
      console.error("Error initializing city:", err);
      const firstCountryCities = Object.values(citiesMap)[0] || [];
      setSelectedCity(firstCountryCities[0] || null);
    }
  };

  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(null);
      const citiesData = await getCities();
      setCities(citiesData);
      await initializeCity(citiesData);
    } catch (err) {
      setError("Failed to fetch cities");
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyStations = async (cityId: string) => {
    try {
      setLoading(true);
      setError(null);
      const stationsData = await getStationsByCityId({ cityId });
      setStations(stationsData);
    } catch (err) {
      setError("Failed to fetch nearby bike stations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchNearbyStations(selectedCity.id);
    }
  }, [selectedCity]);

  return (
    <BikeContext.Provider
      value={{
        stations,
        cities,
        loading,
        error,
        selectedCity,
        setSelectedCity,
        fetchNearbyStations,
        fetchCities,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
}

export function useBike() {
  const context = useContext(BikeContext);
  if (context === undefined) {
    throw new Error("useBike must be used within a BikeProvider");
  }
  return context;
}
