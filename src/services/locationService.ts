import axios from "axios";

export const getLocation = (): Promise<{
  latitude: number | null;
  longitude: number | null;
}> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject({
            latitude: null,
            longitude: null,
          });
        }
      );
    } else {
      console.warn("Geolocation warn: the browser does not support.");
      reject({
        latitude: null,
        longitude: null,
      });
    }
  });
};

export const getCityName = async (): Promise<string> => {
  const { latitude, longitude } = await getLocation();
  return await axios
    .get(
      ` https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          "User-Agent": "bike-stations-app",
        },
      }
    )
    .then((res) => {
      return res.data?.address.province;
    })
    .catch((err) => {
      console.error("Error fetching ip:", err);
    });
};
