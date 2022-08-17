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

import DataFetching from "./DataFetching";

const MucDoLoi = () => {
  const classes = {};
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
          <div
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
            <img src={noterrorinsuTT} height={75} width={40} />
          </div>
          <div
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
            <img src={warninsuTT} height={75} width={40} />
          </div>
          <div
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
            <img src={errorinsuTT} height={75} width={40} />
          </div>
          <div
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
            <img src={errorinsuTT} height={75} width={40} />
          </div>
          <div
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
            <img src={noterrorinsuTT} height={75} width={40} />
          </div>
          <div
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
            <img src={warninsuTT} height={75} width={40} />
          </div>
          <div
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
            <img src={errorinsuTT} height={75} width={40} />
          </div>
          <div
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
            <img src={errorinsuTT} height={75} width={40} />
          </div>
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
          <div
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
            <img src={errorinsuSLC} height={75} width={40} />
          </div>
          <div
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
            <img src={errorinsuSLC} height={75} width={40} />
          </div>
          <div
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
            <img src={noterrorinsuSLC} height={75} width={40} />
          </div>
          <div
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
            <img src={errorinsuSLC} height={75} width={40} />
          </div>
          <div
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
            <img src={warninsuSLC} height={75} width={40} />
          </div>
          <div
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
            <img src={errorinsuSLC} height={75} width={40} />
          </div>
          <div
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
            <img src={noterrorinsuSLC} height={75} width={40} />
          </div>
          <div
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
            <img src={warninsuSLC} height={75} width={40} />
          </div>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={errorDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={errorDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={noterrorDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={errorDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={errorDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={warnDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={noterrorDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={errorDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "7%",
              border: "1px solid black",
              borderRadius: "13px",
              overflow: "hidden",
              minWidth: "10%",
              minHeight: "10%",
            }}
          >
            <img
              src={warnDZ}
              height={35}
              width={60}
              style={{ marginTop: "9%", marginBottom: "9%" }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { MucDoLoi };

const ThongTinTBLoi = () => {
  return (
    <Card variant="outlined" style={{ height: "389px", overflow: "auto" }}>
      <CardContent>
        <CardHeader title="THÔNG TIN THIẾT BỊ" />
        <DataFetching />
      </CardContent>
    </Card>
  );
};

export { ThongTinTBLoi };

const AnhTBLoi = () => {
  return (
    <Card variant="outlined" style={{ height: "100%" }}>
      <CardContent>
        <CardHeader title={"Ảnh thiết bị lỗi"} />
      </CardContent>
    </Card>
  );
};

export { AnhTBLoi };
