import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "@material-ui/core";
import * as actions from "../../redux/types";
import Loading from "./Loading";

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
    color: "red",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
}));

export default function Log() {
  //-------------------------------------------------
  const Toado = useSelector((state) => state.wstoado);
  const InfoError = useSelector((state) => state.showinfoerror);
  const [Mode, setMode] = useState(0);
  const messagesEndRef = useRef(null);
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (InfoError && InfoError.value) {
      setMode(1);
    } else {
      setMode(0);
    }
  }, [InfoError]);

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
  }, [Toado]);

  const SetInfo = (data) => {
    setMode(1);
    dispatch({
      type: actions.SHOW_INFO_ERROR,
      data: data,
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
        <ul
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
          {Toado && Toado.length !== 0 ? (
            Toado.map((item, index) => {
              return (
                <li
                  className={classes.lihover}
                  key={index}
                  onClick={() => SetInfo(item)}
                >
                  <p style={{ color: "black", display: "inline" }}>Tọa độ </p>
                  <b style={{ color: "black", display: "inline" }}>
                    {item.latitude && item.latitude},{" "}
                    {item.longtitude && item.longtitude}
                  </b>
                  <br />
                  <WarningIcon style={{ fill: "red" }} />
                  <p style={{ color: "black", display: "inline" }}>
                    Bất thường:{" "}
                  </p>
                  {item.error &&
                    item.error.map((value, idx) => {
                      return item.error.length < idx ? (
                        <b key={idx} style={{ color: "red" }}>
                          {value.error_label},{" "}
                        </b>
                      ) : (
                        <b key={idx} style={{ color: "red" }}>
                          {value.error_label}{" "}
                        </b>
                      );
                    })}
                </li>
              );
            })
          ) : (
            <Loading />
          )}
          <li ref={messagesEndRef} />
        </ul>
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
              }}
            >
              <ArrowBackIcon style={{ fill: "#1976d2" }} />
            </Button>{" "}
            Vị trí:{" "}
            <b>
              {InfoError && InfoError.latitude},{" "}
              {InfoError && InfoError.longtitude}
            </b>
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
            <b
              style={{
                padding: 5,
                paddingBottom: 0,
                wordBreak: "break-word",
                fontFamily: "-webkit-body",
                fontSize: "1.1rem",
              }}
            >
              Chi tiết bất thường:
            </b>
            <br />
            {InfoError &&
              InfoError.error &&
              InfoError.error.length !== 0 &&
              InfoError.error.map((value, idx) => {
                return (
                  <div
                    style={{
                      wordBreak: "break-word",
                      fontFamily: "-webkit-body",
                      fontSize: "1.1rem",
                      marginBottom: 5,
                      border: "3px solid red",
                      padding: "1rem",
                      background: "#fdfdfd",
                      marginLeft: 5,
                      marginRight: 5,
                      borderRadius: 10,
                      boxshadow:
                        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
                    }}
                  >
                    <img
                      src={
                        value && "data:image/png;base64," + value.error_img_dtls
                      }
                      style={{
                        width: "50%",
                        objectFit: "cover",
                        marginLeft: 10,
                        border: "2px solid red",
                        verticalAlign: "middle",
                      }}
                    />

                    <p
                      style={{
                        padding: "1px 10px 0",
                        wordBreak: "break-word",
                        fontFamily: "-webkit-body",
                        fontSize: "1.1rem",
                        verticalAlign: "middle",
                        display: "inline",
                      }}
                    >
                      <b style={{ color: "red" }}>{value.error_label} </b>
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
