import axios from "axios";

interface GetLocationProps {
  ip: string;
}

export const getCity = ({ ip }: GetLocationProps): Promise<string> => {
  return axios
    .get(
      `http://api.ipstack.com/${ip}?access_key=${
        import.meta.env.VITE_IP_STACK_API_KEY
      }`
    )
    .then((res) => {
      return res.data?.city;
    })
    .catch((err) => {
      console.error("Error fetching location:", err);
      return "Istanbul";
    });
};
