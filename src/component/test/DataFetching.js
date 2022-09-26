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
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { ChangerUrl } from "../../util/ChangeUrl";
import SlideshowGallery from "../generalObject/slideshow-gallery/SlideshowGallery2";

const useStyles = makeStyles(() => ({
  pagination: {
    alignItems: "center",
    justify: "center",
    "& > *": {
      justifyContent: "center",
      display: "flex",
    },
  },
}));

function DataFetching() {
  const classes = useStyles();
  const [ListTuyen, setListTuyen] = useState([]);
  const [ListThietbi, setListThietBi] = useState({});
  const [Tuyen, setTuyen] = useState("");
  const dispatch = useDispatch();
  const anhthietbiloi = useSelector((state) => state.anhthietbiloi);
  const idtuyen = useSelector((state) => state.idtuyen);
  const idanh = useSelector((state) => state.idanh);
  const idthietbi = useSelector((state) => state.idthietbi);
  const [dEtail, setdEtail] = useState({});
  const [page, setPage] = useState(1);
  const urlt = process.env.REACT_APP_API_URL + "getalltuyens";
  const [gridSize, setGridSize] = useState({ panelone: 12, paneltwo: 0 });
  const urltttbgs = `${
    process.env.REACT_APP_API_URL
  }getallttgiamsatthietbis?page=${page}${
    Tuyen ? "&ma_tuyen=" + Tuyen : "&none=0"
  }`;

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleChangetb = (event) => {
    setListThietBi(event.target.value);
  };

  const handleChangeTuyen = (event) => {
    setTuyen(event.target.value);
  };

  useEffect(() => {
    axios
      .get(urlt)
      .then((res) => {
        setListTuyen(res.data);
        setTuyen(res?.data[0]?.ma_tuyen);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  useEffect(() => {
    axios
      .get(urltttbgs)
      .then((res) => {
        let data = res?.data?.data || [];
        for (let i = 0; i < data?.length; i++) {
          let item = data[i];
          let arr = item[Object.keys(item)[0]];
          var result = groupByKey(arr, "loai_thiet_bi");
          item[Object.keys(item)[0]] = result;
        }

        if (res?.data?.data) {
          res.data.data = data;
        }

        dispatch({ type: actions.anhthietbiloi, data: res.data });
        setdEtail({});
        dispatch({
          type: actions.idanh,
          data: {},
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Tuyen, page]);

  let findbykeyinarray = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (Object.keys(array[i])[0] == value) {
        return array[i];
      }
    }
  };

  useEffect(() => {
    let data = anhthietbiloi?.data;
    if (data) {
      let temp = findbykeyinarray(data, idthietbi);
      if (temp) {
        let temp2 = temp[Object.keys(temp)[0]];
        let item = temp2[idanh?.loai]?.find(
          (x) => x.ma_thiet_bi === idanh.ma_thiet_bi
        );
        setdEtail(item);
        if (item) {
          setGridSize({ panelone: 7, paneltwo: 5 });
        } else {
          setGridSize({ panelone: 12, paneltwo: 0 });
        }
      }
    }
  }, [idanh]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
          style={{
            height: "100%",
            width: "100%",
            margin: 0,
          }}
        >
          <Grid
            item
            xs={gridSize.panelone || 12}
            style={{ maxHeight: "100%", overflow: "scroll" }}
          >
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
                          {item.ten_tuyen}
                        </MenuItem>
                      ))
                    ) : (
                      <Loading />
                    )}
                  </Select>
                </FormControl>
                <div style={{ marginTop: 10 }}>
                  <Pagination
                    className={classes.pagination}
                    count={anhthietbiloi?.last_page || 0}
                    size="large"
                    page={page}
                    color="primary"
                    shape="rounded"
                    onChange={handleChangePage}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <Bieudothongke />
              </Grid>

              <Grid item xs={12}>
                <MucDoLoi />
              </Grid>
            </Grid>
          </Grid>

          {gridSize.paneltwo == 5 && (
            <Grid
              item
              xs={gridSize.paneltwo || 5}
              style={{ maxHeight: "100%", overflow: "scroll" }}
            >
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
                    </ul>
                  </Card>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "4%" }}>
                  <Card variant="outlined" style={{ height: "100%" }}>
                    <CardContent>
                      <>
                        <CardHeader
                          title={`Ảnh thiết bị gốc ${
                            dEtail ? dEtail?.loai_thiet_bi || "" : ""
                          }`}
                        />
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
                          {dEtail &&
                            dEtail?.thong_tin_giam_sat_tb?.img_root_path && (
                              <SlideshowGallery
                                input={
                                  dEtail?.thong_tin_giam_sat_tb?.img_root_path
                                }
                                ratio={`16:9`}
                              />
                            )}
                        </div>
                        <CardHeader title={"Ảnh thiết qua các đợt kiểm tra"} />

                        {dEtail &&
                          dEtail?.thong_tin_giam_sat_tb &&
                          Object.keys(dEtail?.thong_tin_giam_sat_tb).map(
                            (item, index) => (
                              <>
                                {item !== "img_root_path" && (
                                  <>
                                    {dEtail &&
                                      dEtail?.thong_tin_giam_sat_tb
                                        ?.img_root_path && (
                                        <>
                                          <p>{item}</p>
                                          <SlideshowGallery
                                            input={
                                              dEtail?.thong_tin_giam_sat_tb[
                                                item
                                              ]
                                            }
                                            ratio={`16:9`}
                                          />
                                        </>
                                      )}
                                  </>
                                )}
                              </>
                            )
                          )}
                      </>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </>
    </ThemeProvider>
  );
}

export default DataFetching;
