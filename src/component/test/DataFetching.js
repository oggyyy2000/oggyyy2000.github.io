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

import anhcdttgoc from "./icon/Data_test_vobat_divat/DJI_0627_379.jpg";
import anhcdttloi1 from "./icon/Data_test_vobat_divat/DJI_0627_443.jpg";
import anhcdttloi2 from "./icon/Data_test_vobat_divat/DJI_0627_385.jpg";
import anhcdttloi3 from "./icon/Data_test_vobat_divat/DJI_0627_382.jpg";

import anhdzgoc from "./icon/Data_test_vobat_divat/DJI_0635_89.jpg";
import anhdzloi1 from "./icon/Data_test_vobat_divat/DJI_0635_88.jpg";
import anhdzloi2 from "./icon/Data_test_vobat_divat/DJI_0635_92.jpg";
import anhdzloi3 from "./icon/Data_test_vobat_divat/DJI_0635_93.jpg";
import { Transform } from "form-data";

function DataFetching() {
  const [Filter, setFilter] = useState([]);
  const [ListTuyen, setListTuyen] = useState([]);
  const [ListThietbi, setListThietBi] = useState({});
  const [Tuyen, setTuyen] = useState({});

  const handleChangetb = (event) => {
    setListThietBi(event.target.value);
  };

  const handleChangeTuyen = (event) => {
    setTuyen(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://10.0.17.28:8000/tuyens/`

        // `http://10.0.17.28:8000/thietbituyensfilter/tuyen_loai/T6&c%C3%A1ch%20%C4%91i%E1%BB%87n%20th%E1%BB%A7y%20tinh/`
      )
      .then((res) => {
        console.log(res);
        setListTuyen(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://10.0.17.28:8000/thietbituyensfilter/tuyen/` + `${Tuyen}/`

        // `http://10.0.17.28:8000/thietbituyensfilter/tuyen_loai/T6&c%C3%A1ch%20%C4%91i%E1%BB%87n%20th%E1%BB%A7y%20tinh/`
      )
      .then((res) => {
        console.log(res.data);
        setFilter(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Tuyen]);

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

                  {/* <Grid item xs={6}>
                    <FormControl
                      variant="outlined"
                      style={{
                        alignSelf: "center",
                        minWidth: "30%",
                        marginLeft: 10,
                      }}
                    >
                      <InputLabel id="label-thiet-bi">Thiết bị</InputLabel>
                      <Select
                        labelId="label-thiet-bi"
                        id="labeltb"
                        value={ListThietbi}
                        onChange={handleChangetb}
                        label="Tb"
                        defaultValue={""}
                      >
                        <MenuItem value="cột%20thép%20hình">
                          <em>cột thép hình</em>
                        </MenuItem>
                        <MenuItem value="cột%20đơn%20thân">
                          <em>cột đơn thân</em>
                        </MenuItem>
                        <MenuItem value="cách%20điện%20thủy%20tinh">
                          <em>cách điện thủy tinh</em>
                        </MenuItem>
                        <MenuItem value="cách%20điện%20silicon">
                          <em>cách điện silicon</em>
                        </MenuItem>
                        <MenuItem value="tạ%20chống%20rung">
                          <em>tạ chống rung</em>
                        </MenuItem>
                        <MenuItem value="dây%20điện">
                          <em>dây điện</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}

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
                      marginTop: "15%",
                      maxHeight: "414px",
                      variant: "outlined",
                    }}
                  >
                    {Filter.map((post) => (
                      <ul style={{ listStyleType: "none" }}>
                        {/* <li key={post.ma_thiet_bi}>
                          <strong>Mã thiết bị: </strong>
                          {post.ma_thiet_bi}
                        </li>
                        <li key={post.loai_thiet_bi}>
                          <strong>Loại thiết bị:</strong> {post.loai_thiet_bi}
                        </li>
                        <li key={post.ma_thiet_bi}>
                          <strong>Tọa độ: </strong>
                          {post.toa_do}
                        </li>
                        <li key={post.ma_thiet_bi}>
                          <strong>Trạng thái: </strong>
                          {post.trang_thai}
                        </li>
                        <li key={post.ma_thiet_bi}>
                          <strong>Ngày vận hành: </strong>
                          {post.ngay_van_hanh}
                        </li>
                        <li key={post.ma_thiet_bi}>
                          <strong>Ngày sửa đổi: </strong>
                          {post.ngay_sua_doi}
                        </li>
                        <li key={post.ma_thiet_bi}>
                          <strong>Ngày lắp đặt: </strong>
                          {post.ngay_lap_dat}
                        </li> */}
                        <li key={post.ma_tuyen}>
                          <strong>Mã tuyến: </strong>
                          {post.ma_tuyen}
                        </li>
                        <li key={post.muc_on_dinh}>
                          <strong>Muc on dinh: </strong>
                          {post.muc_on_dinh}
                        </li>
                        <li key={post.thiet_bi_cong_trinh_cha}>
                          <strong>TBCTC: </strong>
                          {post.thiet_bi_cong_trinh_cha}
                        </li>
                      </ul>
                    ))}
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: "4%" }}>
                    <Card variant="outlined" style={{ height: "100%" }}>
                      <CardContent>
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
                          <a>Cach dien thuy tinh:</a>
                          <div
                            title="anh goc"
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
                                <img
                                  src={anhcdttgoc}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                          <div
                            title="anh loi 1"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginLeft: "18%",
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
                                <img
                                  src={anhcdttloi1}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                          <div
                            title="anh loi 2"
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
                                <img
                                  src={anhcdttloi2}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                          <div
                            title="anh loi 3"
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
                                <img
                                  src={anhcdttloi3}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            overflow: "auto",
                            marginBottom: "2%",
                            marginTop: "2%",
                          }}
                        >
                          <a>Duong Day:</a>
                          <div
                            title="anh goc"
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
                                <img
                                  src={anhdzgoc}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                          <div
                            title="anh loi 1"
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
                                <img
                                  src={anhdzloi1}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                          <div
                            title="anh loi 2"
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
                                <img
                                  src={anhdzloi2}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                          <div
                            title="anh loi 3"
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
                                <img
                                  src={anhdzloi1}
                                  height={"100%"}
                                  width={"100%"}
                                />
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                        </div>
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
