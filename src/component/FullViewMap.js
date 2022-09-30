import React, { useState, useEffect, useContext } from "react";
//import MainVideoT from "./home/Video";
import VideoWS from "./nhapdulieu/VideoWS";
import Map_Item from "./generalObject/Map_Item";
import * as actions from "../redux/types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "@material-ui/core";
import { WSContext } from "./main/contexts/WSContext";
import Log from "./generalObject/Log";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCompass,
  FaTemperatureHigh,
  /* FaTemperatureLow,*/
  FaWind,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { TiWeatherCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { WeatherContext } from "./main/contexts/WeatherContext";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import AlertTitle from "@material-ui/lab/AlertTitle";
import ListImg from "./generalObject/ListImg";

export default function FullViewMap() {
  //-------------------------------------------------
  // const ws = props.ws;

  const { disconnect } = useContext(WSContext);

  const dispatch = useDispatch();
  const Toado = useSelector((state) => state.wstoado2);
  const [Now, setNow] = useState(null);
  const { weather } = useContext(WeatherContext);
  const [open, setOpen] = useState(false);
  const [ShowAlert, SetShowAlert] = useState(null);
  const TuyenGS = useSelector((state) => state.tuyengs);
  const Typewsdata = useSelector((state) => state.typewsdata);

  const change = () => {
    setOpen(false);
    dispatch({
      type: actions.MODE_SHOW_VIDEO,
      data: "Video",
    });
    dispatch({
      type: actions.TYPE_WS_DATA,
      data: null,
    });
    disconnect();
    dispatch({
      type: actions.SHOW_INFO_ERROR,
      data: null,
    });
    dispatch({
      type: actions.WS_TOA_DO,
      data: [],
    });
    dispatch({
      type: actions.WS_TOA_DO2,
      data: [],
    });
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function RunImg(start) {
    if (Toado)
      for (let i = start; i < Toado.length; i++) {
        setNow(Toado[i]);
        await sleep(1000 / 3);
      }
  }

  useEffect(() => {
    setOpen(false);
    RunImg(0);
    for (let i = Toado.length - 1; i >= 0; i--) {
      if (Toado[i].error && Toado[i].error.length !== 0) {
        SetShowAlert(Toado[i]);
        setOpen(true);
        return;
      }
    }
  }, [Toado]);

  const temperatureConverter = (valNum) => {
    // kelvin to c
    valNum = parseFloat(valNum);
    return parseFloat(valNum - 273).toFixed(2);
  };

  const windspeedConverter = (val) => {
    return parseFloat(val * 3.6).toFixed(2);
  };

  const setdataerror = (data) => {
    dispatch({
      type: actions.SHOW_INFO_ERROR,
      data: data,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={
          Typewsdata !== "IMG"
            ? {
                height: "100vh",
                width: "30vw",
                background: "white",
              }
            : { height: "100vh", width: "50vw", background: "white" }
        }
      >
        <div
          style={
            Typewsdata !== "IMG"
              ? {
                  width: "30vw",
                  height: "45vh",
                  background: "black",
                  overflow: "auto",
                }
              : {
                  width: "50vw",
                  height: "45vh",
                  background: "black",
                  overflow: "auto",
                }
          }
        >
          <VideoWS />
        </div>
        {Typewsdata !== "IMG" ? <Log /> : <ListImg />}
      </div>
      <div
        style={
          Typewsdata !== "IMG"
            ? {
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "70vw",
                background: "grey",
              }
            : {
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "50vw",
                background: "grey",
              }
        }
      >
        <Collapse in={open} onClick={() => setdataerror(ShowAlert)}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
                component={"C"}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            variant="outlined"
            severity="error"
            style={{
              width: 400,
              position: "fixed",
              right: 60,
              top: 5,
              zIndex: 9999,
              background: "white",
              borderWidth: 5,
            }}
          >
            {ShowAlert ? (
              <Box
                style={{
                  color: "black",
                  width: 300,
                  wordWrap: "break-word",
                  fontFamily: "-webkit-body",
                }}
              >
                <AlertTitle
                  style={{ color: "red", fontFamily: "-webkit-body" }}
                >
                  Bất thường:
                </AlertTitle>
                {ShowAlert.error.map((value, idx) => {
                  return ShowAlert.error.length < idx ? (
                    <b key={idx} style={{ color: "red" }}>
                      {value.error_label},{" "}
                    </b>
                  ) : (
                    <b key={idx} style={{ color: "red" }}>
                      {value.error_label}{" "}
                    </b>
                  );
                })}{" "}
              </Box>
            ) : (
              ""
            )}
          </Alert>
        </Collapse>
        <Map_Item />
        <div
          style={{ position: "fixed", top: 0 /*left: "30vw"*/ }}
          title="Trở lại"
        >
          <Button
            onClick={() => change()}
            component={"C"}
            style={{
              background: "#f1f1f1",
              borderRadius: "0px 5px 5px 0px",
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            <ArrowBackIcon style={{ fill: "#1976d2" }} />
          </Button>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 40,
            //left: "30vw",
            background: "white",
            padding: 10,
            borderRadius: "0px 5px 5px 0px",
            background: "#3c4043c7",
            color: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            fontFamily: "-webkit-body",
          }}
        >
          <FiMapPin />{" "}
          <span>
            Tuyến giám sát: <b>{TuyenGS && TuyenGS}</b>
          </span>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            //left: "30vw",
            background: "white",
            padding: 10,
            borderRadius: "0px 5px 5px 0px",
            background: "#3c4043c7",
            color: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            fontFamily: "-webkit-body",
          }}
        >
          <FaCompass />{" "}
          <span>
            Vị trí hiện tại:{" "}
            <b>
              {Now ? Now.latitude : 0}, {Now ? Now.longtitude : 0}
            </b>
          </span>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 60,
            background: "#3c4043c7",
            padding: 10,
            borderRadius: 15,
            color: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            fontFamily: "-webkit-body",
          }}
        >
          <WiHumidity style={{ width: 25 }} />{" "}
          <span>Độ ẩm: {weather.main ? weather.main.humidity : 0} %</span>{" "}
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
            Nhiệt độ:{" "}
            {weather.main ? temperatureConverter(weather.main.temp) : 0} ℃
          </span>{" "}
          <br />
          <FaWind style={{ width: 25 }} />{" "}
          <span>
            Gió: {weather.wind ? windspeedConverter(weather.wind.speed) : 0}{" "}
            km/h
          </span>
        </div>
      </div>
    </div>
  );
}
