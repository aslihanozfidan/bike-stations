export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  city: string;
  status: string;
  time: string;
}

export interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
} 