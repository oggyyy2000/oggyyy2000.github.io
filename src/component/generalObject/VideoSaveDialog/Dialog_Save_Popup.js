import React, { useState, useEffect, useContext } from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
//-----------------------------------------
import Loading from "../../generalObject/Loading";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/types";
import { WSContext } from "../../main/contexts/WSContext";
import { getTextDisplay } from "../../../util/GetTenTuyen";

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

export default function DialogSavePopup(props) {
  const [open, setOpen] = React.useState(false);
  // const urltb = process.env.REACT_APP_API_URL + "dotkiemtras/";
  // const urlt = process.env.REACT_APP_API_URL + "tuyens/";
  // const urlv = process.env.REACT_APP_API_URL + "videoimports/";
  const urltdkt = process.env.REACT_APP_API_URL + "dotkiemtraimports";
  const uploadvideo = process.env.REACT_APP_API_URL + "getvideodetectimport";
  const classes = useStyles();
  //const [ListTuyen, setListTuyen] = useState([]);
  //const [fetchedData, setFetchedData] = useState([]);
  const fetchedData = useSelector((state) => state.dbtc);
  const ListTuyen = useSelector((state) => state.listtuyen);
  const [ListCot, setListCot] = useState([]);
  const [Srt, setSrt] = useState(null);
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
  const [SelectIMG, setSelectIMG] = useState(false);
  const [New, setNew] = useState(true);
  const [Done, setDone] = useState(false);
  const [ThisDot, setThisDot] = useState(null);
  const [selectedFile, SetSelectedFile] = useState(null);
  const urlvt = `${process.env.REACT_APP_API_URL}getallvitribytuyens?${
    Tuyen ? "&ma_tuyen=" + Tuyen : ""
  }`;
  const [ListVTT, setListVTT] = useState([]);

  const dispatch = useDispatch();
  const [oldDB, setOldDb] = useState(null);
  const { ws, connect, disconnect, connectIMG } = useContext(WSContext);

  useEffect(() => {
    handleInfo();
  }, [DateDB, Dot, Tuyen, BatDau, KetThuc, New]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    disconnect();
  };

  const onChange = (event, setFunction) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    setFunction(value);
    setDone(false);
    setThisDot(null);
  };

  const onChangeDateDB = (event) => {
    onChange(event, setDateDB);
  };

  const Resset_Cot = () => {
    setBatDau(null);
    setKetThuc(null);
    dispatch({ type: actions.ON_CURRENT_LIST_COT_CHANGE, data: [] });
  };

  const Change_List_Cot = (value) => {
    Resset_Cot();
    /* switch (value) {
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
        setListCot(T1);
        break;
    }*/
  };

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

  const resetvaluedf = () => {
    setDateDB(values.someDate);
    setBatDau(null);
    setKetThuc(null);
    setTuyen(null);
    setOldDb(null);
  };

  useEffect(() => {
    waitListcot();
  }, [Tuyen]);

  useEffect(() => {
    // disconnect();
    if (open === true && !SelectIMG) {
      connect();
    } else if (open === true && SelectIMG) {
      connectIMG();
    } else {
      disconnect();
    }
  }, [open, SelectIMG]);

  const waitListcot = () => {
    if (oldDB) {
      let objbd = ListCot
        ? ListCot.find((o) => o.cot === oldDB.bat_dau_doan)
        : null;
      if (objbd) setBatDau(objbd.cot + "|" + objbd.x + "," + objbd.y);
      let objkt = ListCot
        ? ListCot.find((o) => o.cot === oldDB.ket_thuc_doan)
        : null;
      if (objkt) setKetThuc(objkt.cot + "|" + objkt.x + "," + objkt.y);
    }
  };

  useEffect(() => {
    waitDot();
  }, [Dot]);

  const waitDot = () => {
    if (Dot) {
      let obj = fetchedData
        ? fetchedData.find((o) => o.ma_dot_kiem_tra === Dot)
        : null;
      setOldDb(obj);
      setTuyen(obj.ma_tuyen);
      Change_List_Cot(obj.ma_tuyen);
      setDateDB(obj.ngay_kiem_tra);
    }
  };

  const onChangeSelectDot = (event) => {
    ///
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    if (value === null) {
      resetvaluedf();
    }
    ///
    onChange(event, setDot);
  };

  const onChangeSelectTuyen = (event) => {
    onChange(event, setTuyen);
    Change_List_Cot(event.target.value);
  };

  const onChangeSelectBatDau = (event) => {
    onChange(event, setBatDau);
  };

  const onChangeSelectKetThuc = (event) => {
    onChange(event, setKetThuc);
  };

  /*const onChangeSelectOptions = (e) => {
    e.target.checked ? setSelectForder(true) : setSelectForder(false);
  };*/

  const onChangeSelect2Options = (e) => {
    e.target.checked ? setSelectIMG(true) : setSelectIMG(false);
    SetSelectedFile(null);
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
      jsonArg1.toa_do = BatDau.split("|")[1];
      pluginArrayArg.push(jsonArg1);
    }
    if (KetThuc !== null) {
      var jsonArg2 = new Object();
      jsonArg2.cot = KetThuc.split("|")[0];
      jsonArg2.toa_do = KetThuc.split("|")[1];
      pluginArrayArg.push(jsonArg2);
    }
    var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
    dispatch({ type: actions.ON_CURRENT_LIST_COT_CHANGE, data: jsonArray });
    dispatch({ type: actions.ON_CURRENT_TUYEN_CHANGE, data: Tuyen });
  };

  async function onChangeHandler(event) {
    var file = event.target.files[0];
    if (file) SetSelectedFile(file);
  }

  function getExtension(filename) {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  }

  function isImage(file) {
    if (file.size > 0) {
      var ext = getExtension(file.name);
      switch (ext.toLowerCase()) {
        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
        case "tiff":
        case "bmp":
        case "pjp":
        case "pjpeg":
          return true;
      }
    }
    return false;
  }

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

  async function onChangeHandler2(e) {
    var temp = [];
    var tempname = [];
    const file = e.target.files;
    var count = 0;
    var erorrlist = "";
    for (let i = 0; i < file.length; i++) {
      if (isImage(file[i])) {
        if (file[i]) {
          const base64 = await convertBase64(file[i]);
          //const base64 = file[i];
          temp.push(base64.split("base64,")[1]);
          tempname.push(
            `${i}_${file[i].name
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s/g, "")}`
          );
        }
      } else {
        erorrlist += "\n" + file[i].name;
        count++;
      }
    }
    const obj = {};
    let i = 0;
    for (const key of tempname) {
      obj[key] = temp[i];
      i++;
    }
    if (temp.length !== 0) {
      SetSelectedFile(obj);
    }
    // console.log(obj);
    //var str = "Có " + count + " tệp tin không hợp lệ trên tổng số " + file.length + " tệp tin đã chọn để tải lên:";
    //count  === 0 ? alert("Thành công tải " + file.length +" tệp tin lên.") : alert(str + erorrlist);
  }

  async function onChangeHandlerSRT(event) {
    var file = event.target.files[0];
    if (file) setSrt(file);
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

  const sendvideo = (madkt, dataArray) => {
    if (!ws.current) return;
    const data = JSON.stringify({
      ma_dot_kiem_tra: madkt,
      video_data: dataArray[0],
      gis_data: dataArray[1],
    });
    ws.current.send(data);
    // handleClose();
    setOpen(false);
  };

  const sendIMG = (madkt, dataArray) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        ma_dot_kiem_tra: madkt,
        multi_images_data: dataArray,
      })
    );

    // handleClose();
    setOpen(false);
  };

  const handelsubumit = async () => {
    let batdau = await getcot(BatDau);
    let ketthuc = await getcot(KetThuc);

    dispatch({
      type: actions.MODE_SHOW_VIDEO,
      data: "LIVE",
    });
    dispatch({
      type: actions.TYPE_WS_DATA,
      data: !SelectIMG ? "VIDEO" : "IMG",
    });

    dispatch({
      type: actions.TUYEN_GS,
      data: `${getTextDisplay(Tuyen, ListTuyen)} ( 
        ${batdau}
        -
        ${ketthuc} )`,
    });

    /*if (ThisDot || Dot != null) {
      Dot
        ? !SelectIMG
          ? sendvideo(Dot)
          : sendIMG(Dot)
        : !SelectIMG
        ? sendvideo(ThisDot)
        : sendIMG(Dot);
    } else {*/

    axios
      .post(urltdkt, {
        ma_tuyen: Tuyen,
        bat_dau_doan: batdau,
        ket_thuc_doan: ketthuc,
        ngay_kiem_tra: formatDate(DateDB),
        hinh_thuc_kiem_tra: "ngay",
        type: !SelectIMG ? "video" : "img",
        file: selectedFile,
        srt: Srt,
      })
      .then(
        (response) => {
          props.reload();
          setThisDot(response.data.ma_dot_kiem_tra);
          const ma_dot_kiem_tra = response.data.ma_dot_kiem_tra;

          if (SelectIMG) {
            sendIMG(ma_dot_kiem_tra, selectedFile);
          } else {
            const formData = new FormData();
            formData.append("ma_tuyen", Tuyen);
            formData.append("bat_dau_doan", batdau);
            formData.append("ket_thuc_doan", ketthuc);
            formData.append("ngay_kiem_tra", formatDate(DateDB));
            formData.append("type", !SelectIMG ? "video" : "img");
            if (!SelectIMG) {
              formData.append("video", selectedFile);
              formData.append("srt", Srt);
            } else {
              formData.append("multi_images", selectedFile);
            }
            axios({
              method: "post",
              url: `${uploadvideo}/${ma_dot_kiem_tra}`,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then(
              (response) => {
                props.reload();

                !SelectIMG
                  ? sendvideo(ma_dot_kiem_tra, response?.data)
                  : sendIMG(ma_dot_kiem_tra, response?.data);
              },
              (error) => {
                console.log(error);
              }
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );

    // }
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
              {New ? "Chọn tuyến" : ""}
            </InputLabel>
            <Select
              width="100%"
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={"Chọn tuyến"}
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
              minWidth: "23%",
              marginLeft: 10,
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              {New ? "Chọn Điểm Bắt Đầu" : ""}
            </InputLabel>
            <Select
              width="100%"
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={"Chọn Tuyến"}
              value={BatDau}
              style={{ height: 40 }}
              onChange={onChangeSelectBatDau}
            >
              <MenuItem value={null}>Trống</MenuItem>
              {ListVTT ? (
                ListVTT.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.ma_vi_tri + "|" + item.toa_do}
                    /*disabled={
                      item.ma_vi_tri + "|" + item.toa_do === KetThuc
                        ? true
                        : false
                    }*/
                  >
                    {item.ten_vi_tri}
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
              minWidth: "23%",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              {New ? "Chọn Điểm Kết Thúc" : ""}
            </InputLabel>
            <Select
              width="100%"
              className={classes.select}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={"Chọn Tuyến"}
              value={KetThuc}
              style={{ height: 40 }}
              onChange={onChangeSelectKetThuc}
            >
              <MenuItem value={null}>Trống</MenuItem>
              {ListVTT ? (
                ListVTT.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.ma_vi_tri + "|" + item.toa_do}
                    /*disabled={
                      item.ma_vi_tri + "|" + item.toa_do === BatDau
                        ? true
                        : false
                    }*/
                  >
                    {item.ten_vi_tri}
                  </MenuItem>
                ))
              ) : (
                <Loading />
              )}
            </Select>
          </FormControl>
          <>
            {/*Check box checked + button folder*/}
            {Done ? (
              <>
                {!SelectIMG ? (
                  <>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" />}
                      label="Video"
                      labelPlacement="end"
                      style={{ marginBottom: 0, marginRight: 15 }}
                      onChange={(e) => {
                        onChangeSelect2Options(e);
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
                      Video
                      <input
                        id="files"
                        // multiple
                        name="file"
                        accept="video/*"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component="label"
                      htmlFor="srt"
                      startIcon={<SaveIcon />}
                      style={{ marginLeft: 10 }}
                    >
                      SRT
                      <input
                        id="srt"
                        name="srt"
                        accept=".srt"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => onChangeHandlerSRT(e)}
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" />}
                      label="Ảnh"
                      labelPlacement="end"
                      style={{ marginBottom: 0, marginRight: 15 }}
                      checked="true"
                      onChange={(e) => {
                        onChangeSelect2Options(e);
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
                      Ảnh
                      <input
                        id="files"
                        multiple
                        name="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => onChangeHandler2(e)}
                      />
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                {!SelectIMG ? (
                  <>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" />}
                      label="Video"
                      labelPlacement="end"
                      style={{ marginBottom: 0, marginRight: 15 }}
                      onChange={(e) => {
                        onChangeSelect2Options(e);
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
                      Video
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component="label"
                      htmlFor="srt"
                      startIcon={<SaveIcon />}
                      style={{ marginLeft: 10 }}
                      disabled="true"
                    >
                      SRT
                    </Button>
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color="primary" />}
                      label="Ảnh"
                      labelPlacement="end"
                      style={{ marginBottom: 0, marginRight: 15 }}
                      checked="true"
                      onChange={(e) => {
                        onChangeSelect2Options(e);
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
                      Ảnh
                    </Button>
                  </>
                )}
              </>
            )}
            {/*Check box checked + button folder*/}
          </>
        </div>
      </>
    );
  };

  return (
    <>
      <Button
        component={"C"}
        onClick={handleClickOpen}
        style={{ float: "right" }}
      >
        Thêm ĐKTM <ImportExportIcon style={{ color: "black" }} />
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
                  label="Chọn đợt bay"
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
                    Chọn đợt bay cần bổ sung dữ liệu
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
                          {/*item.ma_dot_kiem_tra*/}
                          {item.ma_tuyen}_{item.bat_dau_doan}-
                          {item.ket_thuc_doan}_{item.ngay_kiem_tra}
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
        </DialogContent>
        <DialogActions>
          {(Done && selectedFile != null && Srt != null && !SelectIMG) ||
          (Done && selectedFile != null && SelectIMG) ? (
            <Button
              autoFocus
              component={"C"}
              onClick={handelsubumit}
              color="primary"
            >
              Gửi tệp tin
            </Button>
          ) : (
            <Button autoFocus component={"C"} color="primary">
              ...
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
