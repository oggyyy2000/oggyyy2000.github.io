import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
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
}));
export default function ThietBi() {
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

    getDatatuyen().then((res) => setListTuyen(res));
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

  const renderPostDetail = (post) => {
    return (
      <>
        <section
          style={{
            padding: "30px 40px",
            position: "relative",
            borderBottom: "solid 1px #EEE",
            fontSize: "1rem",
          }}
        >
          <div
            className
            style={{
              marginBottom: "40px",
              position: "relative",
              fontFamily: "math",
            }}
          >
            <h2
              style={{ color: "red", fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Mã thiết bị {post.ma_thiet_bi}
            </h2>
          </div>
          <div>
            <ul
              style={{
                listStyleType: "none",
              }}
            >
              <li>
                <strong>Loại thiết bị: </strong> {post.loai_thiet_bi}
              </li>
              <li>
                <strong>Trạng thái: </strong> {post.trang_thai}
              </li>
              <li>
                <strong>Đường dây: </strong> {post.duong_day}
              </li>
              <li>
                <strong>Thiết bị công trình cha: </strong>
                {post.thiet_bi_cong_trinh_cha}
              </li>
              <li>
                <strong>Thiết bị công trình: </strong>
                {post.thiet_bi_cong_trinh}
              </li>
              <li>
                <strong>Số thứ tự: </strong> {post.STT}
              </li>
              <li>
                <strong>Serial: </strong> {post.so_che_tao_serial}
              </li>
              <li>
                <strong>Ngày vận hành: </strong> {post.ngay_van_hanh}
              </li>
              <li>
                <strong>CMIS: </strong> {post.ma_CMIS}
              </li>
              <li>
                <strong>TSCD: </strong> {post.so_TSCD}
              </li>
              <li>
                <strong>Tình trạng vận hành: </strong>{" "}
                {post.tinh_trang_van_hanh}
              </li>
              <li>
                <strong>Mã liên kết khác: </strong> {post.ma_lien_ket_khac}
              </li>
              <li>
                <strong>Hãng sản xuất: </strong> {post.hang_san_xuat}
              </li>
              <li>
                <strong>Nhà cung cấp: </strong>
                {post.nha_cung_cap}
              </li>
              <li>
                <strong>Nước sản xuất: </strong> {post.nuoc_san_xuat}
              </li>
              <li>
                <strong>Sở hữu: </strong> {post.so_huu}
              </li>
              <li>
                <strong>Ngày lắp đặt: </strong>
                {post.ngay_lap_dat}
              </li>
              <li>
                <strong>Năm sản xuất: </strong> {post.nam_san_xuat}
              </li>
              <li>
                <strong>Ngày sửa đổi: </strong> {post.ngay_sua_doi}
              </li>
              <li>
                <strong>Ghi chú: </strong> {post.ghi_chu}
              </li>
              <li>
                <strong>Đơn vị: </strong> {post.don_vi}
              </li>
              <li>
                <strong>Chi tiết: </strong>{" "}
                {Object.keys(post.chi_tiet_tbi || {}).map((item, index) => (
                  <li key={index}>
                    {item}: {post.chi_tiet_tbi[item]}
                  </li>
                ))}
              </li>
              <li>
                <strong>Mã bất thường:</strong> {post.ma_bat_thuong}
              </li>
              <li>
                <strong>Mã tuyến:</strong> {post.ma_tuyen}
              </li>
              <li>
                <strong>Mã vị trí:</strong> {post.ma_vi_tri}
              </li>
            </ul>
          </div>
        </section>
      </>
    );
  };

  const render = (post) => {
    return (
      <Card className={classes.root} key={post.ma_thiet_bi}>
        {/*<CardMedia
          className={classes.cover}
          image={ChangerUrl(post.anh_thiet_bi)}
    />*/}
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Mã thiết bị: {post.ma_thiet_bi}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Loại thiết bị: {post.loai_thiet_bi} {" | "}
              Trạng thái: {post.trang_thai} <br />
              Tình trạng vận hành: {post.tinh_trang_van_hanh} <br />
            </Typography>
            <Button component={"C"} onClick={() => Show(post)}>
              Xem chi tiết
              {post.trang_thai === "3_defect_warning" ? (
                <WarningOutlinedIcon style={{ color: "#E7E009" }} />
              ) : post.trang_thai === "2_defect_detected" ? (
                <ErrorOutlineIcon style={{ color: "#FF0400" }} />
              ) : (
                <VerifiedUserIcon style={{ color: "green" }} />
              )}
            </Button>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <Box
        style={{
          height: "100%",
          width: "50%",
          float: "left",
          position: "relative",
        }}
      >
        <div style={{ height: "100%", overflowY: "scroll" }}>
          <div style={{ margin: "10px" }}>
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
          {fetchedData ? (
            fetchedData?.data?.length !== 0 ? (
              fetchedData?.data?.map((post) => render(post))
            ) : (
              <div>
                <p
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    position: "absolute",
                  }}
                >
                  Không có dữ liệu bạn cần tìm, vui lòng trở lại sau!
                </p>
              </div>
            )
          ) : (
            <Loading />
          )}
        </div>
      </Box>
      <Box
        style={{
          height: "100%",
          width: "50%",
          float: "left",
          fontSize: "1.25rem",
          overflow: "scroll",
          color: "black",
          position: "relative",
        }}
      >
        {DataDetail && DataDetail?.ma_thiet_bi
          ? renderPostDetail(DataDetail)
          : ""}
      </Box>
    </Box>
  );
}
