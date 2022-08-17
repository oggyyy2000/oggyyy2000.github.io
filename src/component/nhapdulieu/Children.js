import React, { useEffect, useState } from "react";
import { Resize, ResizeHorizon, ResizeVertical } from "react-resize-layout";
import MainVideoT from "../home/Video";
import DotBay from "./nhapdulieu";
//import Map from "../generalObject/Map_Item";
import Map from "../main/Map";
import FullViewMap from "../FullViewMap";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Loading from "../generalObject/Loading";
import $ from "jquery";

export default function Children() {
  const ModeShowVideo = useSelector((state) => state.modeshowvideo);
  const [height, setHeight] = useState(0);
  const sizeResize = useSelector((state) => state.sizeResize);

  const func = () => {
    setHeight($("#TrangChuContainer").height());
  };

  useEffect(() => {
    $(document).ready(function () {
      setTimeout(func, 50);
    });
  }, []);

  return (
    <Box
      id={"TrangChuContainer"}
      style={{ height: "100%", position: "relative" }}
    >
      {height ? (
        ModeShowVideo !== "LIVE" ? (
          <Resize handleWidth="10px" handleColor="#f1f1f1">
            <ResizeHorizon width={sizeResize.width1} className="video">
              <DotBay />
            </ResizeHorizon>
            <ResizeHorizon
              minWidth="200px"
              width={sizeResize.width2}
              id="map_and_log"
            >
              <Resize handleWidth="10px" handleColor="#f1f1f1">
                <ResizeVertical height={sizeResize.height1} id="dotbay">
                  <MainVideoT />
                </ResizeVertical>
                <ResizeVertical height={sizeResize.height2} id="map">
                  <Map />
                </ResizeVertical>
              </Resize>
            </ResizeHorizon>
          </Resize>
        ) : (
          <>
            <FullViewMap />
          </>
        )
      ) : (
        <Loading />
      )}
    </Box>
  );
}
