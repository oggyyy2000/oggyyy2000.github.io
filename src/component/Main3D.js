import React from "react";
import { Pannellum, PannellumVideo } from "pannellum-react";
import myImage1 from "./data_360/1.jpg";
//import myVideo from "./data_360/videoplayback.mp4";
import myVideo from "./data_360/project.mp4";

export default function Main3D() {
  return (
    <>
      {/* 
      <Pannellum
        width="100%"
        height="500px"
        image={myImage1}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        onLoad={() => {
          console.log("panorama loaded");
        }}
      ></Pannellum> */}
      <PannellumVideo
        video={myVideo}
        loop
        width="100%"
        height="600px"
        pitch={10}
        //yaw={180}
        yaw={0}
        hfov={140}
        minHfov={50}
        maxHfov={180}
      ></PannellumVideo>
    </>
  );
}
