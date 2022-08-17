import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/types";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Loading from "../Loading";
// data
import { T1 } from "../../../util/toado/T1";
import { T2 } from "../../../util/toado/T2";
import { T3 } from "../../../util/toado/T3";
import { T4 } from "../../../util/toado/T4";
import { T5 } from "../../../util/toado/T5";
import { T6 } from "../../../util/toado/T6";
import { T7 } from "../../../util/toado/T7";
import { T8 } from "../../../util/toado/T8";
///////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
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
  imageList: {
    width: "50vw",
    height: "90%",
    display: "flex",
    justifyContent: "center",
  },
  lihover: {
    wordBreak: "break-word",
    fontFamily: "-webkit-body",
    fontSize: "1.1rem",
    boxshadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
    border: "solid 2px #f1f3f4",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
  btnhover: {
    border: "2px solid white",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
}));

const DialogTitle = withStyles(useStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ display: "inline" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          component={"C"}
          className={classes.closeButton}
          onClick={onClose}
          style={{ float: "right" }}
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

export default function DialogPopupNormal(props) {
  const urlanh = process.env.REACT_APP_API_URL + "imagedkt/";
  const [ListCot, setListCot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const post = props.post;

  const Resset_Cot = () => {
    dispatch({ type: actions.ON_CURRENT_LIST_COT_CHANGE, data: [] });
  };

  const Change_List_Cot = (value) => {
    Resset_Cot();
    switch (value) {
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
    }
  };

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
            : null;
          let KetThuc = ListCot
            ? ListCot.find((o) => o.cot === post.ket_thuc_doan)
            : null;
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

  const GetImg = () => {
    async function getDataListImg() {
      let urlg = urlanh + props.id + "/";
      try {
        setIsLoading(true);
        setIsError(false);
        dispatch({
          type: actions.CURRENT_VIDEO_NORMAL,
          data: [],
        });
        let res = await axios({
          url: urlg,
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          //   console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    }

    getDataListImg().then((res) => {
      if (res) {
        //console.log(res);
        dispatch({
          type: actions.CURRENT_VIDEO_NORMAL,
          data: res && res,
        });
        setIsLoading(false);
      }
    });
  };

  // ------------ Redux Start ------------
  const currentVideoNormal = useSelector((state) => state.currentVideoNormal);

  const dispatch = useDispatch();
  // ------------ Redux End ------------
  const classes = useStyles();

  const handleClickOpen = () => {
    GetImg();
    dispatch({
      type: actions.MODE_SHOW_VIDEO,
      data: "Normal",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getid = (data) => {
    var x = "_";
    var y = ".";
    var id =
      data.indexOf(x) >= 0 && data.indexOf(y) >= 0
        ? data.substring(
            data.indexOf(x) + x && undefined !== x && x.length,
            data.indexOf(y)
          )
        : data;
    return id;
  };

  const setIdVideo = (id) => {
    dispatch({
      type: actions.ON_CURRENT_ID_VIDEO_CHANGE,
      data: id,
    });
    handleClose();
  };

  let ListVideo = [];

  const renderListVideo = (item, index) => {
    if (item) {
      const id = getid(item.img_name);
      const ru = ListVideo.indexOf(id);
      if (ru === -1) ListVideo.push(id);
      return (
        <ImageListItem key={index} cols={1}>
          <img
            src={"data:image/jpeg;base64," + item.img_data}
            alt={item.img_name}
            style={{
              objectFit: "cover",
            }}
          />
          <p
            style={{
              position: "absolute",
              top: 15,
              left: 15,
              color: "white",
              fontSize: "25px",
            }}
          >
            {"Video: " + index}{" "}
            <Button
              component={"C"}
              onClick={() => setIdVideo(getid(id))}
              style={{
                color: "white",
              }}
            >
              <PlayCircleFilledIcon style={{ color: "blue", fontSize: 95 }} />
            </Button>
          </p>
        </ImageListItem>
      );
    }
  };

  const rernder = () => {
    try {
      return (
        <>
          {currentVideoNormal && undefined !== currentVideoNormal ? (
            <ImageList rowHeight={160} className={classes.imageList} cols={4}>
              {currentVideoNormal.map((item, index) =>
                renderListVideo(item, index)
              )}
            </ImageList>
          ) : !isError ? (
            "Không có dữ liệu"
          ) : (
            "Lỗi khi thực hiện lấy dữ liệu"
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        component={"C"}
        onClick={() => handleClickOpen()}
        className={classes.btnhover}
      >
        Xem video <VideoLibraryIcon style={{ color: "black" }} />
      </Button>
      <Dialog
        onClose={handleClose}
        maxWidth={false}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          atyle={{ color: "black" }}
          onClose={handleClose}
        >
          Lựa chọn video hiện thị
        </DialogTitle>
        <DialogContent dividers>
          {open && <>{isLoading ? <Loading /> : rernder()} </>}
        </DialogContent>
      </Dialog>
    </>
  );
}
