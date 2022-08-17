import React, { useEffect, useState } from "react";
import "../../asset/css/panel.css";
import Box from "@material-ui/core/Box";
import $ from "jquery";
import Loading from "../generalObject/Loading";
import Children from "./Children";

export default function HomeDL() {
  const [height, setHeight] = useState(0);

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
        <>
          <Children />
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
}
