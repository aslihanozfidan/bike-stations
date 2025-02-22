import axios from "axios";

export const getIp = async (): Promise<string> => {
  return await axios
    .get("https://api.ipify.org/?format=json")
    .then((res) => {
      return res.data?.ip;
    })
    .catch((err) => {
      console.error("Error fetching ip:", err);
    });
};
