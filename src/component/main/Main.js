import React, { useEffect, useState, useLayoutEffect } from "react";
import Geocode from "react-geocode";
import {
  AppBar,
  Box,
  fade,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import CameraAltRoundedIcon from "@material-ui/icons/CameraAltRounded";
import EqualizerRoundedIcon from "@material-ui/icons/EqualizerRounded";
import BuildIcon from "@material-ui/icons/Build";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import $ from "jquery";
import MainAppBar from "./MainAppBar";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import { useLocation } from "react-router-dom";

Geocode.setApiKey("AIzaSyDC8AsBAx1cDfV2mNKLiICA0GfnPv9HLDE");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    padding: 0,
    margin: 0,
  },
  header: {
    // width: "100vw",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  labelContainer: {
    width: "auto",
    backgroundColor: "black",
  },
  iconLabelWrapper: {
    flexDirection: "row",
    minHeight: "auto",
    padding: 0,
    margin: 0,
  },
  labelIcon: {
    padding: 3,
    minHeight: "auto",
  },
  LinkTab: {
    padding: 0,
    margin: 0,
    width: "fit-content",
    height: "100%",
    maxHeight: "60px",
  },
  LinkTab1: {
    height: 1,
    minHeight: 50,
  },
  square: {
    height: 100,
    width: 100,
  },
}));

function a11yProps(index) {
  return {
    id: `nav-tabmain-${index}`,
    "aria-controls": `nav-tabmainpanel-${index}`,
  };
}

function LinkTab(props) {
  const classes = useStyles();

  return (
    <>
      <Tab
        className={classes.LinkTab1}
        classes={{
          labelIcon: classes.LinkTab,
          root: classes.LinkTab,
          wrapper: classes.iconLabelWrapper,
        }}
        icon={props.Icon}
        component={"C"}
        onClick={() => {
          props.setValue(props.index);
          if (props.href !== "visibility") props.navigate(props.href);
        }}
        {...props}
      />
    </>
  );
}

const Navbar = [
  {
    index: 0,
    ten_navbar: "Trang chủ",
    url: "/app/trangchu",
    icon: <HomeRoundedIcon />,
  },
  {
    index: 1,
    ten_navbar: "Quản lý đợt bay",
    url: "/app/dotbay",
    icon: <AirplanemodeActiveIcon />,
  },
  {
    index: 2,
    ten_navbar: "Đợt bay tùy chọn",
    url: "/app/nhapdulieu",
    icon: <AddCircleOutlineIcon />,
  },
  {
    index: 3,
    ten_navbar: "Quản lý thiết bị",
    url: "/app/thietbi",
    icon: <EventNoteIcon />,
  },
  {
    index: 4,
    ten_navbar: "Giám sát sức khỏe thiết bị",
    url: "/app/sktb",
    icon: <EqualizerRoundedIcon />,
  },
  {
    index: 5,
    ten_navbar: "Danh sách bất thường",
    url: "/app/dsbt",
    icon: <EqualizerRoundedIcon />,
  },
  {
    index: 6,
    ten_navbar: "Hành Lang Tuyến",
    url: "/app/m3d",
    icon: <AddCircleOutlineIcon />,
  },
  {
    index: 7,
    ten_navbar: "Camera",
    url: "/app/camera",
    icon: <CameraAltRoundedIcon />,
  },
  {
    index: 8,
    ten_navbar: "Bảo dưỡng",
    url: "/app/bando",
    icon: <BuildIcon />,
  },
  /*
  {
    index: 9,
    ten_navbar: "Quản lý ảnh",
    url: "/app/quanlyanh",
    icon: <PhotoAlbumIcon />,
  },
  {
    index: 10,
    ten_navbar: "Thống kê",
    url: "/app/thongke",
    icon: <EqualizerRoundedIcon />,
  },
  {
    index: 11,
    ten_navbar: "Phân tích dữ liệu",
    url: "/app/phantichdulieu",
    icon: <EqualizerRoundedIcon />,
  },
  */
];

function Main() {
  const classes = useStyles();
  const [value, setValue] = React.useState(4);
  const dispatch = useDispatch();
  const [Visibility, setVisibility] = useState(true);
  const [heighto, setHeighto] = useState(0);
  const pageSize = useSelector((state) => state.pageSize);

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    var path = window.location.pathname;
    var item = Navbar.find((x) => x.url === path);
    if (item) {
      setValue(item.index);
    }
  }, [location]);

  const onHideTitle = () => {
    $("#main_title").toggle();
    setHeighto(window.innerHeight - $("#header").height());
    setVisibility(!Visibility);
  };

  useEffect(() => {
    $(document).ready(function () {
      if (heighto === 0) {
        if (window.devicePixelRatio > 1.25) {
          setHeighto(window.innerHeight);
        } else {
          setHeighto(window.innerHeight - $("#header").height() - 1);
        }
      }
    });
  }, []);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.devicePixelRatio > 1.25) {
        setHeighto(window.innerHeight);
      } else {
        setHeighto(window.innerHeight - $("#header").height() - 1);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  ///// 3 view

  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.devicePixelRatio > 1.25) {
      } else {
        dispatch({
          type: actions.sizeResize,
          data: {},
        });
        setTimeout(() => {
          dispatch({
            type: actions.sizeResize,
            data: {
              width1: "55%",
              width2: "45%",
              height1: "50%",
              height2: "50%",
            },
          });
        }, 50);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  ///// image video

  useLayoutEffect(() => {
    const updateSize = () => {
      setTimeout(() => {
        let width = document.getElementsByClassName("outer")[0]
          ? document.getElementsByClassName("outer")[0].offsetWidth
          : 0;
        let height = document.getElementsByClassName("outer")[0]
          ? document.getElementsByClassName("outer")[0].offsetHeight
          : 0;
        if (pageSize.width !== width || pageSize.height !== height) {
          dispatch({
            type: actions.pageSize,
            data: {
              width: width,
              height: height,
            },
          });
        }
      }, 500);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    var path = window.location.pathname;
    var item = Navbar.find((x) => x.url === path);
    if (item) {
      setValue(item.index);
    }
  }, []);

  return (
    <Box
      id={"body"}
      style={{
        backgroundColor: "white",
        height: window.innerHeight - 1,
        overflow: "scroll",
      }}
    >
      <div
        id={"header"}
        className={classes.header}
        style={
          {
            /* width: window.innerWidth*/
          }
        }
      >
        <MainAppBar />
        <AppBar
          position="static"
          style={{
            backgroundColor: "#32408f",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <IconButton
            component={"C"}
            id="titlet-eye"
            onClick={() => onHideTitle()}
            style={{ color: "white" }}
            aria-label="delete"
          >
            {Visibility ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlined />
            )}
          </IconButton>
          <Tabs
            style={{ width: "96%" }}
            value={value}
            variant="scrollable"
            scrollButtons="auto"
          >
            {Navbar.map((item, index) => (
              <LinkTab
                suburl={item.suburl}
                label={item.ten_navbar}
                setValue={setValue}
                index={index}
                navigate={navigate}
                href={item.url}
                icon={item.icon}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </AppBar>
      </div>
      <div
        id={"section"}
        style={{
          height: heighto,
          /*overflow: "hidden",*/
          position: "relative",
          /* width: "100vw",*/
        }}
      >
        <Outlet />
      </div>
    </Box>
  );
}

export default Main;
