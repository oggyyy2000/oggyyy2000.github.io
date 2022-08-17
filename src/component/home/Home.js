import React, { useEffect, useState } from "react";
import "../../asset/css/panel.css";
import { Resize, ResizeHorizon, ResizeVertical } from "react-resize-layout";
//import Map from "../generalObject/Map_Item";
import Map from "../main/Map";
import DotBay from "./dotbayhome";
import Box from "@material-ui/core/Box";
import $ from "jquery";
import Loading from "../generalObject/Loading";
import MainVideoT from "./Video";
import { useSelector } from "react-redux";

export default function Home() {
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
        <Loading />
      )}
    </Box>
  );
}
