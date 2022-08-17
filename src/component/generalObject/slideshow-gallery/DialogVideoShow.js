import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/types";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { ChangerUrl } from "../../../util/ChangeUrl";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  imageList: {
    width: "50vw",
    height: "90%",
    display: "flex",
    justifyContent: "center",
  },
  boximg: {
    background: "#f1f0f5",
  },
  Iconlarge: {
    "& svg": {
      fontSize: 35,
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogVideoShow() {
  const classes = useStyles();
  const resetTransformEl = useRef(null);
  const SlideVideoShow = useSelector((state) => state.SlideVideoShow);
  const CurrentVideo = useSelector((state) => state.currentVideo);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: actions.SlideVideoShow,
      data: { open: false, index: 0 },
    });
  };

  const Next = () => {
    let next = parseInt(SlideVideoShow.index + 1);
    if (next < Object.keys(CurrentVideo).length) {
      dispatch({
        type: actions.SlideVideoShow,
        data: { open: true, index: next },
      });
    }
  };

  const Prev = () => {
    let prev = parseInt(SlideVideoShow.index - 1);
    if (prev >= 0) {
      dispatch({
        type: actions.SlideVideoShow,
        data: { open: true, index: prev },
      });
    }
  };

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={SlideVideoShow && SlideVideoShow.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {SlideVideoShow && SlideVideoShow.index + 1}/
              {CurrentVideo && Object.keys(CurrentVideo).length}
            </Typography>
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
          <Box
            display="flex"
            bgcolor="background.paper"
            style={{
              flexWrap: "wrap",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                borderBottom: "solid 5px #1976d2",
              }}
            >
              <div>
                {SlideVideoShow.index > 0 ? (
                  <IconButton
                    component={"C"}
                    onClick={Prev}
                    aria-label="prev"
                    className={classes.Iconlarge}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    component={"C"}
                    aria-label="prev"
                    disabled={true}
                    className={classes.Iconlarge}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                )}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <video
                  style={{ width: "100%" }}
                  controls
                  autoPlay
                  type="video/mp4"
                  src={ChangerUrl(
                    CurrentVideo[
                      Object.keys(CurrentVideo)[
                        SlideVideoShow.index ? SlideVideoShow.index : 0
                      ]
                    ]
                  )}
                ></video>
              </div>
              <div>
                {SlideVideoShow.index < Object.keys(CurrentVideo).length - 1 ? (
                  <IconButton
                    component={"C"}
                    onClick={Next}
                    aria-label="next"
                    className={classes.Iconlarge}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    component={"C"}
                    aria-label="next"
                    disabled={true}
                    className={classes.Iconlarge}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                )}
              </div>
            </Box>
          </Box>
        </AppBar>
      </Dialog>
    </div>
  );
}
