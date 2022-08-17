import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import PhotoIcon from "@material-ui/icons/Photo";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
//---------------------------------------------------
import Map_Item from "../generalObject/Map_Item";
import Waiting from "../generalObject/Waiting";

const Detail = () => {
  const Redux_imginfo = useSelector((state) => state.imginfo);
  const [value, setValue] = useState("none");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleUpdate = () => {
    alert(value);
  };

  const renderData = (str) => {
    var temp = str.toString();
    temp = temp.replace("b'", "").replace("'", "");
    return "data:image/jpeg;base64," + temp;
  };

  return (
    <>
      <Box id="detail" style={{ height: "100%" }} p={0}>
        <Box
          style={{
            height: "60%",
            width: "100%",
            overflowY: "scroll",
            objectFit: "cover",
          }}
          bgcolor="#ffffff"
          position="relative"
          p={0}
        >
          {Redux_imginfo ? (
            Redux_imginfo.img_data ? (
              <>
                <p style={{ color: "black", padding: "10px" }}>
                  Thông tin chi tiết:
                </p>
                <center>
                  <img
                    src={renderData(Redux_imginfo.img_data)}
                    //src={Redux_imginfo.imh}
                    style={{
                      height: "150px",
                      maxWidth: "500px",
                      objectFit: "cover",
                    }}
                    alt="1"
                  />
                </center>
                <div style={{ padding: "10px", color: "black", width: "100%" }}>
                  <FormControl component="fieldset" style={{ width: "100%" }}>
                    <FormLabel component="legend" style={{ color: "black" }}>
                      Xác nhận lỗi:
                    </FormLabel>
                    <RadioGroup
                      aria-label="Lỗi"
                      name="error"
                      //value={value}
                      value={"none"}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="none"
                        control={<Radio />}
                        label="Bình thường"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Vật thể lạ mắc vào đường dây"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Dây dẫn bị tưa (đứt sợi)"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Quá nhiệt mối nối"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Trôi tạ chống rung"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="Cách điện thủy tinh bị mất (vỡ) bát"
                      />
                      <FormControlLabel
                        value="6"
                        control={<Radio />}
                        label="Cách điện silicon bị rách tán"
                      />
                      <FormControlLabel
                        value="7"
                        control={<Radio />}
                        label="Cách điện bị bám vật lạ"
                      />
                      <FormControlLabel
                        value="8"
                        control={<Radio />}
                        label="Tuột hãm dây trên chuỗi cách điện"
                      />
                      <FormControlLabel
                        value="9"
                        control={<Radio />}
                        label="Cột điện bị bám vật lạ"
                      />
                      <FormControlLabel
                        value="10"
                        control={<Radio />}
                        label=" Cột điện bị han rỉ"
                      />
                      <FormControlLabel
                        value="11"
                        control={<Radio />}
                        label="Móng cột bị nứt bê tông"
                      />
                      <FormControlLabel
                        value="12"
                        control={<Radio />}
                        label="Sạt lở đất xung quanh móng cột"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button component={"C"} onClick={handleUpdate}>
                    Cập nhật
                  </Button>
                </div>
              </>
            ) : (
              <Waiting
                color="#abdbe3"
                icon={<PhotoIcon style={{ fontSize: "100" }} />}
              />
            )
          ) : (
            ""
          )}
        </Box>
        <Box style={{ height: "40%", width: "100%" }} p={0}>
          <Map_Item />
        </Box>
      </Box>
    </>
  );
};

export default Detail;
