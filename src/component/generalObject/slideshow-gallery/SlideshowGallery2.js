import React, { useState, useEffect, useRef } from "react";
import "./slideshow-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/types";
import { ChangerUrl } from "../../../util/ChangeUrl";

const SlideshowGallery = (props) => {
  const [state, setState] = useState({ slideIndex: 0 });
  const [containerElm, setcontainerElm] = useState(0);
  const [containerBottomElm, setcontainerBottomElm] = useState(0);
  const refcontainerElm = useRef(null);
  const refcontainerBottomElm = useRef(null);
  const ratioWHArray = props.ratio.split(":");
  const ratioWH = ratioWHArray[0] / ratioWHArray[1];
  const idx = useSelector((state) => state.slideIndex);
  const type = props.type;

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

  useEffect(() => {
    if (idx && typeof idx === "number" && idx >= 0 && idx <= props.input.length)
      setSlideIndex(idx);
    else setSlideIndex(0);
  }, [idx]);

  const updateDimensions = () => {
    if (refcontainerElm.current)
      setcontainerElm(refcontainerElm.current.offsetWidth / ratioWH);
    if (refcontainerBottomElm.current)
      setcontainerBottomElm(
        refcontainerBottomElm.current.offsetWidth / props.input.length / ratioWH
      );
  };

  const runAutomatic = () => {
    setState({
      slideIndex: getNewSlideIndex(1),
    });
  };

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
  }, [props.input]);

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
  }, []);

  return (
    <div className="lp-slideshow-gallery">
      <div
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
            src={ChangerUrl(props.input[state.slideIndex])}
            alt="image"
          />
        </div>

        <span className="prev" onClick={backward}>
          ❮
        </span>
        <span className="next" onClick={forward}>
          ❯
        </span>
      </div>

      {
        <div
          className="container-bottom"
          style={{ height: containerBottomElm }}
          ref={refcontainerBottomElm}
        >
          {props.input.map((image, index) => {
            return (
              <img
                key={index}
                src={ChangerUrl(image)}
                alt={index}
                className={`image ${
                  state.slideIndex === index ? "active" : ""
                }`}
                onClick={() => setSlideIndex(index)}
                style={{
                  width: `${(1 / props.input.length) * 100}%`,
                  height: `100%`,
                }}
              />
            );
          })}
        </div>
      }
    </div>
  );
};
export default SlideshowGallery;
