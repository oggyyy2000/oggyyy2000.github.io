import React, { useContext } from "react";
import Map_Item from "../generalObject/Map_Item";
import {
  /* FaCompass,*/
  FaTemperatureHigh,
  /*FaTemperatureLow,*/
  FaWind,
} from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { WeatherContext } from "./contexts/WeatherContext";

export default function Map() {
  const { weather } = useContext(WeatherContext);
  const temperatureConverter = (valNum) => {
    // kelvin to c
    valNum = parseFloat(valNum);
    return parseFloat(valNum - 273).toFixed(2);
  };

  const windspeedConverter = (val) => {
    return parseFloat(val * 3.6).toFixed(2);
  };

  return (
    <>
      <Map_Item />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          background: "#3c4043c7",
          padding: 10,
          borderRadius: 15,
          color: "white",
          fontSize: "15px",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <WiHumidity style={{ width: 25 }} />{" "}
        <span>Độ ẩm: {weather.main ? weather.main.humidity : 0} %</span>
        <br />
        {weather.weather ? (
          <img
            id="wicon"
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            style={{ width: 25, objectFit: "cover" }}
            alt=""
          />
        ) : (
          <TiWeatherCloudy />
        )}{" "}
        <span>
          Thời tiết: {weather.weather ? weather.weather[0].description : ""}
        </span>
        <br />
        <FaTemperatureHigh style={{ width: 25 }} />{" "}
        <span>
          Nhiệt độ: {weather.main ? temperatureConverter(weather.main.temp) : 0}{" "}
          ℃
        </span>
        <br />
        <FaWind style={{ width: 25 }} />{" "}
        <span>
          Gió: {weather.wind ? windspeedConverter(weather.wind.speed) : 0} km/h
        </span>
      </div>
    </>
  );
}
