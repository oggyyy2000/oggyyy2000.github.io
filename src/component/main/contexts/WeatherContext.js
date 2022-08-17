import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [weather, setweather] = useState({});

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted) {
        async function getData() {
          try {
            let res = await axios({
              url: "https://api.openweathermap.org/data/2.5/weather?q=hanoi&lang=vi&appid=9394afa904bfc95764ca3adc61d47e53",
              method: "get",
              timeout: 8000,
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.status === 200) {
              // console.log(res.status);
            }
            return res.data;
          } catch (err) {
            console.error(err);
          }
        }

        getData().then((res) => {
          if (res) {
            setweather(res);
          }
        });
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, []);
  // Context data
  const weatherContextData = { weather };

  // Return provider
  return (
    <WeatherContext.Provider value={weatherContextData}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
