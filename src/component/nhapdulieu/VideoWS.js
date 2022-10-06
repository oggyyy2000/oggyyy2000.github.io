import React, { useState, useEffect, useContext } from "react";
import Loading from "../generalObject/Loading";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import { WSContext } from "../main/contexts/WSContext";
import SlideshowGallery from "../generalObject/slideshow-gallery/SlideshowGallery";

const VideoWS = () => {
  const [Lists, setLists] = useState([]);
  const [Listtd, setListtd] = useState([]);
  const [MainIMG, setMainIMG] = useState(null);
  const [Count, setCount] = useState(0);
  const [FirstError, setFirstError] = useState(0);

  const Typewsdata = useSelector((state) => state.typewsdata);

  const { ws } = useContext(WSContext);

  const dispatch = useDispatch();

  const getstt = (str) => {
    var STT = str.substring(str.lastIndexOf("_") + 1, str.lastIndexOf("."));
    return STT;
  };

  const getsttimgshow = (str) => {
    var STT = str.substring(0, str.indexOf("_"));
    return STT;
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    try {
      if (!ws.current) return;
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        let temparr = [];
        let toadoarr = [];
        for (var k in data.data) {
          let tempobj = new Object();
          tempobj.name = k;
          tempobj.value = data.data[k][0];
          let obj2 = new Object();
          //
          obj2.value = data.data[k][0];
          //
          obj2.latitude = data.data[k][1].latitude;
          obj2.longtitude = data.data[k][1].longtitude;
          obj2.error = data.data[k][2];
          temparr.push(tempobj);
          // temp
          if (obj2.error && obj2.error.length !== 0 && toadoarr.length === 0) {
            toadoarr.push(obj2);
          }
        }
        if (Typewsdata !== "IMG") {
          temparr.sort((a, b) =>
            parseInt(getstt(a.name)) > parseInt(getstt(b.name))
              ? 1
              : parseInt(getstt(b.name)) > parseInt(getstt(a.name))
              ? -1
              : 0
          );
        }

        if (Typewsdata !== "IMG") {
          setLists(temparr);
        } else {
          let tmpmerge = [...Lists, ...temparr];
          tmpmerge.sort((a, b) =>
            parseInt(getsttimgshow(a.name)) >
            parseInt(getsttimgshow(getstt(b.name)))
              ? 1
              : parseInt(getsttimgshow(b.name)) >
                parseInt(getsttimgshow(getstt(a.name)))
              ? -1
              : 0
          );
          setLists(tmpmerge);
        }

        let tempCount = Count + temparr.length;
        let Stock_FPS = 12;
        let mergearr = [...Listtd];
        if (
          (FirstError + tempCount) % (Stock_FPS * 2) === 0 ||
          FirstError === 0
        ) {
          const unique = Array.from(new Set(toadoarr.map(JSON.stringify))).map(
            JSON.parse
          );
          if (toadoarr.length !== 0 && FirstError === 0) {
            setFirstError(tempCount);
          }
          dispatch({
            type: actions.WS_TOA_DO2,
            data: unique,
          });

          mergearr = [...Listtd, ...toadoarr];
        }

        const uniquelog = Array.from(new Set(mergearr.map(JSON.stringify))).map(
          JSON.parse
        );

        setListtd(uniquelog);

        setCount(tempCount);
      };
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    if (Typewsdata !== "IMG") {
      dispatch({
        type: actions.WS_TOA_DO,
        data: Listtd,
      });
    } else {
      dispatch({
        type: actions.WS_TOA_DO,
        data: Lists,
      });
    }
  }, [Listtd]);

  async function RunImg(start) {
    for (let i = start; i < Lists.length; i++) {
      setMainIMG(Lists[i].value);

      await sleep(1000 / 4);
    }
  }

  useEffect(() => {
    if (Typewsdata !== "IMG") {
      RunImg(0);
    }
  }, [Lists]);

  return (
    <>
      {Lists.length !== 0 ? (
        Typewsdata !== "IMG" ? (
          <img
            src={"data:image/jpeg;base64," + MainIMG}
            style={{
              /*height: "100%",*/ width: "100%",
              objectFit: "cover",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        ) : (
          <>
            <SlideshowGallery
              input={Lists}
              // ratio={`3:2`}
              ratio={`5:2`}
              // mode={`automatic`}
              // timeout={`3000`}
              type={"base64"}
            />
          </>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default VideoWS;
