import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import UndoIcon from "@material-ui/icons/Undo";
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

export default function DialogImageShow2(props) {
  const classes = useStyles();
  const resetTransformEl = useRef(null);
  const SlideImgShow = useSelector((state) => state.SlideImgShow);
  const AllSlideShowData = useSelector((state) => state.AllSlideShowData);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: actions.SlideImgShow,
      data: { open2: false, index: 0 },
    });
  };

  const resetTransformFnc = () => {
    if (resetTransformEl.current) {
      let getresetTransformEl = document.querySelector(
        '[aria-label="resetTransform"]'
      );
      if (resetTransformEl.current === getresetTransformEl) {
        setTimeout(() => {
          getresetTransformEl.click();
        }, 0);
      }
    }
  };

  const Next = () => {
    let next = parseInt(SlideImgShow.index + 1);
    if (next < AllSlideShowData.length) {
      dispatch({
        type: actions.SlideImgShow,
        data: { open2: true, index: next, info: SlideImgShow.info },
      });
      resetTransformFnc();
    }
  };

  const Prev = () => {
    let prev = parseInt(SlideImgShow.index - 1);
    if (prev >= 0) {
      dispatch({
        type: actions.SlideImgShow,
        data: { open2: true, index: prev, info: SlideImgShow.info },
      });
      resetTransformFnc();
    }
  };

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={SlideImgShow && SlideImgShow.open2}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {SlideImgShow.index + 1}/
              {AllSlideShowData && AllSlideShowData.length} -{" "}
              {AllSlideShowData &&
                AllSlideShowData.length !== 0 &&
                AllSlideShowData[SlideImgShow.index ? SlideImgShow.index : 0] &&
                AllSlideShowData[SlideImgShow.index ? SlideImgShow.index : 0]
                  .name}
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
                {SlideImgShow.index > 0 ? (
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
                <TransformWrapper
                  defaultScale={1}
                  defaultPositionX={200}
                  defaultPositionY={100}
                >
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                      <Box
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <IconButton
                          component={"C"}
                          onClick={zoomIn}
                          aria-label="zoomIn"
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          component={"C"}
                          onClick={zoomOut}
                          aria-label="zoomOut"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          ref={resetTransformEl}
                          component={"C"}
                          onClick={resetTransform}
                          aria-label="resetTransform"
                        >
                          <UndoIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <div className={classes.boximg}>
                          <TransformComponent>
                            <img
                              id="view_img"
                              src={
                                AllSlideShowData &&
                                AllSlideShowData.length !== 0 &&
                                ChangerUrl(
                                  AllSlideShowData[
                                    SlideImgShow.index ? SlideImgShow.index : 0
                                  ].img
                                )
                              }
                              alt="view_img"
                              style={{ width: "100%", objectFit: "cover" }}
                            />
                          </TransformComponent>
                        </div>
                      </Box>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
              <div>
                {SlideImgShow.index < AllSlideShowData.length - 1 ? (
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
            {!props.hidden && (
              <Box
                flex={1}
                p={1}
                style={{ /* borderLeft: "solid 5px #1976d2",*/ color: "black" }}
              >
                <b>
                  Thông tin về ảnh{" "}
                  {AllSlideShowData &&
                    AllSlideShowData.length !== 0 &&
                    AllSlideShowData[
                      SlideImgShow.index ? SlideImgShow.index : 0
                    ] &&
                    AllSlideShowData[
                      SlideImgShow.index ? SlideImgShow.index : 0
                    ].name}
                </b>
                <br />
                <br />
                <b>Vị trí:</b> {SlideImgShow && SlideImgShow.info}
                <br />
                <br />
              </Box>
            )}
          </Box>
        </AppBar>
      </Dialog>
    </div>
  );
}
