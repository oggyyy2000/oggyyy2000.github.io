import React, { useState } from "react";
import {
  ReactPictureAnnotation,
  defaultShapeStyle,
} from "react-picture-annotation";

import img from "../../img/cbimage.png";

import { useSelector } from "react-redux";

const IMGSHOW = () => {
  const ex1 = {
    comment: "cotdonthan",
    id: "raB9KeGPCuW5",
    mark: {
      height: 565,
      type: "RECT",
      width: 135,
      x: 500,
      y: 11,
    },
  };

  const ex2 = {
    comment: "cachdientt",
    id: "nbmg59W4JuDL",
    mark: {
      height: 74,
      type: "RECT",
      width: 232,
      x: 268,
      y: 119,
    },
  };

  const ex3 = {
    comment: "tacr",
    id: "zVzy1qHRZRJl",
    mark: {
      height: 22,
      type: "RECT",
      width: 52,
      x: 883,
      y: 459,
    },
  };

  const ex4 = {
    comment: "cachdientt",
    id: "37IBJ8YrBbZH",
    mark: {
      height: 27,
      type: "RECT",
      width: 139,
      x: 607,
      y: 443,
    },
  };

  const [ann, setAnn] = useState([ex1, ex2, ex3, ex4]);

  const Redux_imginfo = useSelector((state) => state.imginfo);

  const onSelect = (selectedId) => {};
  const onChange = (data) => {
    //  console.log(data);
    setAnn(data);
  };
  const imagePath = Redux_imginfo.hinh_anh_data
    ? Redux_imginfo.hinh_anh_data
    : img;
  //console.log(imagePath);

  return (
    <div className="App">
      <ReactPictureAnnotation
        image={imagePath}
        onSelect={onSelect}
        onChange={onChange}
        scrollSpeed={0}
        width={1000}
        height={600}
        annotationStyle={{
          ...defaultShapeStyle,
          shapeStrokeStyle: "#FF9E80",
          transformerBackground: "black",
          lineWidth: 5,
          fontBackground: "#9f82ff",
        }}
        annotationData={ann}
      />
    </div>
  );
};

export default IMGSHOW;
