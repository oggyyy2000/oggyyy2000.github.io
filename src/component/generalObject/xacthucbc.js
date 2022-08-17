import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import PhotoIcon from "@material-ui/icons/Photo";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
//---------------------------------------------------
import Waiting from "../generalObject/Waiting";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { makeStyles } from "@material-ui/core/styles";
import itemData from "../photoms/itemData";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import { ChangerUrl } from "../../util/ChangeUrl";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  imageList: {
    width: "100%",
    //height: "90%",
  },
  fontSize: {
    "& span:last-child": {
      fontSize: 15,
    },
  },
}));

const XacThuc = () => {
  const classes = useStyles();
  const [value, setValue] = useState("none");
  const [view, setView] = useState(true);
  const [img, setImg] = useState();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleUpdate = () => {
    // alert(value);
    dispatch({ type: actions.Temp_value, data: value });
  };

  const handleClick = (item) => {
    setView(!view);
    setImg(item.img);
    setValue(item.type);
  };

  return (
    <>
      <Box id="detail" style={{ height: "100%" }} p={0}>
        {view ? (
          <Box
            style={{
              height: "100%",
              width: "100%",
              overflowY: "scroll",
              objectFit: "cover",
            }}
            bgcolor="#ffffff"
            position="relative"
            p={0}
          >
            <>
              <ImageList
                rowHeight={160}
                className={classes.imageList}
                cols={4}
                style={{ margin: 0 }}
              >
                {itemData.map((item, index) => (
                  <ImageListItem
                    key={index}
                    cols={1}
                    style={
                      item.type !== "none"
                        ? { border: "1px solid red" }
                        : { border: "1px solid green" }
                    }
                    onClick={() => handleClick(item)}
                  >
                    <img
                      src={ChangerUrl(item.img)}
                      style={{
                        height: "85%",
                        width: "100%",
                        marginBottom: "2px",
                        top: 0,
                        transform: "translateY(0%)",
                        objectFit: "cover",
                      }}
                      id="main"
                    />
                    <p>
                      {item.type != "none" ? (
                        <WarningIcon style={{ color: "red" }} />
                      ) : (
                        <CheckCircleIcon style={{ color: "green" }} />
                      )}
                      {item.type != "none" ? (
                        <p
                          style={{
                            color: "red",
                            width: "fit-content",
                            display: "inline-flex",
                            marginLeft: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          {item.type}
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "green",
                            width: "fit-content",
                            display: "inline-flex",
                            marginLeft: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          {item.type}
                        </p>
                      )}
                    </p>
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          </Box>
        ) : (
          <Box
            style={{
              height: "100%",
              width: "100%",
              overflowY: "scroll",
              objectFit: "cover",
            }}
            bgcolor="#ffffff"
            position="relative"
            p={0}
          >
            {img ? (
              <>
                <Button
                  style={{ float: "right" }}
                  onClick={() => setView(!view)}
                  component={"C"}
                >
                  Quay lại
                </Button>
                <p
                  style={{
                    color: "black",
                    padding: "10px",
                    paddingBottom: "0px",
                    marginBottom: "0px",
                  }}
                >
                  Thông tin chi tiết:
                </p>
                <center style={{ marginLeft: "90px", paddingBottom: "5px" }}>
                  {/*<img src={img} style={{  height: "300px" , objectFit: 'cover'}} alt="" />*/}
                  <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={200}
                    defaultPositionY={100}
                  >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                        <Box style={{ float: "right", width: "40px" }}>
                          <IconButton
                            component={"C"}
                            onClick={zoomIn}
                            aria-label="delete"
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            component={"C"}
                            onClick={zoomOut}
                            aria-label="delete"
                          >
                            <RemoveIcon />
                          </IconButton>
                          <IconButton
                            component={"C"}
                            onClick={resetTransform}
                            aria-label="delete"
                          >
                            <UndoIcon />
                          </IconButton>
                        </Box>
                        <Box>
                          <div className="box-img">
                            <TransformComponent>
                              <img
                                id="view_img"
                                src={ChangerUrl(img)}
                                style={{ height: "320px", objectFit: "cover" }}
                                alt="view_img"
                              />
                            </TransformComponent>
                          </div>
                        </Box>
                      </React.Fragment>
                    )}
                  </TransformWrapper>
                </center>
                <div
                  style={{
                    padding: "10px",
                    color: "black",
                    width: "100%",
                    height: "149px",
                    overflow: "hidden",
                    borderTop: "3px solid black",
                  }}
                >
                  <FormControl component="fieldset" style={{ width: "100%" }}>
                    <FormLabel component="legend" style={{ color: "black" }}>
                      Xác nhận lỗi:
                      <Button component={"C"} onClick={handleUpdate}>
                        Cập nhật
                      </Button>
                    </FormLabel>
                    <div style={{ height: "105px", overflow: "scroll" }}>
                      <RadioGroup
                        aria-label="Lỗi"
                        name="error"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          className={classes.fontSize}
                          value="none"
                          control={<Radio />}
                          label="Bình thường"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="1"
                          control={<Radio />}
                          label="Vật thể lạ mắc vào đường dây"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="2"
                          control={<Radio />}
                          label="Dây dẫn bị tưa (đứt sợi)"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="3"
                          control={<Radio />}
                          label="Quá nhiệt mối nối"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="4"
                          control={<Radio />}
                          label="Trôi tạ chống rung"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="5"
                          control={<Radio />}
                          label="Cách điện thủy tinh bị mất (vỡ) bát"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="6"
                          control={<Radio />}
                          label="Cách điện silicon bị rách tán"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="7"
                          control={<Radio />}
                          label="Cách điện bị bám vật lạ"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="8"
                          control={<Radio />}
                          label="Tuột hãm dây trên chuỗi cách điện"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="9"
                          control={<Radio />}
                          label="Cột điện bị bám vật lạ"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="10"
                          control={<Radio />}
                          label=" Cột điện bị han rỉ"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="11"
                          control={<Radio />}
                          label="Móng cột bị nứt bê tông"
                        />
                        <FormControlLabel
                          className={classes.fontSize}
                          value="12"
                          control={<Radio />}
                          label="Sạt lở đất xung quanh móng cột"
                        />
                      </RadioGroup>
                    </div>
                  </FormControl>
                </div>
              </>
            ) : (
              <Waiting
                color="#abdbe3"
                icon={<PhotoIcon style={{ fontSize: "100" }} />}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default XacThuc;
