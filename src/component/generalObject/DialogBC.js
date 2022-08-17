import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DescriptionIcon from "@material-ui/icons/Description";
import BC from "./BC";
import BtnPrint from "./BtnPrint";
import XacThuc from "./xacthucbc";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  btnhover: {
    border: "2px solid white",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullDialogBC(props) {
  const classes = useStyles();
  const post = props.data;
  const [open, setOpen] = useState(false);
  ///
  const [open2, setOpen2] = useState(false);
  const [obj1, setObj1] = useState({
    name: "KS. Nguyễn Duy Anh",
    chucdanh: "",
    battho: "5/7",
    batat: "3/5",
  });
  const [obj2, setObj2] = useState({
    name: "KS. Nguyễn Đức Hùng",
    chucdanh: "",
    battho: "7/7",
    batat: "4/5",
  });
  const [obj3, setObj3] = useState({
    name: "KS. Nguyễn Hữu Minh",
    chucdanh: "",
    battho: "5/7",
    batat: "3/5",
  });
  const [obj4, setObj4] = useState({
    name: "KS. Hoàng Văn Sơn",
    chucdanh: "",
    battho: "6/7",
    batat: "5/5",
  });

  ///

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ////
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  ////

  return (
    <>
      <Button
        component={"C"}
        onClick={handleClickOpen}
        className={classes.btnhover}
      >
        Xuất Báo Cáo <DescriptionIcon />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Chi tiết của {/*post.ma_dot_kiem_tra*/}
              {post.ma_tuyen}_{post.bat_dau_doan}-{post.ket_thuc_doan}_
              {post.ngay_kiem_tra}
            </Typography>
            <Button
              component={"C"}
              onClick={handleClickOpen2}
              style={{ color: "white", marginRight: "50px" }}
            >
              Nhập danh sách kiểm tra
            </Button>
            <BtnPrint post={post} />
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              component={"C"}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box style={{ height: "88%" }} display="flex" p={0}>
          <Box
            style={{
              height: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
              width: "fit-content",
            }}
            p={0}
          >
            <BC data={post} obj1={obj1} obj2={obj2} obj3={obj3} obj4={obj4} />
          </Box>
          <Box style={{ height: "100%", overflow: "hidden" }} p={0} flex="1">
            <XacThuc />
          </Box>
        </Box>
      </Dialog>
      {/**/}
      <Dialog
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Danh sách kiểm tra
            </Typography>
            {/*<Button
              onClick={handleClose2}
              component={"C"}
              style={{color:'white'}}
            >
              Lưu Danh Sách
            </Button>  */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose2}
              aria-label="close"
              component={"C"}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box display="flex" p={0}>
          <div>
            <TextField
              id="standard-basic"
              label="STT"
              value="1"
              style={{ margin: "10px", width: "25px" }}
              disabled
            />
            <TextField
              id="standard-basic"
              label="STT"
              value="2"
              style={{ margin: "10px", width: "25px" }}
              disabled
            />
            <TextField
              id="standard-basic"
              label="STT"
              value="3"
              style={{ margin: "10px", width: "25px" }}
              disabled
            />
            <TextField
              id="standard-basic"
              label="STT"
              value="4"
              style={{ margin: "10px", width: "25px" }}
              disabled
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Họ Và Tên"
              value={obj1.name}
              onChange={(e) => {
                const value = e.target.value;
                setObj1({ ...obj1, name: value });
              }}
              style={{ margin: "10px", width: "200px" }}
            />
            <TextField
              id="standard-basic"
              label="Họ Và Tên"
              value={obj2.name}
              onChange={(e) => {
                const value = e.target.value;
                setObj2({ ...obj2, name: value });
              }}
              style={{ margin: "10px", width: "200px" }}
            />
            <TextField
              id="standard-basic"
              label="Họ Và Tên"
              value={obj3.name}
              onChange={(e) => {
                const value = e.target.value;
                setObj3({ ...obj3, name: value });
              }}
              style={{ margin: "10px", width: "200px" }}
            />
            <TextField
              id="standard-basic"
              label="Họ Và Tên"
              value={obj4.name}
              onChange={(e) => {
                const value = e.target.value;
                setObj4({ ...obj4, name: value });
              }}
              style={{ margin: "10px", width: "200px" }}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Chức Danh"
              value={obj1.chucdanh}
              onChange={(e) => {
                const value = e.target.value;
                setObj1({ ...obj1, chucdanh: value });
              }}
              style={{ margin: "10px" }}
            />
            <TextField
              id="standard-basic"
              label="Chức Danh"
              value={obj2.chucdanh}
              onChange={(e) => {
                const value = e.target.value;
                setObj2({ ...obj2, chucdanh: value });
              }}
              style={{ margin: "10px" }}
            />
            <TextField
              id="standard-basic"
              label="Chức Danh"
              value={obj3.chucdanh}
              onChange={(e) => {
                const value = e.target.value;
                setObj3({ ...obj3, chucdanh: value });
              }}
              style={{ margin: "10px" }}
            />
            <TextField
              id="standard-basic"
              label="Chức Danh"
              value={obj4.chucdanh}
              onChange={(e) => {
                const value = e.target.value;
                setObj4({ ...obj4, chucdanh: value });
              }}
              style={{ margin: "10px" }}
            />
          </div>
          <div>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc Thợ"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc Thợ"}
                value={obj1.battho}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj1({ ...obj1, battho: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/7">1/7</MenuItem>
                <MenuItem value="2/7">2/7</MenuItem>
                <MenuItem value="3/7">3/7</MenuItem>
                <MenuItem value="4/7">4/7</MenuItem>
                <MenuItem value="5/7">5/7</MenuItem>
                <MenuItem value="6/7">6/7</MenuItem>
                <MenuItem value="7/7">7/7</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc Thợ"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc Thợ"}
                value={obj2.battho}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj2({ ...obj2, battho: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/7">1/7</MenuItem>
                <MenuItem value="2/7">2/7</MenuItem>
                <MenuItem value="3/7">3/7</MenuItem>
                <MenuItem value="4/7">4/7</MenuItem>
                <MenuItem value="5/7">5/7</MenuItem>
                <MenuItem value="6/7">6/7</MenuItem>
                <MenuItem value="7/7">7/7</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc Thợ"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc Thợ"}
                value={obj3.battho}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj3({ ...obj3, battho: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/7">1/7</MenuItem>
                <MenuItem value="2/7">2/7</MenuItem>
                <MenuItem value="3/7">3/7</MenuItem>
                <MenuItem value="4/7">4/7</MenuItem>
                <MenuItem value="5/7">5/7</MenuItem>
                <MenuItem value="6/7">6/7</MenuItem>
                <MenuItem value="7/7">7/7</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
                marginBottom: 0,
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc Thợ"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc Thợ"}
                value={obj4.battho}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj4({ ...obj4, battho: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/7">1/7</MenuItem>
                <MenuItem value="2/7">2/7</MenuItem>
                <MenuItem value="3/7">3/7</MenuItem>
                <MenuItem value="4/7">4/7</MenuItem>
                <MenuItem value="5/7">5/7</MenuItem>
                <MenuItem value="6/7">6/7</MenuItem>
                <MenuItem value="7/7">7/7</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc AT"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc AT"}
                value={obj1.batat}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj1({ ...obj1, batat: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/5">1/5</MenuItem>
                <MenuItem value="2/5">2/5</MenuItem>
                <MenuItem value="3/5">3/5</MenuItem>
                <MenuItem value="4/5">4/5</MenuItem>
                <MenuItem value="5/5">5/5</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc AT"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc AT"}
                value={obj2.batat}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj2({ ...obj2, batat: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/5">1/5</MenuItem>
                <MenuItem value="2/5">2/5</MenuItem>
                <MenuItem value="3/5">3/5</MenuItem>
                <MenuItem value="4/5">4/5</MenuItem>
                <MenuItem value="5/5">5/5</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc AT"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc AT"}
                value={obj3.batat}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj3({ ...obj3, batat: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/5">1/5</MenuItem>
                <MenuItem value="2/5">2/5</MenuItem>
                <MenuItem value="3/5">3/5</MenuItem>
                <MenuItem value="4/5">4/5</MenuItem>
                <MenuItem value="5/5">5/5</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: "64px",
                margin: "10px",
                height: "48px",
                marginBottom: 0,
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                {"Bậc AT"}
              </InputLabel>
              <Select
                width="100%"
                className={classes.select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Bậc AT"}
                value={obj4.batat}
                style={{ height: 40 }}
                onChange={(e) => {
                  const value = e.target.value;
                  setObj4({ ...obj4, batat: value });
                }}
              >
                <MenuItem value={null}>Trống</MenuItem>
                <MenuItem value="1/5">1/5</MenuItem>
                <MenuItem value="2/5">2/5</MenuItem>
                <MenuItem value="3/5">3/5</MenuItem>
                <MenuItem value="4/5">4/5</MenuItem>
                <MenuItem value="5/5">5/5</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      </Dialog>
      {/**/}
    </>
  );
}
