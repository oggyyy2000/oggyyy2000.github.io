import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "@material-ui/core";
import * as actions from "../../redux/types";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";
import DialogImageShow3 from "./slideshow-gallery/DialogImageShow3";

const useStyles = makeStyles((theme) => ({
  root: {
    "&::-webkit-scrollbar": {
      width: 20,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1976d2",
      borderRadius: 20,
      border: "6px solid transparent",
      backgroundClip: "content-box",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgb(17, 82, 147)",
    },
  },
  lihover: {
    wordBreak: "break-word",
    fontFamily: "-webkit-body",
    fontSize: "1.1rem",
    marginBottom: 5,
    border: "1px solid #d6dee1",
    padding: "1rem",
    background: "#fdfdfd",
    borderRadius: 10,
    marginLeft: 5,
    boxshadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
    height: 80,
    width: "98%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // color: "red",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
}));

export default function ListImg() {
  //-------------------------------------------------
  const Toado = useSelector((state) => state.wstoado);
  const InfoError = useSelector((state) => state.showinfoerror);
  const TuyenGS = useSelector((state) => state.tuyengs);
  const [Mode, setMode] = useState(0);
  const messagesEndRef = useRef(null);
  const classes = useStyles();

  const dispatch = useDispatch();

  /*useEffect(() => {
    if (InfoError && InfoError.value) {
      setMode(1);
    } else {
      setMode(0);
    }
  }, [InfoError]);*/

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 50);
    let temparr = [];
    Toado &&
      Toado.map((key, index) => {
        let tempobj = new Object();
        tempobj.name = Toado[index].name;
        tempobj.img = Toado[index].value;
        temparr.push(tempobj);
      });
    dispatch({
      type: actions.AllSlideShowData,
      data: temparr,
    });
  }, [Toado]);

  const SetInfo = (index, item) => {
    dispatch({
      type: actions.SlideIndex,
      data: parseInt(index),
    });

    /* dispatch({
      type: actions.SHOW_INFO_ERROR,
      data: item,
    });*/

    dispatch({
      type: actions.SlideImgShow,
      data: { open: true, index, info: TuyenGS },
    });
  };

  const Close = () => {
    setMode(0);
    dispatch({
      type: actions.SHOW_INFO_ERROR,
      data: null,
    });
  };

  return (
    <>
      {Mode === 0 ? (
        <>
          <ul
            id="img"
            className={classes.root}
            style={{
              color: "black",
              height: "55vh",
              maxHeight: "55vh",
              overflow: "scroll",
              overflowX: "hidden",
              borderTop: "solid 5px #1976d2",
              boxShadow:
                "inset 0px 11px 8px -10px #CCC, inset 0px -11px 8px -10px #CCC",
              background: "#f0f2f5",
              paddingTop: 5,
            }}
          >
            {Toado &&
              Toado.length !== 0 &&
              Toado.map((item, index) => {
                return (
                  <li
                    className={classes.lihover}
                    key={index}
                    onClick={() => SetInfo(index, item)}
                  >
                    <img
                      src={
                        item &&
                        item.value &&
                        "data:image/png;base64," + item.value
                      }
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />{" "}
                    <p style={{ color: "black", display: "inline" }}>
                      {item.name}
                    </p>
                  </li>
                );
              })}
            <li ref={messagesEndRef} />
          </ul>
          <DialogImageShow3 />
        </>
      ) : (
        <div
          style={{
            color: "black",
            height: "55vh",
            maxHeight: "55vh",
            boxShadow:
              "inset 0px 11px 8px -10px #CCC, inset 0px -11px 8px -10px #CCC",
            background: "#f0f2f5",
          }}
        >
          <div
            style={{
              wordBreak: "break-word",
              fontFamily: "-webkit-body",
              fontSize: "1.1rem",
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignContent: "center",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Button
              onClick={() => Close()}
              component={"C"}
              style={{
                background: "#f1f1f1",
                borderRadius: "0px 5px 5px 0px",
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                marginRight: 5,
              }}
            >
              <ArrowBackIcon style={{ fill: "#1976d2" }} />
            </Button>
            <b style={{ paddingRight: 5 }}>{InfoError && InfoError.name}</b>
          </div>

          <div
            className={classes.root}
            style={{
              marginTop: 5,
              overflow: "auto",
              height: "48vh",
              maxHeight: "48vh",
              position: "relative",
            }}
          >
            {InfoError && InfoError.value && (
              <TransformWrapper defaultScale={1}>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                    <center>
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
                    </center>
                    <div className="box-img">
                      <TransformComponent>
                        <img
                          src={
                            InfoError &&
                            "data:image/png;base64," + InfoError.value
                          }
                        />
                      </TransformComponent>
                    </div>
                  </React.Fragment>
                )}
              </TransformWrapper>
            )}
          </div>
        </div>
      )}
    </>
  );
}
