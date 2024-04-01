import axios from "axios";

const API_KEY = "8e5f0bc8aa1b424eb9c151737240104";

async function getLocation() {
  const storedLocation = localStorage.getItem("location");
  if (storedLocation) {
    return JSON.parse(storedLocation);
  } else {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const coordinates = { latitude, longitude };
          localStorage.setItem("location", JSON.stringify(coordinates));
          resolve(coordinates);
          return coordinates
        },
        function (error) {
          console.error("Error getting geolocation:", error);
          reject({ status: false, error });
        }
      );
    });
  }
}

export const GetWhetherData = async () => {
  try {
    const location = await getLocation();
    if (location) {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.latitude},${location.longitude}&aqi=no`
      );
      // Extracting the condition text
      const conditionText = data.current.condition.text;

      // Check if the condition text contains 'Sunny' or 'Clear' to determine if it's sunny
      const isSunny =
        conditionText.toLowerCase().includes("sunny") ||
        conditionText.toLowerCase().includes("clear");

      // Check if the condition text contains 'Cloudy' to determine if it's cloudy
      const isCloudy = conditionText.toLowerCase().includes("cloudy");

      if (isSunny) {
        return { msg: "whether is Sunny", data: conditionText ,img:data?.current.condition.icon };
      }
      if (isCloudy) {
        return { msg: "whether is Cloudy", data: conditionText ,img:data?.current.condition.icon };
      }
      return { success: true, data: conditionText ,img:data?.current.condition.icon };
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return ;
  }
};
