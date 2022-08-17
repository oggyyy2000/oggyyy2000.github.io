import React, { useState, useEffect } from "react";
import axios from "axios";
//-----------------------------------------
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import SaveIcon from "@material-ui/icons/Save";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
//-----------------------------------------
import Loading from "../component/generalObject/Loading";
// data
import { T1 } from "../util/toado/T1";
import { T2 } from "../util/toado/T2";
import { T3 } from "../util/toado/T3";
import { T4 } from "../util/toado/T4";
import { T5 } from "../util/toado/T5";
import { T6 } from "../util/toado/T6";
import { T7 } from "../util/toado/T7";
import { T8 } from "../util/toado/T8";
///////////////////////////////////////////
import { useDispatch } from "react-redux";
import * as actions from "../redux/types";
////
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  wrapShape,
} from "react-shape-editor";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          component={"C"}
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DialogSavePopup() {
  const [open, setOpen] = React.useState(false);
  const urltb = process.env.REACT_APP_API_URL + "dotkiemtras/";
  const urlt = process.env.REACT_APP_API_URL + "tuyens/";
  const urlv = process.env.REACT_APP_API_URL + "image/";
  const urltdkt = process.env.REACT_APP_API_URL + "dotkiemtraimports/";
  const urlags = process.env.REACT_APP_API_URL + "imagegiamsats/";
  const classes = useStyles();
  const [ListTuyen, setListTuyen] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [ListCot, setListCot] = useState([]);
  const [resData, setResData] = useState(null);
  var dt = new Date();
  var date = `${dt.getFullYear().toString().padStart(4, "0")}-${(
    dt.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dt.getDate().toString().padStart(2, "0")}`;
  const values = {
    someDate: date,
  };
  const [DateDB, setDateDB] = useState(date);
  const [Dot, setDot] = useState(null);
  const [Tuyen, setTuyen] = useState(null);
  const [BatDau, setBatDau] = useState(null);
  const [KetThuc, setKetThuc] = useState(null);
  const [SelectForder, setSelectForder] = useState(false);
  const [New, setNew] = useState(true);
  const [Done, setDone] = useState(false);
  const [selectedFile, SetSelectedFile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    handleInfo();
  }, [DateDB, Dot, Tuyen, BatDau, KetThuc, New]);

  useEffect(() => {
    async function getDataDB() {
      try {
        let res = await axios({
          url: urltb,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDataDB().then((res) => setFetchedData(res));
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
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDatatuyen().then((res) => setListTuyen(res));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (event, setFunction) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    setFunction(value);
    setDone(false);
  };

  const onChangeDateDB = (event) => {
    onChange(event, setDateDB);
  };

  const onChangeSelectDot = (event) => {
    onChange(event, setDot);
  };

  const Resset_Cot = () => {
    setBatDau(null);
    setKetThuc(null);
    dispatch({ type: actions.ON_CURRENT_LIST_COT_CHANGE, data: [] });
  };

  const onChangeSelectTuyen = (event) => {
    onChange(event, setTuyen);
    Resset_Cot();
    switch (event.target.value) {
      case "T1":
        setListCot(T1);
        break;
      case "T2":
        setListCot(T2);
        break;
      case "T3":
        setListCot(T3);
        break;
      case "T4":
        setListCot(T4);
        break;
      case "T5":
        setListCot(T5);
        break;
      case "T6":
        setListCot(T6);
        break;
      case "T7":
        setListCot(T7);
        break;
      case "T8":
        setListCot(T8);
        break;
      default:
        setListCot(null);
        break;
    }
  };

  const onChangeSelectBatDau = (event) => {
    onChange(event, setBatDau);
  };

  const onChangeSelectKetThuc = (event) => {
    onChange(event, setKetThuc);
  };

  const onChangeSelectOptions = (e) => {
    e.target.checked ? setSelectForder(true) : setSelectForder(false);
  };

  const onChangeChecked = (e) => {
    setDone(false);
    e.target.checked ? setNew(true) : setNew(false);
  };

  const handleInfo = () => {
    if (New) {
      if (
        DateDB !== null &&
        Tuyen !== null &&
        BatDau !== null &&
        KetThuc !== null
      ) {
        setDone(true);
      } else {
        setDone(false);
      }
    } else {
      if (
        DateDB !== null &&
        Dot !== null &&
        Tuyen !== null &&
        BatDau !== null &&
        KetThuc !== null
      ) {
        setDone(true);
      } else {
        setDone(false);
      }
    }
    var pluginArrayArg = new Array();
    if (BatDau !== null) {
      var jsonArg1 = new Object();
      jsonArg1.cot = BatDau.split("|")[0];
      jsonArg1.toa_do_vi_tri = BatDau.split("|")[1];
      pluginArrayArg.push(jsonArg1);
    }
    if (KetThuc !== null) {
      var jsonArg2 = new Object();
      jsonArg2.cot = KetThuc.split("|")[0];
      jsonArg2.toa_do_vi_tri = KetThuc.split("|")[1];
      pluginArrayArg.push(jsonArg2);
    }
    var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
    dispatch({ type: actions.ON_CURRENT_LIST_COT_CHANGE, data: jsonArray });
    dispatch({ type: actions.ON_CURRENT_TUYEN_CHANGE, data: Tuyen });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function onChangeHandler(event) {
    var file = await convertBase64(event.target.files[0]);
    if (file) SetSelectedFile(file);
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    //yyyy-mm-dd format
    return [year, month, day].join("-");
  }

  const getcot = (str) => {
    var temp = str.toString();
    var cot = temp.split("|");
    return cot[0];
  };

  const sendimg = (madkt) => {
    axios
      .post(urlv, {
        ma_dot_kiem_tra: madkt,
        hinh_anh_data: selectedFile,
        stt: 0,
      })
      .then(
        (response) => {
          console.log(response.data);
          setResData(response.data);
          alert("Gửi thành công");
          //  handleClose();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handelsubumit = async () => {
    let batdau = await getcot(BatDau);
    let ketthuc = await getcot(KetThuc);
    axios
      .post(urltb, {
        ma_tuyen: Tuyen,
        bat_dau_doan: batdau,
        ket_thuc_doan: ketthuc,
        ngay_kiem_tra: formatDate(DateDB),
        hinh_thuc_kiem_tra: "NGAY",
      })
      .then(
        (response) => {
          sendimg(response.data.ma_dot_kiem_tra);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handelsubumit2 = async () => {
    sendimg(Dot);
  };

  const renderchoice = () => {
    return (
      <>
        <div style={{ margin: "10px", width: "90vw" }}>
          <FormControl
            variant={"outlined"}
            style={{
              alignSelf: "center",
              minWidth: "25%",
              marginLeft: 10,
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Hãy chọn tuyến
            </InputLabel>
            <Select
              width="100%"
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={"Hãy chọn tuyến"}
              value={Tuyen}
              style={{ height: 40 }}
              onChange={onChangeSelectTuyen}
            >
              <MenuItem value={null}>Trống</MenuItem>
              {ListTuyen ? (
                ListTuyen.map((item, index) => (
                  <MenuItem key={index} value={item.ma_tuyen}>
                    {item.tt_tuyen}
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
              marginLeft: 10,
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Hãy chọn điểm bắt đầu
            </InputLabel>
            <Select
              width="100%"
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={"Hãy chọn tuyến"}
              value={BatDau}
              style={{ height: 40 }}
              onChange={onChangeSelectBatDau}
            >
              <MenuItem value={null}>Trống</MenuItem>
              {ListCot ? (
                ListCot.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.cot + "|" + item.x + "," + item.y}
                  >
                    {item.cot}
                  </MenuItem>
                ))
              ) : (
                <Loading />
              )}
            </Select>
          </FormControl>{" "}
          <FormControl
            variant={"outlined"}
            style={{
              alignSelf: "center",
              minWidth: "25%",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Hãy chọn điểm kết thúc
            </InputLabel>
            <Select
              width="100%"
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={"Hãy chọn tuyến"}
              value={KetThuc}
              style={{ height: 40 }}
              onChange={onChangeSelectKetThuc}
            >
              <MenuItem value={null}>Trống</MenuItem>
              {ListCot ? (
                ListCot.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.cot + "|" + item.x + "," + item.y}
                  >
                    {item.cot}
                  </MenuItem>
                ))
              ) : (
                <Loading />
              )}
            </Select>
          </FormControl>
          {SelectForder ? (
            <>
              {/*Check box + button file*/}
              {Done ? (
                <>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="Chọn thư mục"
                    labelPlacement="end"
                    checked="true"
                    style={{ marginBottom: 0, marginRight: 15 }}
                    onChange={(e) => {
                      onChangeSelectOptions(e);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    htmlFor="folder"
                    startIcon={<SaveIcon />}
                  >
                    Chọn thư mục
                    <input
                      id="folder"
                      directory=""
                      webkitdirectory=""
                      style={{ display: "none" }}
                      type="file"
                    />
                  </Button>
                </>
              ) : (
                <>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="Chọn thư mục"
                    labelPlacement="end"
                    checked="true"
                    style={{ marginBottom: 0, marginRight: 15 }}
                    onChange={(e) => {
                      onChangeSelectOptions(e);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    htmlFor="folder"
                    startIcon={<SaveIcon />}
                    disabled="true"
                  >
                    Chọn thư mục
                    <input
                      id="folder"
                      directory=""
                      webkitdirectory=""
                      style={{ display: "none" }}
                      type="file"
                    />
                  </Button>
                </>
              )}

              {/*Check box + button file*/}
            </>
          ) : (
            <>
              {/*Check box checked + button folder*/}
              {Done ? (
                <>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="Chọn thư mục"
                    labelPlacement="end"
                    style={{ marginBottom: 0, marginRight: 15 }}
                    onChange={(e) => {
                      onChangeSelectOptions(e);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    htmlFor="files"
                    startIcon={<SaveIcon />}
                  >
                    Chọn File
                    <input
                      id="files"
                      multiple
                      name="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      type="file"
                      onChange={(e) => onChangeHandler(e)}
                    />
                  </Button>
                </>
              ) : (
                <>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="Chọn thư mục"
                    labelPlacement="end"
                    style={{ marginBottom: 0, marginRight: 15 }}
                    onChange={(e) => {
                      onChangeSelectOptions(e);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    htmlFor="files"
                    startIcon={<SaveIcon />}
                    disabled="true"
                  >
                    Chọn Thư Mục
                    <input
                      id="files"
                      multiple
                      name="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      type="file"
                    />
                  </Button>
                </>
              )}
              {/*Check box checked + button folder*/}
            </>
          )}
        </div>
      </>
    );
  };

  const send = () => {
    axios
      .post(urlags, {
        ma_dot_kiem_tra: "d2a9df6e-84d4-4bc2-b52c-2966f71eeb5e",
        loai_hinh_anh: "BINHTHUONG",
        ma_bat_thuong: "",
        hinh_anh_data: selectedFile,
      })
      .then(
        (response) => {
          console.log(response.data);
          //  handleClose();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const get = () => {
    axios.get(urlags).then(
      (response) => {
        console.log(response.data);
        //  handleClose();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //-------------------------------------------------

  function arrayReplace(arr, index, item) {
    return [
      ...arr.slice(0, index),
      ...(Array.isArray(item) ? item : [item]),
      ...arr.slice(index + 1),
    ];
  }

  const RectShape = wrapShape(({ width, height, title }) => (
    <svg width={width} height={height}>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="rgba(0,0,255,0.5)"
      />
      <text
        x="50%"
        y="50%"
        fill="white"
        fontWeight="bold"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        {title}
      </text>
    </svg>
  ));

  let idIterator = 1;

  const [items, setItems] = useState([]);

  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });

  //-------------------------------------------------

  return (
    <>
      <Button
        component={"C"}
        onClick={handleClickOpen}
        style={{ float: "right" }}
      >
        Thêm dữ liệu <ImportExportIcon style={{ color: "black" }} />
      </Button>
      <Dialog
        onClose={handleClose}
        maxWidth={false}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Bộ lọc dữ liệu đầu vào
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            {New ? (
              <>
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label="Dữ liệu mới"
                  labelPlacement="end"
                  checked="true"
                  style={{ marginBottom: 0, marginRight: 15, marginLeft: 8 }}
                  onChange={(e) => {
                    onChangeChecked(e);
                  }}
                />
                <TextField
                  id="date"
                  label="Ngày quay"
                  type="date"
                  value={DateDB}
                  defaultValue={values.someDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginLeft: "10px" }}
                  onChange={onChangeDateDB}
                />
                {renderchoice()}
              </>
            ) : (
              <>
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label="Dữ liệu mới"
                  labelPlacement="end"
                  style={{ marginBottom: 0, marginRight: 15, marginLeft: 8 }}
                  onChange={(e) => {
                    onChangeChecked(e);
                  }}
                />
                <TextField
                  id="date"
                  label="Ngày quay"
                  type="date"
                  value={DateDB}
                  style={{ marginLeft: "10px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChangeDateDB}
                />
                <FormControl
                  variant={"outlined"}
                  style={{
                    alignSelf: "center",
                    minWidth: "25%",
                    marginLeft: 10,
                  }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Hãy chọn đợt bay cần bổ sung dữ liệu
                  </InputLabel>
                  <Select
                    width="100%"
                    className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Dot}
                    style={{ height: 40 }}
                    onChange={onChangeSelectDot}
                  >
                    <MenuItem value={null}>Trống</MenuItem>
                    {fetchedData ? (
                      fetchedData.map((item, index) => (
                        <MenuItem key={index} value={item.ma_dot_kiem_tra}>
                          {item.ma_dot_kiem_tra}
                        </MenuItem>
                      ))
                    ) : (
                      <Loading />
                    )}
                  </Select>
                </FormControl>
                {renderchoice()}
              </>
            )}
          </form>
          <Button
            autoFocus
            component={"C"}
            onClick={handelsubumit2}
            color="primary"
          >
            Gửi tệp tin
          </Button>
        </DialogContent>
        <DialogActions>
          {Done && selectedFile ? (
            <Button
              autoFocus
              component={"C"}
              onClick={handelsubumit}
              color="primary"
            >
              Gửi tệp tin
            </Button>
          ) : (
            <>
              <Button autoFocus component={"C"} color="primary">
                Gửi tệp tin
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <img src={"data:image/jpeg;base64," + resData} alt="" />
      </div>
      <Button onClick={get}>Nhận ảnh giám sát</Button>
      <Button onClick={send}>Gửi ảnh giám sát</Button>
    </>
  );
}
