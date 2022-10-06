import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/types";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import DialogImageShow from "../slideshow-gallery/DialogImageShow";
import Loading from "../Loading";
import { ChangerUrl } from "../../../util/ChangeUrl";
// data
/*
import { T1 } from "../../../util/toado/T1";
import { T2 } from "../../../util/toado/T2";
import { T3 } from "../../../util/toado/T3";
import { T4 } from "../../../util/toado/T4";
import { T5 } from "../../../util/toado/T5";
import { T6 } from "../../../util/toado/T6";
import { T7 } from "../../../util/toado/T7";
import { T8 } from "../../../util/toado/T8";*/
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

export default function DialogPopupImage(props) {
  const urllistanh = process.env.REACT_APP_API_URL + "getimagesdetectimport/";
  const [ListCot, setListCot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const post = props.post;

  const dispatch = useDispatch();

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

  // ------------ Redux Start ------------
  const currentVideoImage = useSelector((state) => state.currentVideoImage);

  const GetListIMG = () => {
    async function getDataListImg() {
      let urlg = urllistanh + props.id;
      try {
        setIsLoading(true);
        setIsError(false);
        dispatch({
          type: actions.CURRENT_VIDEO_IMAGE,
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

        //   return res.data;
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
          type: actions.CURRENT_VIDEO_IMAGE,
          data: res && res,
        });
        let temparr = [];
        res &&
          undefined !== res &&
          res.length !== 0 &&
          Object.keys(res) &&
          undefined !== Object.keys(res) &&
          Object.keys(res).length !== 0 &&
          Object.keys(res).map((key, index) => {
            let tempobj = new Object();
            tempobj.name = key;
            tempobj.img = res[key];
            temparr.push(tempobj);
          });
        dispatch({
          type: actions.AllSlideShowData,
          data: temparr,
        });

        setIsLoading(false);
      }
    });
  };

  // ------------ Redux End ------------
  const classes = useStyles();

  const handleClickOpen = () => {
    GetListIMG();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imgclick = (index) => {
    dispatch({
      type: actions.SlideImgShow,
      data: { open: true, index, info: props.info },
    });
  };

  return (
    <>
      <Button
        component={"C"}
        onClick={() => handleClickOpen()}
        className={classes.btnhover}
      >
        Xem ảnh <VideoLibraryIcon style={{ color: "black" }} />
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
          Lựa chọn ảnh hiện thị
        </DialogTitle>
        <DialogContent dividers>
          {open && (
            <>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <ul
                    style={{
                      listStyle: "none",
                    }}
                  >
                    {currentVideoImage &&
                    undefined !== currentVideoImage &&
                    Object.keys(currentVideoImage) &&
                    undefined !== Object.keys(currentVideoImage) &&
                    Object.keys(currentVideoImage).length !== 0
                      ? Object.keys(currentVideoImage).map((key, index) => (
                          <>
                            <li
                              key={index}
                              className={classes.lihover}
                              onClick={() => imgclick(index)}
                            >
                              <img
                                src={ChangerUrl(currentVideoImage[key])}
                                style={{ width: "100px", objectFit: "cover" }}
                              />
                              <b style={{ margin: 5 }}>
                                {key.replace(".jpg", "")}
                              </b>
                            </li>
                          </>
                        ))
                      : !isError
                      ? "Không có dữ liệu"
                      : "Lỗi khi thực hiện lấy dữ liệu"}
                  </ul>
                  <DialogImageShow />
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
