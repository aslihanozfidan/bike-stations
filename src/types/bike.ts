export interface BikeStation {
  id: string;
  name: string;
  free_bikes: number;
  empty_slots: number;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface City {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

export interface GroupedCities {
  [country: string]: City[];
}

export interface NetworkResponse {
  network: {
    stations: BikeStation[];
  };
}

export interface BikeContextType {
  stations: NetworkResponse | null;
  cities: GroupedCities;
  loading: boolean;
  error: string | null;
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
  fetchNearbyStations: (cityId: string) => Promise<void>;
  fetchCities: () => Promise<void>;
} 