import React, { useEffect, useState } from "react";
//import "../../../asset/css/stream_video.css";
//import 'video-react/dist/video-react.css';
import Loading from "../generalObject/Loading";
import { useDispatch, useSelector } from "react-redux";
//-----------------------------------
import { makeStyles } from "@material-ui/core/styles";
//----------------------------------
import * as actions from "../../redux/types";
//----------------------------------
import {
  ReactPictureAnnotation,
  defaultShapeStyle,
  DefaultInputSection,
} from "react-picture-annotation";
import VideoWS from "../nhapdulieu/VideoWS";
import { ChangerUrl } from "../../util/ChangeUrl";
import SlideshowGallery from "../generalObject/slideshow-gallery/SlideshowGallery";

const useStyles = makeStyles((theme) => ({
  formControl: {},
  selectEmpty: {
    padding: theme.spacing(0.3),
    color: "white",
    minWidth: 300,
  },
  BtnContainer: {
    width: 85,
    display: "flex",
    justifyContent: "space-between",
  },
  margin: {
    marginRight: 5,
  },
  framevideo: {
    height: "100%",
    width: "100%",
    backgroundColor: "green",
  },
  mainvideo: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: "0",
    alignItems: "flex-end",
    "&:hover": {
      cursor: "pointer",
      "& $controls": {
        display: "block",
      },
    },
  },
  controls: {
    backgroundColor: "rgba(0, 0, 0, .5)",
    height: "100%",
    width: "100%",
    display: "none",
  },
  btnfullview: {
    right: 10,
    position: "absolute",
  },
}));

export default function MainVideoT() {
  // ------------ Redux Start ------------
  const currentVideoNormal = useSelector((state) => state.currentVideoNormal);
  const DetectVideo = useSelector((state) => state.detectVideo);
  const IDVideo = useSelector((state) => state.idvideo);
  const ModeShowVideo = useSelector((state) => state.modeshowvideo);
  // const currentVideoImage = useSelector((state) => state.currentVideoImage);
  const AllSlideShowData = useSelector((state) => state.AllSlideShowData);
  const pageSize = useSelector((state) => state.pageSize);
  // const ws = props.ws;

  //const [Lists, setLists] = useState([]);

  const dispatch = useDispatch();
  // ------------ Redux End ------------
  const classes = useStyles();

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const generate_token = (length) => {
    var a =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  };

  const getid = (data) => {
    var x = "_";
    var y = ".";
    var id =
      data.indexOf(x) >= 0 && data.indexOf(y) >= 0
        ? data.substring(data.indexOf(x) + x.length, data.indexOf(y))
        : data;
    return id;
  };

  const check = (id) => {
    return IDVideo === "ALL" ? true : IDVideo === getid(id) ? true : false;
  };

  async function RunImg() {
    if (ModeShowVideo === "Normal") {
      if (currentVideoNormal) {
        for (let i = 0; i < currentVideoNormal.length; i++) {
          let boxess = [];
          var data = new Object();
          if (check(currentVideoNormal[i].img_name)) {
            for (let j = 0; j < currentVideoNormal[i].label_info.length; j++) {
              var tempjson = new Object();
              tempjson.id = generate_token(12);
              tempjson.mark = new Object();
              // convert x0y0 x1y1 => x,y,width,height
              var originX = currentVideoNormal[i].label_info[j].bbox[0];
              tempjson.mark.x = parseInt(originX);
              var originY = currentVideoNormal[i].label_info[j].bbox[1];
              tempjson.mark.y = parseInt(originY);
              var widthb =
                currentVideoNormal[i].label_info[j].bbox[2] - originX;
              tempjson.mark.width = widthb;
              var heightb =
                currentVideoNormal[i].label_info[j].bbox[3] - originY;
              tempjson.mark.height = heightb;
              tempjson.mark.type = "RECT";
              tempjson.comment = currentVideoNormal[i].label_info[j].label;
              boxess.push(tempjson);
            }
            data.image = currentVideoNormal[i].img_data;
            data.idata = boxess;
            dispatch({
              type: actions.ON_DETECT_VIDEO,
              data: data,
            });
            await sleep(1000);
          }
          // 1000 / 5 work
        }
      }
    }
  }

  useEffect(() => {
    RunImg();
  }, [currentVideoNormal]);

  //--------------------------

  /* const [pageSize, setPageSize] = useState({
    width: document.getElementsByClassName("outer")[0]
      ? document.getElementsByClassName("outer")[0].offsetWidth
      : 0,
    height: document.getElementsByClassName("outer")[0]
      ? document.getElementsByClassName("outer")[0].offsetHeight
      : 0,
  });*/

  const onResize = () => {
    let width = document.getElementsByClassName("outer")[0]
      ? document.getElementsByClassName("outer")[0].offsetWidth
      : 0;
    let height = document.getElementsByClassName("outer")[0]
      ? document.getElementsByClassName("outer")[0].offsetHeight
      : 0;
    if (pageSize.width !== width || pageSize.height !== height) {
      // setPageSize({ width: width, height: height });
      dispatch({
        type: actions.pageSize,
        data: {
          width: width,
          height: height,
        },
      });
    }
  };

  useEffect(() => {
    onResize();
  }, []);

  useEffect(() => {
    let data = DetectVideo;
    setTimeout(() => {
      dispatch({
        type: actions.ON_DETECT_VIDEO,
        data: data,
      });
    }, 50);
  }, [pageSize]);

  const onSelect = (selectedId) => {
    /*console.log(selectedId)*/
  };
  const onChange = (data) => {
    /*console.log(data)*/
  };

  // useEffect(() => {}, [currentVideoImage]);

  //-------------------------
  return (
    <div
      className="outer"
      style={{ background: "black", height: "100%", width: "100%" }}
    >
      {ModeShowVideo === "Normal" &&
        (DetectVideo ? (
          <div className={classes.mainvideo}>
            <ReactPictureAnnotation
              image={"data:image/jpeg;base64," + DetectVideo.image}
              onSelect={onSelect}
              onChange={onChange}
              width={pageSize.width}
              height={pageSize.height}
              annotationStyle={{
                ...defaultShapeStyle,
                shapeStrokeStyle: "#2193ff",
                transformerBackground: "black",
              }}
              annotationData={DetectVideo.idata}
              inputElement={(value, onChange, onDelete) => (
                <DefaultInputSection
                  placeholder={"Nhãn"}
                  {...{ value, onChange, onDelete }}
                />
              )}
            />
          </div>
        ) : (
          <div
            style={{
              padding: "15%",
            }}
          >
            <Loading />
          </div>
        ))}
      {ModeShowVideo === "Live" && <VideoWS />}
      {ModeShowVideo === "Video" && (
        <video
          style={{ width: "100%", height: "100%" }}
          controls
          autoPlay
          type="video/mp4"
          src={ChangerUrl(IDVideo)}
        ></video>
      )}
      {ModeShowVideo === "SlideShow" && (
        <SlideshowGallery input={AllSlideShowData} ratio={`5:2`} />
      )}
    </div>
  );
}
