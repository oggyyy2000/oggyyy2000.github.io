import { Typography, Card, CardContent, CardHeader } from "@material-ui/core";

// icon thiet bi loi
import errorinsuTT from "./icon/error_insuTT.png";
import errorinsuSLC from "./icon/error_insuSLC.png";
import errorDZ from "./icon/error_DZ.png";
// icon thiet bi muc canh bao
import warninsuTT from "./icon/warn_insuTT.png";
import warninsuSLC from "./icon/warn_insuSLC.png";
import warnDZ from "./icon/warn_DZ.png";
// icon thiet bi binh thuong
import noterrorinsuTT from "./icon/not_error_insuTT.png";
import noterrorinsuSLC from "./icon/not_error_insuSLC.png";
import noterrorDZ from "./icon/not_error_DZ.png";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import Box from "@material-ui/core/Box";

const MucDoLoi = () => {
  const classes = {};
  const anhthietbiloi = useSelector((state) => state.anhthietbiloi);
  const idtuyen = useSelector((state) => state.idtuyen);
  const idthietbi = useSelector((state) => state.idthietbi);
  const dispatch = useDispatch();
  const idanh = useSelector((state) => state.idanh);

  function HandleClickDiv(value, loai) {
    let obj = {};
    obj.loai = loai;
    obj.ma_thiet_bi = value.ma_thiet_bi;
    dispatch({
      type: actions.idanh,
      data: obj,
    });
  }

  let findbykeyinarray = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (Object.keys(array[i])[0] == value) {
        return array[i];
      }
    }
  };

  const classItem = ["cach_dien_silicon", "cach_dien_thuy_tinh", "day_dien"];

  const RenderItem0 = () => {
    let data = anhthietbiloi?.data || [];
    let item = findbykeyinarray(data, idthietbi);
    if (item) {
      let inneritem = item[Object.keys(item)[0]];
      if (inneritem[classItem[0]])
        return (
          <Box>
            <Typography variant="h5" component="h2">
              {inneritem[classItem[0]] ? classItem[0] : ""}
            </Typography>
            <div
              style={{
                display: "flex",
                overflow: "auto",
                marginBottom: "5px",
                marginTop: "5px",
              }}
            >
              {inneritem[classItem[0]]
                ? inneritem[classItem[0]].map((value, index) => (
                    <>
                      <div
                        key={value.ma_thiet_bi}
                        onClick={(e) => HandleClickDiv(value, classItem[0])}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: "7%",
                          border: "1px solid black",
                          borderRadius: "13px",
                          overflow: "hidden",
                          width: "fit-content",
                          padding: "10px",
                        }}
                      >
                        <img
                          src={
                            value.trang_thai === "1_normal"
                              ? noterrorinsuSLC
                              : value.trang_thai === "2_defect_detected"
                              ? warninsuSLC
                              : errorinsuSLC
                          }
                          height={55}
                          width={20}
                        />
                      </div>
                    </>
                  ))
                : ""}
            </div>
          </Box>
        );
    }
  };

  const RenderItem1 = () => {
    let data = anhthietbiloi?.data || [];
    let item = findbykeyinarray(data, idthietbi);
    if (item) {
      let inneritem = item[Object.keys(item)[0]];
      if (inneritem[classItem[1]])
        return (
          <Box>
            <Typography variant="h5" component="h2">
              {inneritem[classItem[1]] ? classItem[1] : ""}
            </Typography>
            <div
              style={{
                display: "flex",
                overflow: "auto",
                marginBottom: "5px",
                marginTop: "5px",
              }}
            >
              {inneritem[classItem[1]]
                ? inneritem[classItem[1]].map((value, index) => (
                    <>
                      <div
                        key={value.ma_thiet_bi}
                        onClick={(e) => HandleClickDiv(value, classItem[1])}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: "7%",
                          border: "1px solid black",
                          borderRadius: "13px",
                          overflow: "hidden",
                          width: "fit-content",
                          padding: "10px",
                        }}
                      >
                        <img
                          src={
                            value.trang_thai === "1_normal"
                              ? noterrorinsuTT
                              : value.trang_thai === "2_defect_detected"
                              ? warninsuTT
                              : errorinsuTT
                          }
                          height={55}
                          width={20}
                        />
                      </div>
                    </>
                  ))
                : ""}
            </div>
          </Box>
        );
    }
  };

  const RenderItem2 = () => {
    let data = anhthietbiloi?.data || [];
    let item = findbykeyinarray(data, idthietbi);
    if (item) {
      let inneritem = item[Object.keys(item)[0]];
      if (inneritem[classItem[2]])
        return (
          <Box>
            <Typography variant="h5" component="h2">
              {inneritem[classItem[2]] ? classItem[2] : ""}
            </Typography>
            <div
              style={{
                display: "flex",
                overflow: "auto",
                marginBottom: "5px",
                marginTop: "5px",
              }}
            >
              {inneritem[classItem[2]]
                ? inneritem[classItem[2]].map((value, index) => (
                    <>
                      <div
                        key={value.ma_thiet_bi}
                        onClick={(e) => HandleClickDiv(value, classItem[2])}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: "7%",
                          border: "1px solid black",
                          borderRadius: "13px",
                          overflow: "hidden",
                          width: "fit-content",
                          padding: "10px",
                        }}
                      >
                        <img
                          src={
                            value.trang_thai === "1_normal"
                              ? noterrorDZ
                              : value.trang_thai === "2_defect_detected"
                              ? warnDZ
                              : errorDZ
                          }
                          height={15}
                          width={80}
                        />
                      </div>
                    </>
                  ))
                : ""}
            </div>
          </Box>
        );
    }
  };

  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ height: "100%" }}
    >
      <CardHeader title={`Vị Trí: ${idthietbi}`} style={{ padding: 6 }} />
      <CardContent
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        {RenderItem0()}
        {RenderItem1()}
        {RenderItem2()}
      </CardContent>
    </Card>
  );
};

export { MucDoLoi };
