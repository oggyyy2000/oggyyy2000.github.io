import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  ThemeProvider,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import axios from "axios";
import GlobalStyles from "../../asset/css/GlobalStyles";
import theme from "../../theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../../mixins/chartjs";
import Bieudothongke from "./bieudothongke";
import Loading from "./Loading";
import { MucDoLoi } from "./List";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import datathietbiloi from "./datathietbiloi_T1";

function DataFetching() {
  const [Filter, setFilter] = useState([]);
  const [ListTuyen, setListTuyen] = useState([]);
  const [ListThietbi, setListThietBi] = useState({});
  const [Tuyen, setTuyen] = useState("");
  const dispatch = useDispatch();
  const anhthietbiloi = useSelector((state) => state.anhthietbiloi);
  const idtuyen = useSelector((state) => state.idtuyen);
  const idanh = useSelector((state) => state.idanh);
  const idthietbi = useSelector((state) => state.idthietbi);
  const [dEtail, setdEtail] = useState({});

  const handleChangetb = (event) => {
    setListThietBi(event.target.value);
  };

  const handleChangeTuyen = (event) => {
    setTuyen(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://10.0.17.28:8000/tuyens/`)
      .then((res) => {
        setListTuyen(res.data.slice(0, 3));
        datathietbiloi["ALL"] = {};

        console.log(datathietbiloi);
        let keys = Object.keys(datathietbiloi);
        for (let i = 0; i < keys.length; i++) {
          datathietbiloi["ALL"] = {
            ...datathietbiloi["ALL"],
            ...datathietbiloi[keys[i]],
          };
        }
        console.log(datathietbiloi);
        dispatch({ type: actions.anhthietbiloi, data: datathietbiloi });
        // dispatch({
        //   type: actions.idtuyen,
        //   data: Object.keys(datathietbiloi)[0],
        // });
        if (Tuyen === "")
          dispatch({
            type: actions.idtuyen,
            data: "ALL",
          });
        else {
          dispatch({
            type: actions.idtuyen,
            data: res?.data[0]?.ma_tuyen,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Tuyen &&
      axios
        .get(`http://10.0.17.28:8000/thietbituyensfilter/tuyen/` + `${Tuyen}/`)
        .then((res) => {
          console.log(res.data);
          setFilter(res.data);
          dispatch({ type: actions.anhthietbiloi, data: datathietbiloi });
          /*dispatch({
          type: actions.idtuyen,
          data: [Tuyen],
        });*/
          dispatch({
            type: actions.idtuyen,
            data: Tuyen,
          });
        })
        .catch((err) => {
          console.log(err);
        });
  }, [Tuyen]);

  useEffect(() => {
    let data = anhthietbiloi[idtuyen]?.[idthietbi]?.[idanh.loai]?.find(
      (x) => x.ma_thiet_bi === idanh.mathietbi
    );
    setdEtail(data);
  }, [idanh]);

  function renderPic() {
    let data = dEtail;
    return (
      <>
        <div
          title={""}
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "7%",
            border: "1px solid black",
            borderRadius: "13px",
            overflow: "hidden",
            minWidth: "50%",
          }}
        >
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={100}
            defaultPositionY={200}
          >
            <TransformComponent>
              <img src={data?.anhgoc} height={"100%"} width={"100%"} />
            </TransformComponent>
          </TransformWrapper>
        </div>
        {/* <div
          title={""}
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "7%",
            border: "1px solid black",
            borderRadius: "13px",
            overflow: "hidden",
            minWidth: "50%",
          }}
        >
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={100}
            defaultPositionY={200}
          >
            <TransformComponent>
              <img src={data?.anhloi} height={"100%"} width={"100%"} />
            </TransformComponent>
          </TransformWrapper>
        </div> */}
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Container maxWidth={false}>
          <Box
            style={{
              backgroundColor: "background.default",
              height: "100%",
              py: 3,
              paddingTop: 20,
            }}
          >
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={7}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl
                      variant="outlined"
                      style={{
                        alignSelf: "center",
                        minWidth: "30%",
                        marginLeft: 10,
                      }}
                    >
                      <InputLabel id="label-tuyen">Tuyến</InputLabel>
                      <Select
                        labelId="label-tuyen"
                        id="labelt"
                        value={Tuyen}
                        onChange={handleChangeTuyen}
                        label="T"
                        defaultValue={""}
                      >
                        {ListTuyen ? (
                          ListTuyen.map((item, index) => (
                            <MenuItem key={index} value={item.ma_tuyen}>
                              {item.ma_tuyen}
                            </MenuItem>
                          ))
                        ) : (
                          <Loading />
                        )}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Bieudothongke />
                  </Grid>

                  <Grid item xs={12}>
                    <MucDoLoi />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={5}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      overflow: "auto",
                      maxWidth: "100%",
                      marginTop: "13%",
                      maxHeight: "414px",
                      variant: "outlined",
                    }}
                  >
                    <Card variant="outlined">
                      <ul style={{ listStyleType: "none" }}>
                        <li>
                          <strong>Mã thiết bị: </strong>
                          {dEtail?.ma_thiet_bi}
                        </li>

                        <li>
                          <strong>Loại thiết bị: </strong>
                          {dEtail?.loai_thiet_bi}
                        </li>
                        <li>
                          <strong>Tên tuyến: </strong>
                          {dEtail?.ten_tuyen}
                        </li>
                        <li>
                          <strong>Tọa độ: </strong>
                          {dEtail?.toa_do}
                        </li>
                        <li>
                          <strong>Ngày vận hành: </strong>
                          {dEtail?.ngay_van_hanh}
                        </li>
                        <li>
                          <strong>Ngày sửa đổi: </strong>
                          {dEtail?.ngay_sua_doi}
                        </li>
                        <li>
                          <strong>Ngày lắp đặt: </strong>
                          {dEtail?.ngay_lap_dat}
                        </li>
                        <li>
                          <strong>Mức độ ổn định: </strong>
                          {dEtail?.mucdoondinh}
                        </li>
                      </ul>
                    </Card>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: "4%" }}>
                    <Card variant="outlined" style={{ height: "100%" }}>
                      <CardContent>
                        <>
                          <CardHeader title={"Ảnh thiết bị lỗi"} />
                          <div
                            style={{
                              display: "flex",
                              overflow: "auto",
                              marginBottom: "2%",
                              marginTop: "2%",
                              minHeight: "60%",
                              minWidth: "60%",
                            }}
                          >
                            <a>
                              {idanh.loai === "cdtt"
                                ? "Cach dien thuy tinh:"
                                : idanh.loai === "cdslc"
                                ? "Cach dien silicon:"
                                : "Duong day:"}
                            </a>
                            {Object.keys(idanh) != 0 && renderPic()}
                          </div>
                        </>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default DataFetching;
