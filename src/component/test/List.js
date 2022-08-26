import { Typography, Card, CardContent } from "@material-ui/core";

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

const MucDoLoi = () => {
  const classes = {};
  const anhthietbiloi = useSelector((state) => state.anhthietbiloi);
  const idtuyen = useSelector((state) => state.idtuyen);
  const idthietbi = useSelector((state) => state.idthietbi);
  const dispatch = useDispatch();
  const idanh = useSelector((state) => state.idanh);

  function HandleClickDiv(event, value, loai) {
    let obj = {};
    obj.loai = loai;
    obj.mathietbi = value.ma_thiet_bi;
    dispatch({
      type: actions.idanh,
      data: obj,
    });
  }

  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ height: "100%" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          Cach dien thuy tinh:
        </Typography>

        <div
          style={{
            display: "flex",
            overflow: "auto",
            marginBottom: "2%",
            marginTop: "2%",
          }}
        >
          {anhthietbiloi[idtuyen]?.[idthietbi]?.cdtt?.map((value, index) => (
            <>
              <div
                onClick={(e) => HandleClickDiv(e, value, "cdtt")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "7%",
                  border: "1px solid black",
                  borderRadius: "13px",
                  overflow: "hidden",
                  minWidth: "7%",
                }}
              >
                <img
                  src={
                    value.mucdoondinh >= 70
                      ? noterrorinsuTT
                      : value.mucdoondinh >= 50
                      ? warninsuTT
                      : errorinsuTT
                  }
                  height={75}
                  width={40}
                />
              </div>
            </>
          ))}
        </div>

        {/* #-------------------------------------------------------- */}
        <Typography variant="h5" component="h2">
          Cach dien silicon:
        </Typography>
        <div
          style={{
            display: "flex",
            marginBottom: "2%",
            marginTop: "2%",
            overflow: "auto",
          }}
        >
          {anhthietbiloi[idtuyen]?.[idthietbi]?.cdslc?.map((value, index) => (
            <>
              <div
                onClick={(e) => HandleClickDiv(e, value, "cdslc")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "7%",
                  border: "1px solid black",
                  borderRadius: "13px",
                  overflow: "hidden",
                  minWidth: "6%",
                }}
              >
                <img
                  src={
                    value.mucdoondinh >= 70
                      ? noterrorinsuSLC
                      : value.mucdoondinh >= 50
                      ? warninsuSLC
                      : errorinsuSLC
                  }
                  height={75}
                  width={40}
                />
              </div>
            </>
          ))}
        </div>

        {/* #-------------------------------------------------------- */}
        <Typography variant="h5" component="h2">
          Duong day:
        </Typography>
        <div
          style={{
            display: "flex",
            marginBottom: "2%",
            marginTop: "2%",
            overflow: "auto",
          }}
        >
          {anhthietbiloi[idtuyen]?.[idthietbi]?.dday?.map((value, index) => (
            <>
              <div
                onClick={(e) => HandleClickDiv(e, value, "dday")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "7%",
                  border: "1px solid black",
                  borderRadius: "13px",
                  overflow: "hidden",
                  height: "45px",
                  width: "115px",
                }}
              >
                <img
                  src={
                    value.mucdoondinh >= 70
                      ? noterrorDZ
                      : value.mucdoondinh >= 50
                      ? warnDZ
                      : errorDZ
                  }
                  height={35}
                  width={100}
                />
              </div>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { MucDoLoi };
