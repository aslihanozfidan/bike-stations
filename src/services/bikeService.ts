import axios from "axios";
import { City, GroupedCities } from "../types/bike.js";

interface GetStationsProps {
  cityId: string;
}

export const getCities = async (): Promise<GroupedCities> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BIKE_API_URL}/networks`
    );
    
    const cities = response.data.networks.map((network: any) => ({
      id: network.id,
      name: network.name,
      location: {
        city: network.location.city,
        country: network.location.country,
        latitude: network.location.latitude,
        longitude: network.location.longitude,
      },
    }));

    const grouped = cities.reduce((acc: GroupedCities, city: City) => {
      const country = city.location.country;
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(city);
      return acc;
    }, {});

    const sortedEntries = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

    return Object.fromEntries(sortedEntries) as GroupedCities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const getStationsByCityId = ({ cityId }: GetStationsProps) => {
  return axios
    .get(`${import.meta.env.VITE_BIKE_API_URL}/networks/${cityId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`${err} getStations Error`);
    });
};
