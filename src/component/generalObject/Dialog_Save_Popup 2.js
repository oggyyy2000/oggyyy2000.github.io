import React, { useState, useEffect, useContext } from "react";
//-----------------------------------------
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
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
//-----------------------------------------
// data
/*
import { T1 } from "../../util/toado/T1";
import { T2 } from "../../util/toado/T2";
import { T3 } from "../../util/toado/T3";
import { T4 } from "../../util/toado/T4";
import { T5 } from "../../util/toado/T5";
import { T6 } from "../../util/toado/T6";
import { T7 } from "../../util/toado/T7";
import { T8 } from "../../util/toado/T8";*/
///////////////////////////////////////////
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import { WSContext } from "../main/contexts/WSContext";
import { getTextDisplay } from "../../util/GetTenTuyen";
import axios from "axios";

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
  btnhover: {
    border: "2px solid white",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  btnhover: {
    border: "2px solid white",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
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

export default function DialogSavePopup2(props) {
  const [open, setOpen] = useState(false);
  const [SelectForder, setSelectForder] = useState(false);
  const [selectedFile, SetSelectedFile] = useState(null);
  const [SelectIMG, setSelectIMG] = useState(false);
  const [Srt, setSrt] = useState(null);
  const [ListCot, setListCot] = useState([]);
  const dispatch = useDispatch();
  const urlvt = `${process.env.REACT_APP_API_URL}getallvitribytuyens?${
    props?.ma_tuyen ? "&ma_tuyen=" + props?.ma_tuyen : "&none=0"
  }`;

  const classes = useStyles();

  const post = props.post;

  const { ws, connect, disconnect, connectIMG } = useContext(WSContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    disconnect();
  };

  const Resset_Cot = () => {
    dispatch({ type: actions.ON_CURRENT_LIST_COT_CHANGE, data: [] });
  };

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

  const Change_List_Cot = (value) => {
    Resset_Cot();
    getDatavtt().then((res) => setListCot(res));
    /*switch (value) {
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
    // disconnect();
    if (open == true && !SelectIMG) {
      connect();
    } else if (open == true && SelectIMG) {
      connectIMG();
    } else {
      disconnect();
    }
  }, [open, SelectIMG]);

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && open) {
        Change_List_Cot(post.ma_tuyen);
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, [open]);

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && open) {
        try {
          var pluginArrayArg = new Array();
          let BatDau = ListCot
            ? ListCot.find((o) => o.cot === post.bat_dau_doan)
            : "";
          let KetThuc = ListCot
            ? ListCot.find((o) => o.cot === post.ket_thuc_doan)
            : "";
          if (BatDau !== null) {
            var jsonArg1 = new Object();
            jsonArg1.cot = BatDau.cot;
            jsonArg1.toa_do_vi_tri = BatDau.x + "," + BatDau.y;
            pluginArrayArg.push(jsonArg1);
          }
          if (KetThuc !== null) {
            var jsonArg2 = new Object();
            jsonArg2.cot = KetThuc.cot;
            jsonArg2.toa_do_vi_tri = KetThuc.x + "," + KetThuc.y;
            pluginArrayArg.push(jsonArg2);
          }
          var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
          dispatch({
            type: actions.ON_CURRENT_TUYEN_CHANGE,
            data: post.ma_tuyen,
          });
          dispatch({
            type: actions.ON_CURRENT_LIST_COT_CHANGE,
            data: jsonArray,
          });
        } catch (e) {
          //console.log(e);
        }
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, [ListCot]);

  const onChangeSelectOptions = (e) => {
    e.target.checked ? setSelectForder(true) : setSelectForder(false);
  };

  const onChangeSelect2Options = (e) => {
    e.target.checked ? setSelectIMG(true) : setSelectIMG(false);
    SetSelectedFile(null);
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

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
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

  async function onChangeHandler(event) {
    var file = await convertBase64(event.target.files[0]);
    //if (file) {
    console.log(file);
    SetSelectedFile(file);
    //}
    // alert("video ok");
  }

  async function onChangeHandlerSRT(event) {
    var file = await convertBase64(event.target.files[0]);
    console.log(file);
    //if (file)
    setSrt(file);
    //alert("srt ok");
  }

  const sendvideo = (madkt) => {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        ma_dot_kiem_tra: madkt,
        video_data: selectedFile,
        gis_data: Srt,
      })
    );
    dispatch({
      type: actions.MODE_SHOW_VIDEO,
      data: "LIVE",
    });

    dispatch({
      type: actions.TYPE_WS_DATA,
      data: "VIDEO",
    });
    dispatch({
      type: actions.TUYEN_GS,
      data: `${getTextDisplay(post.ma_tuyen)} ( 
      ${post.bat_dau_doan}
      -
      ${post.ket_thuc_doan} )`,
    });
    //handleClose();
    setOpen(false);
  };

  const sendIMG = (madkt) => {
    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        ma_dot_kiem_tra: madkt,
        multi_images_data: selectedFile,
      })
    );
    dispatch({
      type: actions.MODE_SHOW_VIDEO,
      data: "LIVE",
    });
    dispatch({
      type: actions.TYPE_WS_DATA,
      data: "IMG",
    });
    dispatch({
      type: actions.TUYEN_GS,
      data: `${getTextDisplay(post.ma_tuyen)} ( 
        ${post.bat_dau_doan}
        -
        ${post.ket_thuc_doan} )`,
    });
    // handleClose();
    setOpen(false);
  };

  const handelsubumit = async () => {
    !SelectIMG
      ? sendvideo(post.ma_dot_kiem_tra)
      : sendIMG(post.ma_dot_kiem_tra);
  };

  const renderchoice = () => {
    return (
      <>
        <div style={{ margin: "10px", width: "25vw" }}>
          {SelectForder ? (
            <>
              {" "}
              {/* 
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
                  </Button>*/}
            </>
          ) : (
            <>
              {/*
              <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="Chọn thư mục"
                    labelPlacement="end"
                    style={{ marginBottom: 0, marginRight: 15 }}
                    onChange={(e) => {
                      onChangeSelectOptions(e);
                    }}
                  />*/}
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
                      //  multiple
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
                  {" "}
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
          )}
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
        className={classes.btnhover}
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
          Thêm dữ liệu video {post.ma_tuyen}_{post.bat_dau_doan}-
          {post.ket_thuc_doan}_{post.ngay_kiem_tra}
        </DialogTitle>
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            {renderchoice()}
          </form>
        </DialogContent>
        <DialogActions>
          {(!SelectIMG && selectedFile !== null && Srt !== null) ||
          (SelectIMG && selectedFile !== null) ? (
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
