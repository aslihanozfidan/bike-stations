import axios from "axios";

interface GetWeatherProps {
  city: string;
}

export const getWeather = ({ city }: GetWeatherProps): any => {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching weather:", err);
    });
};
