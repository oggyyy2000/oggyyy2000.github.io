import React, { useEffect, useState } from "react";

import Geocode from "react-geocode";
import "../../asset/css/View3_bando.css";
import "../../asset/css/main.css";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Toolbar,
} from "@material-ui/core";
import TreeItem from "@material-ui/lab/TreeItem";
//import { fetchPostList, url } from "../../constants/jsContants";
import { useSelector } from "react-redux";

import { TreeView } from "@material-ui/lab";
import RoomIcon from "@material-ui/icons/Room";
import VideocamIcon from "@material-ui/icons/Videocam";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import PropTypes from "prop-types";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import $ from "jquery";

Geocode.setApiKey("AIzaSyDC8AsBAx1cDfV2mNKLiICA0GfnPv9HLDE");

const cameraData1 = [
  {
    ma_camera: "camera1",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera2",
    ten_camera: "23235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera3",
    ten_camera: "16345 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera4",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera5",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera6",
    ten_camera: "44165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera7",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera8",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera9",
    ten_camera: "165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera10",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera11",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera12",
    ten_camera: "165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera13",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera14",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera15",
    ten_camera: "165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera16",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera17",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera18",
    ten_camera: "165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera19",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera20",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera21",
    ten_camera: "165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera22",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera23",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera24",
    ten_camera: "165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera25",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera26",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera27",
    ten_camera: "165 Cột cờ Hà Nội",
  },
  {
    ma_camera: "camera28",
    ten_camera: "Ngã ba Cổ Nhuế",
  },
  {
    ma_camera: "camera29",
    ten_camera: "235 Ngã tư Phủ Lý",
  },
  {
    ma_camera: "camera30",
    ten_camera: "165 Cột cờ Hà Nội",
  },
];

