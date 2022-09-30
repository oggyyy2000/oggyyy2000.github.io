import React, { useEffect, useState, useContext, useCallback } from "react";
import "./../asset/css/panel.css";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
  Polyline,
} from "react-google-maps";
import { store } from "./../index";
import { Provider, useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import $ from "jquery";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import axios from "axios";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import WarningOutlinedIcon from "@material-ui/icons/WarningOutlined";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Loading from "./generalObject/Loading";
import { optionltb } from "../util/optionloaitb";
import { ChangerUrl } from "../util/ChangeUrl";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    borderRadius: 0,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    objectFit: "cover",
    width: "200px",
    height: 100,
    marginTop: "20px",
    marginLeft: "10px",
  },
  pagination: {
    alignItems: "center",
    justify: "center",
    "& > *": {
      justifyContent: "center",
      display: "flex",
    },
  },
  leftpanel: {
    width: "40%",
    height: "100px",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 100,
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "10px",
  },
}));

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const link =
  "https://maps.googleapis.com/maps/api/js?key=" +
  API_KEY +
  "&v=3.exp&libraries=geometry,drawing,places";

const ThietBi2 = () => {
  // State
  const [center, setCenter] = useState({ lat: 21.0286436, lng: 105.855725 });
  const [zoomsize, setZoomsize] = useState(15);
  const [pathPoint, SetPathPoint] = useState([]);
  const [LinePoint, SetLinePoint] = useState([]);
  const [showInfoIndex, SetshowInfoIndex] = useState(-1);
  const screen1 = useFullScreenHandle();
  const [stateBtn, setStateBtn] = useState(false);
  ///
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [fetchedData, setFetchedData] = useState([]);
  const [ListTuyen, setListTuyen] = useState([]);
  const [Tuyen, setTuyen] = useState(null);
  const [Loai, setLoai] = useState(null);
  const [ListVTT, setListVTT] = useState([]);
  const [VTT, setVTT] = useState(null);
  const [DataDetail, setDataDetail] = useState({});
  const urltb = `${
    process.env.REACT_APP_API_URL
  }getallthietbituyens?page=${page}${Tuyen ? "&ma_tuyen=" + Tuyen : "&none=0"}${
    Loai ? "&loai_thiet_bi=" + Loai : "&none=0"
  }${VTT ? "&ma_vi_tri=" + VTT : "&none=0"}`;
  const urlt = process.env.REACT_APP_API_URL + "getalltuyens";
  const urlvt = `${process.env.REACT_APP_API_URL}getallvitribytuyens?${
    Tuyen ? "&ma_tuyen=" + Tuyen : "&none=0"
  }`;

  ///

  useEffect(() => {
    async function getDatatb() {
      try {
        let res = await axios({
          url: urltb,
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

    getDatatb().then((res) => {
      setFetchedData(res);
      if (res && res?.data?.length != 0) setDataDetail(res?.data[0]);
    });
  }, []);

  useEffect(() => {
    async function getDatatb() {
      try {
        let res = await axios({
          url: urltb,
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

    getDatatb().then((res) => {
      setFetchedData(res);
      if (res && res?.data?.length != 0) setDataDetail(res?.data[0]);
    });
  }, [page, Tuyen, Loai, VTT]);

  useEffect(() => {
    async function getDatatuyen() {
      try {
        let res = await axios({
          url: urlt,
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

    getDatatuyen().then((res) => {
      setListTuyen(res);
      //setTuyen(res[0].ma_tuyen);
    });
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

    getDatavtt().then((res) => {
      setListVTT(res);
      let ToaDo = res[0]?.toa_do?.split(",");
      setCenter({ lat: ToaDo[0], lng: ToaDo[1] });
    });
  }, [Tuyen]);

  const onChange = (event, setFunction) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    setFunction(value);
  };

  const onChangeSelectTuyen = (event) => {
    onChange(event, setTuyen);
    setPage(1);
    setListVTT([]);
    setVTT(null);
  };

  const onChangeSelectLTB = (event) => {
    onChange(event, setLoai);
    setPage(1);
  };

  const onChangeSelectVTT = (event) => {
    onChange(event, setVTT);
    setPage(1);
  };

  const Show = (data) => {
    setDataDetail(data);
  };

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  ///

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
        "#map_container_tb > div > div > div.map > div:nth-child(2) > table > tr > td:nth-child(2) > button"
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

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
  };

  let pathCoordinates = [];

  const calc_center = (Point) => {
    if (Point && Point.length > 0) {
      var mid = Math.round((Point.length - 1) / 2);
      let ToaDo = Point[mid]?.toa_do?.split(",");
      if (isNaN(ToaDo[0])) {
        setCenter({ lat: 21, lng: 105 });
        setZoomsize(15);
      } else if (ToaDo[0]) {
        setCenter({
          lat: ToaDo[0],
          lng: ToaDo[1],
        });
        setZoomsize(15);
      }
    }
  };

  const calc_center_and_draw = (Point) => {
    if (Point) {
      for (var i = 0; i < Point.length; i++) {
        let ToaDo = Point[i]?.toa_do?.split(",");
        if (!isNaN(parseFloat(ToaDo[0])) && !isNaN(parseFloat(ToaDo[1]))) {
          pathCoordinates.push({
            lat: parseFloat(ToaDo[0]),
            lng: parseFloat(ToaDo[1]),
          });
        }
      }
      SetPathPoint(pathCoordinates);

      calc_center(Point);
    }
    ///////////////////////
  };

  useEffect(() => {
    calc_center_and_draw(ListVTT);
  }, [ListVTT]);

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
          {ListVTT
            ? ListVTT.map((item, index) => {
                let iconMarker = new window.google.maps.MarkerImage(
                  "https://lh3.googleusercontent.com/RXM0n51Ci_TZkl4SZ7-WrQEAMziRVfttr8ALWeVdI_2pZig0plSwt5IH8BtIaifKACKjXBiPNSNjVjhFfJwY6AIsQzh90hXWmKBUB3p91Ux-E0HMMVcbQg8qwRLMN_JArK0HNVzh7JcAvRgCyFcwqocr21dRpGeSdTorEISfrcBB6Ruskc_IwxSKY8JjoXqGVF9ueAGPGAC-E5RH-uQAPVfB5PMWx9mpLjI5lNBAAq8B4ddwC1mhriyfhLHSsYbNjwUHDFxmX1pkv3DYEw3hvizv0Ask0Yixu2UpyF2_YTzFx-2-IdGG0b7tMRVj0wjqTCMzz8Tpu8WAJc5gpoGVj08QYt-2TYJff6X1H9_XtAZEozRKgVDvGcdpsgSSS9JuBvipccylQIjlyJkA4fnf1itOGY1WUkzaPOz8m_hx_GWBx5s9dRkSiNu08VKtoPuhsAlhwDwV_RdfUKVr006vtuuOgZKOwzOjXlXhPd8xrwHwYW9ZcglTZdA3WHHQQUyxsU3cYLL5W02pKBUl9J8Znx8iSTLmPuIwjFIqx_IeEMt6BthHHaUVVnnXcqpeYrJYIiW5GiD4aT8_zjMzkyUCefuH6_ranu5UYJX079twCku580goJy7z0AzFdcpb2PSk9OmHkU82ADQVJqGuiScDdcNjbfUiBF7DOpdskl53E3GZmRzI9eFq8YySRgKK8cHH3TMkwWlU3WBJYsItZlSyZdw=s34-no?",
                  null /* size is determined at runtime */,
                  null /* origin is 0,0 */,
                  null /* anchor is bottom center of the scaled image */,
                  new window.google.maps.Size(10, 10)
                );
                console.log(item);
                let ToaDo = item?.toa_do?.split(",");
                const lat = parseFloat(ToaDo[0]),
                  lng = parseFloat(ToaDo[1]);
                if (!isNaN(lat)) {
                  return (
                    <Marker
                      key={index}
                      /*icon={
                        index !== 0 && index !== LinePoint.length - 1
                          ? iconMarker
                          : null
                      }*/
                      draggable={true}
                      onDragEnd={onMarkerDragEnd}
                      position={{ lat: lat, lng: lng }}
                      onClick={() => {
                        //SetshowInfoIndex(index);
                      }}
                    >
                      {/*index === 0 ||
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
                      )*/}
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
        </GoogleMap>
      );
    })
  );

  return (
    <Box
      id={"map_container_tb"}
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
          <div className={classes.leftpanel}>
            <FormControl
              variant={"outlined"}
              style={{
                alignSelf: "center",
                minwidth: "30%",
                width: "30%",
                //marginLeft: 10,
                marginLeft: 18,
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Chọn Tuyến
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Chọn Tuyến"}
                value={Tuyen}
                style={{ height: 40 }}
                onChange={onChangeSelectTuyen}
              >
                <MenuItem value={null}>Trống</MenuItem>
                {ListTuyen ? (
                  ListTuyen.map((item, index) => (
                    <MenuItem key={index} value={item.ma_tuyen}>
                      {/*item.tt_tuyen*/}
                      {item.ten_tuyen}
                    </MenuItem>
                  ))
                ) : (
                  <Loading />
                )}
              </Select>
            </FormControl>
            <FormControl
              variant={"outlined"}
              style={{
                alignSelf: "center",
                minwidth: "30%",
                width: "30%",
                marginLeft: 10,
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Chọn Loại Sản Phẩm
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Chọn Loại Sản Phẩm"}
                value={Loai}
                style={{ height: 40 }}
                onChange={onChangeSelectLTB}
              >
                <MenuItem value={null}>Trống</MenuItem>
                {optionltb
                  ? optionltb.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.text}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
            <FormControl
              variant={"outlined"}
              style={{
                alignSelf: "center",
                minwidth: "30%",
                width: "30%",
                marginLeft: 10,
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Chọn Vị Trí
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Chọn Tuyến"}
                value={VTT}
                style={{ height: 40 }}
                onChange={onChangeSelectVTT}
              >
                <MenuItem value={null}>Trống</MenuItem>
                {ListVTT ? (
                  ListVTT.map((item, index) => (
                    <MenuItem key={index} value={item.ma_vi_tri}>
                      {item.ten_vi_tri}
                    </MenuItem>
                  ))
                ) : (
                  <Loading />
                )}
              </Select>
            </FormControl>
            <div style={{ marginTop: 10 }}>
              <Pagination
                id="Pagination"
                className={classes.pagination}
                count={fetchedData?.last_page || 0}
                size="large"
                page={page}
                color="primary"
                shape="rounded"
                onChange={handleChangePage}
              />
            </div>
          </div>
        </FullScreen>
      </Provider>
    </Box>
  );
};

export default ThietBi2;
