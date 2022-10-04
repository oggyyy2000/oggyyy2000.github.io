import React, { useEffect, useState } from "react";
import "../../asset/css/panel.css";
import { Resize, ResizeHorizon, ResizeVertical } from "react-resize-layout";
import Box from "@material-ui/core/Box";
import $ from "jquery";
import Loading from "../generalObject/Loading";
import { useSelector } from "react-redux";
import ChartDSBT from "./ChartDSBT";
import DotBay from "./nhapdulieu";
import DataFetching from "./DataFetching";
import Map_Item from "./Map_Item";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [height, setHeight] = useState(0);
  const sizeResize = useSelector((state) => state.sizeResize);

  const navigate = useNavigate();

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
            <Resize handleWidth="10px" handleColor="#f1f1f1">
              <ResizeVertical height={sizeResize.height1} id="dotbay">
                <button
                  className="btnRedict"
                  onClick={() => navigate("/app/dsbt")}
                >
                  <ChartDSBT />
                </button>
              </ResizeVertical>
              <ResizeVertical height={sizeResize.height2} id="map">
                <button
                  className="btnRedict"
                  onClick={() => navigate("/app/test")}
                >
                  <DataFetching />
                </button>
              </ResizeVertical>
            </Resize>
          </ResizeHorizon>
          <ResizeHorizon minWidth="200px" width={sizeResize.width2}>
            <Resize handleWidth="10px" handleColor="#f1f1f1">
              <ResizeVertical height={sizeResize.height1} id="dotbay">
                <button
                  className="btnRedict"
                  onClick={() => navigate("/app/thietbi")}
                >
                  <Map_Item />
                </button>
              </ResizeVertical>
              <ResizeVertical height={sizeResize.height2} id="map">
                <button
                  className="btnRedict"
                  onClick={() => navigate("/app/nhapdulieu")}
                >
                  <DotBay />
                </button>
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