const data = [
  {
    _id: {
      $oid: "6071581cc011ac5064de07d3",
    },
    ma_tuyen: "171e39-171e10.2",
    ten_tuyen: "Thanh Oai - Vân Đình",
    camera: [
      {
        ma_camera: "camera1",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera2",
        ten_camera: "23235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera3",
        ten_camera: "16345 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07d4",
    },
    ma_tuyen: "172e10.2-171e24.4",
    ten_tuyen: "Vân Đình - Phủ Lý",
    camera: [
      {
        ma_camera: "camera4",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera5",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera6",
        ten_camera: "44165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07d5",
    },
    ma_tuyen: "172e23-171e24",
    ten_tuyen: "Vân Trì - Hải Bối",
    camera: [
      {
        ma_camera: "camera7",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera8",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera9",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07d6",
    },
    ma_tuyen: "172e54-176e35",
    ten_tuyen: "Hoà Lạc - Sơn Tây",
    camera: [
      {
        ma_camera: "camera10",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera11",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera12",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07d7",
    },
    ma_tuyen: "173e10.5-172e10.6-175e1.35",
    ten_tuyen: "Phúc Thọ - Sơn Tây",
    camera: [
      {
        ma_camera: "camera13",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera14",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera15",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07d8",
    },
    ma_tuyen: "174e4-172e37",
    ten_tuyen: "Hà Đông - Bắc An Khánh",
    camera: [
      {
        ma_camera: "camera16",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera17",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera18",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07d9",
    },
    ma_tuyen: "175T500TT-176E1.39",
    ten_tuyen: "Thường Tín - Thanh Oai",
    camera: [
      {
        ma_camera: "camera19",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera20",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera21",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07da",
    },
    ma_tuyen: "177e50-171e10.6",
    ten_tuyen: "Quốc Oai - Phú Thọ",
    camera: [
      {
        ma_camera: "camera22",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera23",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera24",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07db",
    },
    ma_tuyen: "181e1-171e41",
    ten_tuyen: "Long Biên - Mai Lâm",
    camera: [
      {
        ma_camera: "camera25",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera26",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera27",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
  {
    _id: {
      $oid: "6071581cc011ac5064de07dc",
    },
    ma_tuyen: "181e6-171e21",
    ten_tuyen: "Chèm - Nhật Tân",
    camera: [
      {
        ma_camera: "camera28",
        ten_camera: "Ngã ba Cổ Nhuế",
      },
      {
        ma_camera: "camera29",
        ten_camera: "235 Ngã tư Phủ Lý",
      },
      {
        ma_camera: "camera30",
        ten_camera: "165 Cột cờ Hà Nội",
      },
    ],
  },
];

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    height: "100%",
  },
  box: {
    paddingRight: 5,
    height: "100%",
  },
  treeview: {
    height: "auto",
    flexGrow: 1,
    maxWidth: "auto",
    color: "black",
  },
  treeview2: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  playAllVideo: {
    margin: 10,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Transition1 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Camera() {
  // State
  const [spacing, setSpacing] = useState(0);
  const [ListTuyen, setListTuyen] = useState([]);
  const Data = useSelector((state) => state.currentError);
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);
  const [cameraData, setCameraData] = useState(cameraData1);
  const [characters, updateCharacters] = useState(cameraData1);
  const [open, setOpen] = React.useState(false);
  const [openFullScreen, setOpenFullScreen] = React.useState(false);
  const [currentFullScreenVideo, setCurrentFullScreenVideo] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (state) => {
    setOpen(false);
    if (state) {
      updateCharacters(cameraData);
    }
  };
  const handleClickOpenFullScreen = (value) => {
    setCurrentFullScreenVideo(value);
    setOpenFullScreen(true);
    // alert(currentFullScreenVideo);
    startVideo("1");
  };

  const handleCloseFullScreen = () => {
    setOpenFullScreen(false);
  };

  const startVideo = (index) => {
    // event.preventDefault()
    try {
      navigator.getUserMedia(
        {
          video: true,
        },
        (stream) => {
          let video = document.getElementById("app__videofeed" + index);
          if (video) {
            video.srcObject = stream;
          }
        },
        (err) => console.error(err)
      );
      // alert('app__videofeed' + index)
      let button = document.getElementById("btnStart" + index);
      if (button) {
        button.style.display = "none";
        button = document.getElementById("btnStop" + index);
        button.style.display = "block";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const stopVideo = (index) => {
    setPlaying(false);
    let video = document.getElementById("app__videofeed" + index);
    video.srcObject.getTracks()[0].stop();
    let button = document.getElementById("btnStart" + index);
    button.style.display = "block";
    button = document.getElementById("btnStop" + index);
    button.style.display = "none";
  };

  useEffect(() => {
    //fetchPostList(url + "/htld/tuyen", setListTuyen, 0);
  }, []);

  useEffect(() => {
    characters.map((value, index) => {
      startVideo(value.ma_camera);
    });
  }, []);

  useEffect(() => {
    // startVideo('1')
  }, []);

  const StyledTreeItemOnlclick = (item) => {
    updateCharacters(item);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  const onDeleteItem = (value) => {
    // alert(value)
    const temp = characters.filter((item, index) => {
      if (item.ma_camera !== value) return item;
    });
    updateCharacters(temp);
  };
  return (
    <Grid container className={classes.root}>
      <Grid style={{ height: "100%" }} item xs={12}>
        <Grid style={{ height: "100%" }} container justify="center" spacing={0}>
          <Grid
            style={{ backgroundColor: "white", paddingLeft: 2, height: "100%" }}
            xs={12}
            sm={2}
            key={1}
            item
          >
            <Box boxShadow={2} className={classes.box}>
              <TreeView
                className={classes.treeview}
                defaultExpanded={["3"]}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
              >
                {data.map((item, index) => (
                  <StyledTreeItem
                    onDoubleClick={() => StyledTreeItemOnlclick(item.camera)}
                    color={"black"}
                    nodeId={index}
                    labelText={item.ten_tuyen}
                    labelIcon={RoomIcon}
                  >
                    {item.camera.map((item2, index2) => (
                      <StyledTreeItem
                        nodeId={index + "-" + index2}
                        labelText={item2.ten_camera}
                        labelIcon={VideocamIcon}
                      />
                    ))}
                  </StyledTreeItem>
                ))}
              </TreeView>

              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.playAllVideo}
                startIcon={<VideocamIcon />}
                onClick={handleClickOpen}
              >
                Phát toàn bộ
              </Button>
            </Box>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => handleClose(false)}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Cảnh báo"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Việc bạn chọn xem tất cả video có thể dẫn đến hiện tượng giật
                  lác
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(false)} color="primary">
                  Quay lại
                </Button>
                <Button onClick={() => handleClose(true)} color="primary">
                  Đồng ý
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid
            className={classes.griditem2}
            style={{ height: "100%" }}
            xs={12}
            sm={10}
            key={2}
            item
          >
            <Grid container className={classes.root}>
              <Grid style={{ height: "100%" }} item xs={12}>
                <Grid
                  className={"characters"}
                  container
                  justify="center"
                  spacing={spacing}
                  style={{ height: "100%", overflow: "auto" }}
                >
                  {characters.map((value, index) => (
                    <div
                      id={value.ma_camera}
                      style={{
                        backgroundColor: "#282828",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "33%",
                        margin: 1,
                        height: 380,
                      }}
                      className={classes.paper}
                    >
                      <b
                        id={"cam_title"}
                        style={{
                          color: "white",
                          height: "7%",
                        }}
                      >
                        {value.ma_camera} - {value.ten_camera}
                      </b>
                      <div
                        style={{
                          width: "100%",
                          backgroundColor: "gray",
                          height:
                            `calc(100% - ` +
                            ($("#cam_title").height() +
                              $("#cam_list_button").height()) +
                            `px)`,
                        }}
                      >
                        <video
                          height={"100%"}
                          width={"100%"}
                          muted
                          autoPlay
                          id={"app__videofeed" + value.ma_camera}
                          className={"app__videofeed"}
                        ></video>
                      </div>
                      <div
                        id={"cam_list_button"}
                        style={{
                          display: "flex",
                          width: "100%",
                          padding: 4,
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="default"
                          onClick={() => handleClickOpenFullScreen(value)}
                          startIcon={<FullscreenIcon />}
                        >
                          Ful
                        </Button>
                        <Button
                          id={"btnStart" + value.ma_camera}
                          variant="contained"
                          onClick={() => startVideo(value.ma_camera)}
                          color="primary"
                        >
                          Phát
                        </Button>
                        <Button
                          id={"btnStop" + value.ma_camera}
                          style={{ display: "none" }}
                          onClick={() => stopVideo(value.ma_camera)}
                          variant="contained"
                          color="secondary"
                        >
                          Dừng
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => onDeleteItem(value.ma_camera)}
                          startIcon={<DeleteIcon />}
                        >
                          Del
                        </Button>
                      </div>
                    </div>
                  ))}
                </Grid>
                <Dialog
                  fullScreen
                  open={openFullScreen}
                  onClose={handleCloseFullScreen}
                  TransitionComponent={Transition1}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseFullScreen}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                        {currentFullScreenVideo.ma_camera} -{" "}
                        {currentFullScreenVideo.ten_camera}
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <div
                    style={{
                      width: "100%",
                      height: "85vh",
                      backgroundColor: "black",
                    }}
                  >
                    <video
                      style={{ backgroundColor: "black" }}
                      height={"100%"}
                      width={"100%"}
                      muted
                      autoPlay
                      id={"app__videofeed1"}
                      className={"app__videofeed"}
                    ></video>
                  </div>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Camera;
