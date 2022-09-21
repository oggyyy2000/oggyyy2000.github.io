import React, { useEffect, useState, useContext, useCallback } from "react";
import "../../asset/css/panel.css";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
  Polyline,
} from "react-google-maps";
import { store } from "../../index";
import { Provider, useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import $ from "jquery";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
// data
/*
import { T1 } from "../../util/toado/T1";
import { T2 } from "../../util/toado/T2";
import { T3 } from "../../util/toado/T3";
import { T4 } from "../../util/toado/T4";
import { T5 } from "../../util/toado/T5";
import { T6 } from "../../util/toado/T6";
import { T7 } from "../../util/toado/T7";
import { T8 } from "../../util/toado/T8";
*/
///////////////////////////////////////////
import {
  FaCompass,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
} from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { WeatherContext } from "../main/contexts/WeatherContext";
import * as actions from "../../redux/types";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { ImageTwoTone } from "@material-ui/icons";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const API_KEY = "AIzaSyAxTvKumZ34dP0Qf_veNQoliDMC5GgrblM";

const link =
  "https://maps.googleapis.com/maps/api/js?key=" +
  API_KEY +
  "&v=3.exp&libraries=geometry,drawing,places";

const Map_Item = () => {
  // State
  const [center, setCenter] = useState({ lat: 21, lng: 105 });
  const [zoomsize, setZoomsize] = useState(8);
  const [pathPoint, SetPathPoint] = useState([]);
  const [LinePoint, SetLinePoint] = useState([]);
  const [TD, setTD] = useState({});
  const [showInfoIndex, SetshowInfoIndex] = useState(-1);
  // Redux
  const Redux_cot = useSelector((state) => state.cot);
  const Redux_tuyen = useSelector((state) => state.tuyen);
  const urlvt = `${process.env.REACT_APP_API_URL}getallvitribytuyens?${
    Redux_tuyen ? "&ma_tuyen=" + Redux_tuyen : "&none=0"
  }`;
  const [ListVTT, setListVTT] = useState([]);
  const ModeShowVideo = useSelector((state) => state.modeshowvideo);
  const Typewsdata = useSelector((state) => state.typewsdata);
  const Toado = useSelector((state) => state.wstoado2);
  const dispatch = useDispatch();
  const screen1 = useFullScreenHandle();
  const [stateBtn, setStateBtn] = useState(false);

  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen1) {
        setStateBtn(state);
      }
    },
    [screen1]
  );

  useEffect(() => {
    setTimeout(() => {
      let elm = document.querySelectorAll(
        "#map_container > div > div > div.map > div:nth-child(2) > table > tr > td:nth-child(2) > button"
      )[0];
      if (elm) {
        elm.click();
      }
    }, 50);
  });

  function heightmap() {
    if ($("#map")) {
      setTimeout(function () {
        $("#map").css(
          "height",
          $("#map_and_log").height() - $("#dotbay").height() - 10
        );
      }, 50);
    }
  }

  const showInfo = (a, data) => {
    SetshowInfoIndex(a);
    dispatch({
      type: actions.SHOW_INFO_ERROR,
      data: data,
    });
  };

  useEffect(() => {
    var elm = document.getElementById("titlet-eye");
    if (typeof elm.removeEventListener === "function") {
      return () => {
        elm.removeEventListener("click", heightmap);
      };
    }
    elm.addEventListener("click", heightmap);
    document.getElementById("titlet-eye").addEventListener("click", heightmap);
    return () => {
      document
        .getElementById("titlet-eye")
        .removeEventListener("click", heightmap);
    };
  }, []);

  useEffect(() => {
    async function getDatavtt() {
      try {
        let res = await axios({
          url: urlvt,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          //  console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDatavtt().then((res) => setListVTT(res));
  }, []);

  useEffect(() => {
    async function getDatavtt() {
      try {
        let res = await axios({
          url: urlvt,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          //  console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDatavtt().then((res) => setListVTT(res));
  }, [Redux_tuyen]);

  var index1 = 0;
  var index2 = 0;

  const findobj = (str) => {
    var pluginArrayArg = new Array();
    /// tìm vị trí cột trong array
    if (Redux_cot) {
      if (Redux_cot.length === 2) {
        const Item0 = Redux_cot[0]["toa_do_vi_tri"];
        const Item1 = Redux_cot[1]["toa_do_vi_tri"];
        // tìm vị trí ( thử tự cột )
        index1 = str.findIndex((item) => item.toa_do == Item0);
        index2 = str.findIndex((item) => item.toa_do == Item1);
        /// tìm các cột ở giữa nếu có
        var max = index1 > index2 ? index1 : index2;
        var min = index2 < index1 ? index2 : index1;
        for (var i = min; i <= max; i++) {
          var jsonArg1 = new Object();
          if (str[i]?.toa_do !== "") {
            jsonArg1.cot = str[i]?.ma_vi_tri;
            const lat = parseFloat(str[i]?.toa_do?.split(",")[0]),
              lng = parseFloat(str[i]?.toa_do?.split(",")[1]);
            jsonArg1.x = lat;
            jsonArg1.y = lng;
            pluginArrayArg.push(jsonArg1);
          }
        }
        // loại bỏ underfined nếu có
        var filtered = pluginArrayArg.filter(function (x) {
          return x !== undefined;
        });
        SetLinePoint(filtered);
      } else if (Redux_cot.length === 1) {
        const Item = Redux_cot[0]["toa_do_vi_tri"];
        if (Item !== "") {
          const lat = parseFloat(Item.split(",")[0]),
            lng = parseFloat(Item.split(",")[1]);
          var jsonArg1 = new Object();
          jsonArg1.cot = Redux_cot[0]["cot"];
          jsonArg1.x = lat;
          jsonArg1.y = lng;
          pluginArrayArg.push(jsonArg1);
          // loại bỏ underfined nếu có
          var filtered = pluginArrayArg.filter(function (x) {
            return x !== undefined;
          });
          SetLinePoint(filtered);
        } else {
          SetLinePoint([]);
        }
      }
    }
    //////////////////////////////////////////////
  };

  useEffect(() => {
    calc_center_and_draw(LinePoint);
  }, [LinePoint]);

  const calc_center = (Point) => {
    if (Point && Point.length > 0) {
      var mid = Math.round((Point.length - 1) / 2);
      if (isNaN(Point[parseInt(mid)].x)) {
        setCenter({ lat: 21, lng: 105 });
        setZoomsize(15);
      } else if (Point[parseInt(mid)]) {
        setCenter({
          lat: Point[parseInt(mid)].x,
          lng: Point[parseInt(mid)].y,
        });
        setZoomsize(15);
      }
    }
  };

  const calc_center_and_draw = (Point) => {
    if (Point) {
      // draw polyline
      if (ModeShowVideo !== "Live" || Typewsdata === "IMG") {
        for (var i = 0; i < Point.length; i++) {
          if (!isNaN(parseFloat(Point[i].x))) {
            pathCoordinates.push({
              lat: parseFloat(Point[i].x),
              lng: parseFloat(Point[i].y),
            });
          }
        }
        SetPathPoint(pathCoordinates);
      }
      calc_center(Point);
    }
    ///////////////////////
  };

  useEffect(() => {
    if (ModeShowVideo === "LIVE" && Typewsdata !== "IMG") SetLinePoint([]);
    SetshowInfoIndex(-1);
    if (Toado) {
      setTD(Toado);
      var end = Toado.length - 1;
      if (Toado[parseInt(end)]) {
        setCenter({
          lat: parseFloat(Toado[parseInt(end)].latitude),
          lng: parseFloat(Toado[parseInt(end)].longtitude),
        });
        setZoomsize(15);
      }
    }
  }, [Toado]);

  useEffect(() => {
    findobj(ListVTT);
  }, [Redux_cot]);

  // Function - Onclick
  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
  };

  const zoom = (position) => {
    const cot = position["cot"],
      lat = parseFloat(position["x"]),
      lng = parseFloat(position["y"]);
    setCenter({ lat: lat, lng: lng });
    setZoomsize(15);
  };

  const zoom2 = (cot, lat, lng) => {
    setCenter({ lat: lat, lng: lng });
    setZoomsize(25);
  };
  let pathCoordinates = [];

  const rendermap1 = () => {
    return (
      <>
        {LinePoint
          ? LinePoint.map((item, index) => {
              let iconMarker = new window.google.maps.MarkerImage(
                "https://lh3.googleusercontent.com/RXM0n51Ci_TZkl4SZ7-WrQEAMziRVfttr8ALWeVdI_2pZig0plSwt5IH8BtIaifKACKjXBiPNSNjVjhFfJwY6AIsQzh90hXWmKBUB3p91Ux-E0HMMVcbQg8qwRLMN_JArK0HNVzh7JcAvRgCyFcwqocr21dRpGeSdTorEISfrcBB6Ruskc_IwxSKY8JjoXqGVF9ueAGPGAC-E5RH-uQAPVfB5PMWx9mpLjI5lNBAAq8B4ddwC1mhriyfhLHSsYbNjwUHDFxmX1pkv3DYEw3hvizv0Ask0Yixu2UpyF2_YTzFx-2-IdGG0b7tMRVj0wjqTCMzz8Tpu8WAJc5gpoGVj08QYt-2TYJff6X1H9_XtAZEozRKgVDvGcdpsgSSS9JuBvipccylQIjlyJkA4fnf1itOGY1WUkzaPOz8m_hx_GWBx5s9dRkSiNu08VKtoPuhsAlhwDwV_RdfUKVr006vtuuOgZKOwzOjXlXhPd8xrwHwYW9ZcglTZdA3WHHQQUyxsU3cYLL5W02pKBUl9J8Znx8iSTLmPuIwjFIqx_IeEMt6BthHHaUVVnnXcqpeYrJYIiW5GiD4aT8_zjMzkyUCefuH6_ranu5UYJX079twCku580goJy7z0AzFdcpb2PSk9OmHkU82ADQVJqGuiScDdcNjbfUiBF7DOpdskl53E3GZmRzI9eFq8YySRgKK8cHH3TMkwWlU3WBJYsItZlSyZdw=s34-no?",
                null /* size is determined at runtime */,
                null /* origin is 0,0 */,
                null /* anchor is bottom center of the scaled image */,
                new window.google.maps.Size(10, 10)
              );
              const cot = item["cot"],
                lat = parseFloat(item["x"]),
                lng = parseFloat(item["y"]);
              if (!isNaN(lat)) {
                return (
                  <Marker
                    key={index}
                    icon={
                      index !== 0 && index !== LinePoint.length - 1
                        ? iconMarker
                        : null
                    }
                    draggable={true}
                    onDragEnd={onMarkerDragEnd}
                    position={{ lat: lat, lng: lng }}
                    onClick={() => {
                      SetshowInfoIndex(index);
                      /* zoom(item)*/
                    }}
                  >
                    {index === 0 ||
                    index === LinePoint.length - 1 ||
                    showInfoIndex === index ? (
                      <InfoWindow onCloseClick={() => SetshowInfoIndex(-1)}>
                        <Box style={{ color: "black", width: 140 }}>
                          <b>Cột: {cot}</b>
                          <p>
                            Tọa độ: {lat} , {lng}
                          </p>
                        </Box>
                      </InfoWindow>
                    ) : (
                      ""
                    )}
                  </Marker>
                );
              }
            })
          : ""}
        {pathPoint && (
          <Polyline
            path={pathPoint}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 0.75,
              strokeWeight: 2,
            }}
          />
        )}
      </>
    );
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => {
      let iconMarker = new window.google.maps.MarkerImage(
        "https://lh3.googleusercontent.com/pw/AM-JKLUs1eX_HbHDXCbEZIr6Zb1lRJPWjhiJk8pFAn82uOebQq77t0n41BzrLrJ8y79pxoYApFx6FznLaHG_fim_tqElBo4gmxIXatokQGC1Y7z3sC00uSoaU6qekd0bkhKGsa30h8Ze9pKx016_4v07kEtg=w1179-h943-no",
        null /* size is determined at runtime */,
        null /* origin is 0,0 */,
        null /* anchor is bottom center of the scaled image */,
        new window.google.maps.Size(32, 32)
      );
      return (
        <GoogleMap
          defaultZoom={zoomsize}
          defaultCenter={{
            lat: parseFloat(center.lat),
            lng: parseFloat(center.lng),
          }}
          options={{
            fullscreenControl: false,
          }}
        >
          {ModeShowVideo !== "Live" ? rendermap1() : ""}
          {TD
            ? TD.map((item, index) => {
                const cot = "",
                  lat = parseFloat(item.latitude),
                  lng = parseFloat(item.longtitude);
                return (
                  <Marker
                    key={index}
                    icon={iconMarker}
                    draggable={true}
                    onDragEnd={onMarkerDragEnd}
                    position={{ lat: lat, lng: lng }}
                    onClick={() => {
                      showInfo(index, item);
                      /* zoom2(cot, lat, lng)*/
                    }}
                    animation={1}
                  >
                    {showInfoIndex === index && (
                      <InfoWindow onCloseClick={() => SetshowInfoIndex(-1)}>
                        <Box
                          style={{
                            color: "black",
                            width: 100,
                            wordWrap: "break-word",
                          }}
                        >
                          {/*<b>Cột: {cot}</b>*/}
                          <p>
                            Tọa độ: {lat} , {lng}
                          </p>
                          Bất thường:
                          <br />
                          {item.error.map((value, idx) => {
                            return item.error.length < idx ? (
                              <b key={idx} style={{ color: "red" }}>
                                {value.error_label},{" "}
                              </b>
                            ) : (
                              <b key={idx} style={{ color: "red" }}>
                                {value.error_label}{" "}
                              </b>
                            );
                          })}
                        </Box>
                      </InfoWindow>
                    )}
                  </Marker>
                );
              })
            : ""}
        </GoogleMap>
      );
    })
  );

  return (
    <Box
      id={"map_container"}
      style={{ height: "100%", width: "100%", transform: "translateY(0)" }}
    >
      <Provider store={store}>
        <FullScreen className="scr1" handle={screen1} onChange={reportChange}>
          <MapWithAMarker
            googleMapURL={link}
            loadingElement={<div className="map" />}
            containerElement={<div className="map" />}
            mapElement={<div className="map" />}
          />
          {!stateBtn ? (
            <button className="btnMap" onClick={screen1.enter}>
              <FullscreenIcon style={{ width: 35, height: 35 }} />
            </button>
          ) : (
            <button className="btnMap" onClick={screen1.exit}>
              <FullscreenExitIcon style={{ width: 35, height: 35 }} />
            </button>
          )}
        </FullScreen>
      </Provider>
    </Box>
  );
};

export default Map_Item;
