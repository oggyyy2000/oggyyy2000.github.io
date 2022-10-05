import React, { useState, useEffect, useRef } from "react";
import "./slideshow-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/types";
import { ChangerUrl } from "../../../util/ChangeUrl";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();

  const top = 50; //+ rand();
  const left = 50; // + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    position: "absolute",
    width: "80%",
    height: "80%",
    backgroundColor: theme.palette.background.paper,
    //border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },
}));

const SlideshowGallery = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({ slideIndex: 0 });
  const [containerElm, setcontainerElm] = useState(0);
  const [containerBottomElm, setcontainerBottomElm] = useState(0);
  const [modalStyle] = React.useState(getModalStyle);
  const refcontainerElm = useRef(null);
  const refcontainerBottomElm = useRef(null);
  const ratioWHArray = props.ratio.split(":");
  const ratioWH = ratioWHArray[0] / ratioWHArray[1];
  const idx = useSelector((state) => state.slideIndex);
  const [open, setOpen] = React.useState(false);
  const { type } = props;

  const getNewSlideIndex = (step) => {
    const slideIndex = state.slideIndex;
    const numberSlide = props.input.length;

    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  };

  const backward = () => {
    setState({
      slideIndex: getNewSlideIndex(-1),
    });
  };

  const forward = () => {
    setState({
      slideIndex: getNewSlideIndex(1),
    });
  };

  const setSlideIndex = (index) => {
    setState({
      slideIndex: index,
    });
  };

  const HandleOpenClick = (index) => {
    setSlideIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    if (
      idx &&
      typeof idx === "number" &&
      idx >= 0 &&
      idx <= props.input.length
    ) {
      setSlideIndex(idx);
    } else {
      setSlideIndex(0);
    }
  }, [idx]);

  const updateDimensions = () => {
    if (refcontainerElm.current) {
      setcontainerElm(refcontainerElm.current.offsetWidth / ratioWH);
    }
    if (refcontainerBottomElm.current) {
      setcontainerBottomElm(
        refcontainerBottomElm.current.offsetWidth / props.input.length / ratioWH
      );
    }
  };

  /* const runAutomatic = () => {
    setState({
      slideIndex: getNewSlideIndex(1),
    });
  };*/
  /*
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    let automaticInterval;
    if (props.mode === "automatic") {
      const timeout = props.timeout || 5000;

      automaticInterval = setInterval(
        () => runAutomatic(),
        Number.parseInt(timeout)
      );
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (automaticInterval) clearInterval(automaticInterval);
    };
  }, [props.input]);*/

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    let automaticInterval;
    /*if (props.mode === "automatic") {
      const timeout = props.timeout || 5000;

      automaticInterval = setInterval(
        () => runAutomatic(),
        Number.parseInt(timeout)
      );
    }*/

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (automaticInterval) {
        clearInterval(automaticInterval);
      }
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  console.log(type);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <center>
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <Box>
                <IconButton
                  component={"C"}
                  onClick={zoomIn}
                  aria-label="delete"
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  component={"C"}
                  onClick={zoomOut}
                  aria-label="delete"
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  component={"C"}
                  onClick={resetTransform}
                  aria-label="delete"
                >
                  <UndoIcon />
                </IconButton>
              </Box>
              <Box>
                <div className="box-img">
                  <TransformComponent>
                    <img
                      id="view_img"
                      src={`${process.env.REACT_APP_API_URL}${
                        props.input[state.slideIndex]
                      }`}
                      style={{ width: "100%", objectFit: "cover" }}
                      alt="view_img"
                    />
                  </TransformComponent>
                </div>
              </Box>
            </React.Fragment>
          )}
        </TransformWrapper>
      </center>
    </div>
  );

  return (
    <>
      <div className="lp-slideshow-gallery">
        {/*<div
        className="container"
        style={{ height: containerElm }}
        ref={refcontainerElm}
      >
        <div className="slide active">
          <div className="number-text">
            {`${state.slideIndex + 1} / ${props.input.length}`}
          </div>
          <img
            className="image"
            src={
               `${
                process.env.REACT_APP_API_URL
              }${props.input[state.slideIndex]}`
            }
            alt="image"
          />
        </div>

        <span className="prev" onClick={backward}>
          ❮
        </span>
        <span className="next" onClick={forward}>
          ❯
        </span>
      </div>*/}

        {
          <div
            className="container-bottom"
            style={
              type !== "day_dien"
                ? { height: containerBottomElm }
                : { height: containerBottomElm, flexDirection: "column" }
            }
            ref={refcontainerBottomElm}
          >
            {props.input.map((image, index) => {
              return (
                <>
                  <img
                    key={index}
                    src={
                      /*ChangerUrl(image)*/ `${process.env.REACT_APP_API_URL}${image}`
                    }
                    alt={index}
                    className={`image ${
                      state.slideIndex === index ? "active" : "active"
                    }`}
                    onClick={() => HandleOpenClick(index)}
                    style={{
                      width:
                        type !== "day_dien"
                          ? `${(1 / props.input.length) * 100}%`
                          : "100%",
                      height: `100%`,
                      marginTop: type !== "day_dien" ? "0px" : "5px",
                    }}
                  />
                </>
              );
            })}
          </div>
        }
      </div>

      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
};
export default SlideshowGallery;
