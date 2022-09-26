import React from "react";
import BCNGay from "./BCNgay";

export default function BC(props) {
  const post = props.data ? props.data : "";
  /////
  const obj1 = props.obj1 ? props.obj1 : "";
  const obj2 = props.obj2 ? props.obj2 : "";
  const obj3 = props.obj3 ? props.obj3 : "";
  const obj4 = props.obj4 ? props.obj4 : "";
  //////
  return (
    <>
      {post.hinh_thuc_kiem_tra === "ngay" ? (
        <BCNGay data={post} obj1={obj1} obj2={obj2} obj3={obj3} obj4={obj4} />
      ) : (
        ""
      )}
    </>
  );
}
