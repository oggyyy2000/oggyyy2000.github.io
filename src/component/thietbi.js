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
}));
export default function ThietBi() {
  const urltb = process.env.REACT_APP_API_URL + "thietbituyens/";
  const urlt = process.env.REACT_APP_API_URL + "tuyens/";
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState([]);
  const [ListTuyen, setListTuyen] = useState([]);
  const [Tuyen, setTuyen] = useState(null);
  const [Loai, setLoai] = useState(null);
  const [DataDetail, setDataDetail] = useState([]);
  let count = 0;

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

    getDatatb().then((res) => setFetchedData(res));
  }, []);

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

  const onChange = (event, setFunction) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    setFunction(value);
  };

  const onChangeSelectTuyen = (event) => {
    onChange(event, setTuyen);
  };

  const onChangeSelectLTB = (event) => {
    onChange(event, setLoai);
  };

  const Show = (data) => {
    setDataDetail(data);
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
                <strong>Loại thiết bị:</strong> {post.loai_thiet_bi}
              </li>
              <li>
                <strong>Trạng thái:</strong> {post.trang_thai}
              </li>
              <li>
                <strong>Mức ổn định:</strong> {post.muc_on_dinh}
              </li>
              <li>
                <strong>Tọa độ:</strong> {post.toa_do}
              </li>
              <li>
                <strong>Đường dây:</strong> {post.duong_day}
              </li>
              <li>
                <strong>Thiết bị công trình cha:</strong>
                {post.thiet_bi_cong_trinh_cha}
              </li>
              <li>
                <strong>Thiết bị công trình:</strong> {post.thiet_bi_cong_trinh}
              </li>
              <li>
                <strong>Số thứ tự:</strong> {post.STT}
              </li>
              <li>
                <strong>Serial:</strong> {post.so_che_tao_serial}
              </li>
              <li>
                <strong>Ngày vận hành:</strong> {post.ngay_van_hanh}
              </li>
              <li>
                <strong>CMIS:</strong> {post.ma_CMIS}
              </li>
              <li>
                <strong>TSCD:</strong> {post.so_TSCD}
              </li>
              <li>
                <strong>Tình trạng vận hành:</strong> {post.tinh_trang_van_hanh}
              </li>
              <li>
                <strong>Mã liên kết khác:</strong> {post.ma_lien_ket_khac}
              </li>
              <li>
                <strong>Hãng sản xuất:</strong> {post.hang_san_xuat}
              </li>
              <li>
                <strong>Nhà cung cấp:</strong>
                {post.nha_cung_cap}
              </li>
              <li>
                <strong>Nước sản xuất:</strong> {post.nuoc_san_xuat}
              </li>
              <li>
                <strong>Sở hữu:</strong> {post.so_huu}
              </li>
              <li>
                <strong>Ngày lắp đặt:</strong>
                {post.ngay_lap_dat}
              </li>
              <li>
                <strong>Năm sản xuất:</strong> {post.nam_san_xuat}
              </li>
              <li>
                <strong>Ngày sửa đổi:</strong> {post.ngay_sua_doi}
              </li>
              <li>
                <strong>Ghi chú:</strong> {post.ghi_chu}
              </li>
              <li>
                <strong>Đơn vị:</strong> {post.don_vi}
              </li>
              <li>
                <strong>Chi tiết:</strong> {post.chi_tiet_tbi}
              </li>
              <li>
                <strong>Mã bất thường:</strong> {post.ma_bat_thuong}
              </li>
              <li>
                <strong>Mã tuyến:</strong> {post.ma_tuyen}
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
        <CardMedia
          className={classes.cover}
          image={ChangerUrl(post.anh_thiet_bi)}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Mã thiết bị: {post.ma_thiet_bi}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Loại thiết bị: {post.loai_thiet_bi} {" | "}
              Mã tuyến: {post.ma_tuyen} <br />
              Mức ổn định: {post.muc_on_dinh} {" | "} Tình trạng vận hành:{" "}
              {post.tinh_trang_van_hanh} <br />
            </Typography>
            <Button component={"C"} onClick={() => Show(post)}>
              Xem chi tiết
              {post.muc_on_dinh >= 50 ? (
                <VerifiedUserIcon style={{ color: "green" }} />
              ) : (
                <ErrorOutlineIcon style={{ color: "red" }} />
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
                minWidth: "25%",
                width: "45%",
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
                minWidth: "25%",
                width: "45%",
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
          </div>
          {fetchedData ? (
            fetchedData.map((post) =>
              Tuyen === null && Loai === null ? (
                render(post)
              ) : Tuyen !== null &&
                Loai !== null &&
                post.ma_tuyen === Tuyen &&
                post.loai_thiet_bi === Loai ? (
                render(post)
              ) : Tuyen !== null && Loai === null && post.ma_tuyen === Tuyen ? (
                render(post)
              ) : Tuyen === null &&
                Loai !== null &&
                post.loai_thiet_bi === Loai ? (
                render(post)
              ) : (
                <>
                  <div key={post._id} style={{ display: "none" }}>
                    {(count = count + 1)}
                  </div>
                  {count === fetchedData.length ? (
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
                  ) : (
                    ""
                  )}
                </>
              )
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
        {DataDetail && DataDetail.length !== 0
          ? renderPostDetail(DataDetail)
          : fetchedData && fetchedData.length !== 0
          ? renderPostDetail(fetchedData[0])
          : ""}
      </Box>
    </Box>
  );
}
