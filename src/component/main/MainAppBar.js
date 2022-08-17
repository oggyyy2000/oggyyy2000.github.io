import React, { useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthenContext } from "./contexts/AuthenContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    padding: 0,
    margin: 0,
  },
  grow: {
    flexGrow: 1,
    justifyContent: "flex-end",
    display: "flex",
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
    maxWidth: "80%",
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

export default function MainAppBar(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { LogOut } = useContext(AuthenContext);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const ModeShowVideo = useSelector((state) => state.modeshowvideo);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClick = () => {
    handleMenuClose();
    navigate("/app/thongtincanhan");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleClick()}>Thông tin cá nhân</MenuItem>
      <MenuItem onClick={() => LogOut()}>Đăng Xuất</MenuItem>
    </Menu>
  );

  // ẩn thanh active khi không liên quan

  useEffect(() => {
    var falsecolor = "RGB(193, 197, 221)";
    var truecolor = "RGB(255, 255, 255)";
    var path = window.location.pathname;
    if (path === "/app/thongtincanhan" || path === "/app/") {
      if (document.querySelector("[aria-selected=true]")) {
        document.querySelector("[aria-selected=true]").style.color = falsecolor;
        document.getElementsByClassName("MuiTabs-indicator")[0].style.display =
          "none";
      }
    } else {
      if (document.querySelector("[aria-selected=true]")) {
        document.querySelector("[aria-selected=true]").style.color = truecolor;
        document.getElementsByClassName("MuiTabs-indicator")[0].style.display =
          "block";
      }
    }
    // chuyển hướng ra trang chủ nếu ở app
    if (path === "/app/") {
      navigate("/app/trangchu", { replace: true });
    }
  });

  //---------------------------------------------

  return (
    <>
      <Helmet>
        <title>
          Hệ thống kiểm tra, giám sát và phát hiện bất thường TB, ĐZ lưới cao
          thế 110 kV
        </title>
      </Helmet>
      {ModeShowVideo !== "LIVE" && (
        <div id={"main_title"} className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h3" Wrap>
                Hệ thống kiểm tra, giám sát và phát hiện bất thường TB, ĐZ lưới
                cao thế 110 kV
              </Typography>
              <div className={classes.grow}>
                <>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    component={"C"}
                  >
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    component={"C"}
                  >
                    <AccountCircle />
                  </IconButton>{" "}
                </>
              </div>
              {/*
            <div className={classes.sectionDesktop}>
              {ModeShowVideo !== "LIVE" ? (
                <>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    component={"C"}
                  >
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    component={"C"}
                  >
                    <AccountCircle />
                  </IconButton>{" "}
                </>
              ) : (
                ""
              )}
            </div>*/}
            </Toolbar>
          </AppBar>
          {renderMenu}
        </div>
      )}
    </>
  );
}
