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

export default function DialogPopup(props) {
  const urllistvideo = process.env.REACT_APP_API_URL + "getvideodetectimport/";
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
    axios({
      url: `${process.env.REACT_APP_API_URL}getallvitribytuyens?ma_tuyen=${value}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setListCot(res?.data);
    });
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
            ? ListCot.find((o) => o.ma_vi_tri === post.bat_dau_doan)
            : null;
          let KetThuc = ListCot
            ? ListCot.find((o) => o.ma_vi_tri === post.ket_thuc_doan)
            : null;
          if (BatDau !== null) {
            var jsonArg1 = new Object();
            jsonArg1.ma_vi_tri = BatDau.ma_vi_tri;
            jsonArg1.toa_do = BatDau.toa_do;
            pluginArrayArg.push(jsonArg1);
          }
          if (KetThuc !== null) {
            var jsonArg2 = new Object();
            jsonArg2.ma_vi_tri = KetThuc.ma_vi_tri;
            jsonArg2.toa_do = KetThuc.toa_do;
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

  const GetListVideo = () => {
    async function getDataListImg() {
      let urlg = urllistvideo + props.id;
      try {
        setIsLoading(true);
        setIsError(false);

        dispatch({
          type: actions.CURRENT_VIDEO,
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
          return res.data;
        }
        return undefined;
      } catch (err) {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    }

    getDataListImg().then((res) => {
      if (res) {
        // console.log(res);

        dispatch({
          type: actions.CURRENT_VIDEO,
          data: res && res,
        });
        setIsLoading(false);
      }
    });
  };

  // ------------ Redux Start ------------
  const CurrentVideo = useSelector((state) => state.currentVideo);

  const dispatch = useDispatch();
  // ------------ Redux End ------------
  const classes = useStyles();

  const handleClickOpen = () => {
    GetListVideo();
    dispatch({
      type: actions.MODE_SHOW_VIDEO,
      data: "Video",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setIdVideo = (id) => {
    dispatch({
      type: actions.ON_CURRENT_ID_VIDEO_CHANGE,
      data: id,
    });
    handleClose();
  };

  const renderListVideo = (item, index, name = "") => {
    return (
      <ImageListItem
        key={index}
        cols={1}
        style={{
          borderRadius: "15px",
          marginRight: "10px",
          paddingRight: "10px",
          background: "blue",
          margin: "10px",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: 15,
            left: 12,
            color: "white",
            fontSize: "25px",
            wordBreak: "break-all",
          }}
        >
          {name.replace(".mp4", "")}

          <Button
            component={"C"}
            onClick={() => setIdVideo(item)}
            style={{
              color: "black",
              left: 6,
            }}
          >
            <PlayCircleFilledIcon
              style={{ color: "lightblue", fontSize: 95 }}
            />
          </Button>
        </p>
      </ImageListItem>
    );
  };

  const handleClickbtn = () => {
    dispatch({
      type: actions.SlideVideoShow,
      data: { open: true, index: 0 },
    });
    handleClose();
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
          {CurrentVideo &&
            undefined !== CurrentVideo &&
            Object.keys(CurrentVideo) &&
            undefined !== Object.keys(CurrentVideo) &&
            Object.keys(CurrentVideo).length !== 0 && (
              <Button
                component={"C"}
                onClick={() => handleClickbtn()}
                className={classes.btnhover}
              >
                Xem nhanh
              </Button>
            )}
          {open && (
            <>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {CurrentVideo &&
                  undefined !== CurrentVideo &&
                  Object.keys(CurrentVideo).length !== 0 ? (
                    <ImageList
                      rowHeight={160}
                      className={classes.imageList}
                      cols={4}
                    >
                      {Object.keys(CurrentVideo).map((key, index) =>
                        renderListVideo(CurrentVideo[key], index, key)
                      )}
                    </ImageList>
                  ) : !isError ? (
                    "Không có dữ liệu"
                  ) : (
                    "Lỗi khi thực hiện lấy dữ liệu"
                  )}
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
