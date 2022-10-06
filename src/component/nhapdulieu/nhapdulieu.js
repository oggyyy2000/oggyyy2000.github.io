import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Loading from "../generalObject/Loading";
import Button from "@material-ui/core/Button";
import CachedIcon from "@material-ui/icons/Cached";
import FullDialogBC from "../generalObject/DialogBC";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getTextDisplay } from "../../util/GetTenTuyen";
import { FormatDate } from "../../util/formatDate";
import DialogSavePopup from "../generalObject/VideoSaveDialog/Dialog_Save_Popup";
import DialogPopup from "../generalObject/VideoDialog/Dialog_Popup";
import DialogPopupImage from "../generalObject/VideoDialog/Dialog_Popup_Image";
import DialogSavePopup2 from "../generalObject/Dialog_Save_Popup 2";
import DialogImageShow2 from "../generalObject/slideshow-gallery/DialogImageShow2";
import DialogVideoShow from "../generalObject/slideshow-gallery/DialogVideoShow";
//import FiberNewIcon from "@material-ui/icons/FiberNew";
// data
/*
import { T1 } from "../../util/toado/T1";
import { T2 } from "../../util/toado/T2";
import { T3 } from "../../util/toado/T3";
import { T4 } from "../../util/toado/T4";
import { T5 } from "../../util/toado/T5";
import { T6 } from "../../util/toado/T6";
import { T7 } from "../../util/toado/T7";
import { T8 } from "../../util/toado/T8";
*/
import TodayIcon from "../../asset/Icon.svg";
///////////////////////////////////////////

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    borderRadius: 0,
    width: "100%",
    marginTop: 2,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  textContent: {
    "& span": {
      fontSize: "1.25rem",
      color: "black",
      fontWeight: "bold",
    },
    "& p": {
      fontSize: "1.15rem",
    },
  },
  sizeIcon: {
    "& svg": {
      fontSize: "35px",
    },
  },
}));
export default function DotBay() {
  const urltb = process.env.REACT_APP_API_URL + "dotkiemtraimports";
  const urlt = process.env.REACT_APP_API_URL + "getalltuyens";
  const urllistvideo = process.env.REACT_APP_API_URL + "getvideodetectimport";
  const urllistanh = process.env.REACT_APP_API_URL + "getimagesdetectimport";
  const dispatch = useDispatch();
  const classes = useStyles();
  //const [ListCot, setListCot] = useState([]);
  const [Tuyen, setTuyen] = useState(null);
  const [BatDau, setBatDau] = useState(null);
  const [KetThuc, setKetThuc] = useState(null);
  const ModeShowVideo = useSelector((state) => state.modeshowvideo);
  const CurrentVideo = useSelector((state) => state.currentVideo);
  const fetchedData = useSelector((state) => state.dbtc);
  const ListTuyen = useSelector((state) => state.listtuyen);
  const urlvt = `${process.env.REACT_APP_API_URL}getallvitribytuyens?${
    Tuyen ? "&ma_tuyen=" + Tuyen : ""
  }`;
  const [ListVTT, setListVTT] = useState([]);
  let count = 0;
  let NodeIdx = 0;
  let ListTuyenIT = [];
  const Today = new Date();
  const DateNow =
    Today.getDate().toString().padStart(2, "0") +
    "/" +
    (Today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    Today.getFullYear();

  async function getDataDB() {
    try {
      let res = await axios({
        url: urltb,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && !fetchedData) {
        getDataDB().then((res) => {
          if (res) {
            dispatch({
              type: actions.Db_Tc,
              data: res.sort(function (a, b) {
                return new Date(b.ngay_kiem_tra) - new Date(a.ngay_kiem_tra);
              }),
            });
          }
        });
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, []);

  async function getDatatuyen() {
    try {
      let res = await axios({
        url: urlt,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        //console.log(res.status);
      }
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && ListTuyen.length === 0) {
        getDatatuyen().then((res) => {
          if (res) {
            dispatch({
              type: actions.List_Tuyen,
              data: res,
            });
          }
        });
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    async function getDatavtt() {
      try {
        let res = await axios({
          url: urlvt,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          //  console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDatavtt().then((res) => setListVTT(res));
  }, []);

  useEffect(() => {
    async function getDatavtt() {
      try {
        let res = await axios({
          url: urlvt,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          //  console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDatavtt().then((res) => setListVTT(res));
  }, [Tuyen]);

  const getdata = () => {
    getDataDB().then((res) => {
      if (res) {
        dispatch({
          type: actions.Db_Tc,
          data: res.sort(function (a, b) {
            return new Date(b.ngay_kiem_tra) - new Date(a.ngay_kiem_tra);
          }),
        });
      }
    });
    getDatatuyen().then((res) => {
      if (res) {
        dispatch({
          type: actions.List_Tuyen,
          data: res,
        });
      }
    });
  };

  const GetListIMG = (id) => {
    async function getDataListImg(id) {
      let urlg = urllistanh + "/" + id;
      try {
        let res = await axios({
          url: urlg,
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          //   console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDataListImg(id).then((res) => {
      if (res) {
        // console.log(res);
        let temparr = [];
        res &&
          undefined !== res &&
          res.length !== 0 &&
          Object.keys(res) &&
          undefined !== Object.keys(res) &&
          Object.keys(res).length !== 0 &&
          Object.keys(res).map((key, index) => {
            let tempobj = new Object();
            tempobj.name = key;
            tempobj.img = res[key];
            temparr.push(tempobj);
          });
        dispatch({
          type: actions.AllSlideShowData,
          data: temparr,
        });
      }
    });
  };

  const GetListVideo = (id, data) => {
    async function getDataListImg(id, data) {
      let urlg = urllistvideo + "/" + id;
      try {
        let res = await axios({
          url: urlg,
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          //   console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDataListImg(id, data).then((res) => {
      if (res) {
        if (Object.keys(res).length !== 0) {
          dispatch({
            type: actions.CURRENT_VIDEO,
            data: res,
          });

          dispatch({
            type: actions.MODE_SHOW_VIDEO,
            data: "Video",
          });
        } else {
          GetListIMG(id);

          dispatch({
            type: actions.MODE_SHOW_VIDEO,
            data: "SlideShow",
          });
        }
      }

      let BatDau = data?.bat_dau_doan;
      let KetThuc = data?.ket_thuc_doan;
      axios({
        url: `${process.env.REACT_APP_API_URL}getallvitribytuyens?ma_tuyen=${data?.ma_tuyen}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        let ListCot = res?.data;
        try {
          var pluginArrayArg = new Array();
          let BatDauz = ListCot
            ? ListCot.find((o) => o.ma_vi_tri === BatDau)
            : null;
          let KetThucz = ListCot
            ? ListCot.find((o) => o.ma_vi_tri === KetThuc)
            : null;
          if (BatDauz !== null) {
            var jsonArg1 = new Object();
            jsonArg1.ma_vi_tri = BatDauz.ma_vi_tri;
            jsonArg1.toa_do = BatDauz.toa_do;
            pluginArrayArg.push(jsonArg1);
          }
          if (KetThucz !== null) {
            var jsonArg2 = new Object();
            jsonArg2.ma_vi_tri = KetThucz.ma_vi_tri;
            jsonArg2.toa_do = KetThucz.toa_do;
            pluginArrayArg.push(jsonArg2);
          }
          var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
          dispatch({
            type: actions.ON_CURRENT_TUYEN_CHANGE,
            data: data.ma_tuyen,
          });
          dispatch({
            type: actions.ON_CURRENT_LIST_COT_CHANGE,
            data: jsonArray,
          });
        } catch (e) {
          //console.log(e);
        }
      });
    });
  };

  useEffect(() => {
    let componentMounted = true;
    if (
      ModeShowVideo !== "LIVE" &&
      componentMounted &&
      fetchedData &&
      fetchedData.length !== 0
    ) {
      GetListVideo(fetchedData[0].ma_dot_kiem_tra, fetchedData[0]);
    }
    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted && fetchedData && fetchedData.length !== 0) {
      GetListVideo(fetchedData[0].ma_dot_kiem_tra, fetchedData[0]);
    }
    return () => {
      componentMounted = false;
    };
  }, [fetchedData]);

  useEffect(() => {
    let componentMounted = true;

    //  if (ModeShowVideo !== "LIVE") {
    const fetchData = async () => {
      if (componentMounted) {
        dispatch({
          type: actions.MODE_SHOW_VIDEO,
          data: "Video",
        });
        Object.keys(CurrentVideo).map((key, index) => {
          if (index === 0) {
            dispatch({
              type: actions.ON_CURRENT_ID_VIDEO_CHANGE,
              data: CurrentVideo[key],
            });
          }
        });
      }
    };
    fetchData();
    //  }
    return () => {
      componentMounted = false;
    };
  }, [CurrentVideo]);

  useEffect(() => {
    //if (Tuyen === null) {
    setBatDau(null);
    setKetThuc(null);
    //}
  }, [Tuyen]);

  const onChange = (event, setFunction) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    setFunction(value);
  };

  const Resset_Cot = () => {
    setBatDau(null);
    setKetThuc(null);
    dispatch({ type: actions.ON_CURRENT_LIST_COT_CHANGE, data: [] });
  };

  const onChangeSelectTuyen = (event) => {
    onChange(event, setTuyen);
    Resset_Cot();
  };

  const onChangeSelectBatDau = (event) => {
    onChange(event, setBatDau);
  };

  const onChangeSelectKetThuc = (event) => {
    onChange(event, setKetThuc);
  };

  const renderCard = (post) => {
    var newdate = FormatDate(post.ngay_kiem_tra);
    return (
      <TreeItem
        onLabelClick={() => {
          /*GetListVideo(post.ma_dot_kiem_tra)*/
        }}
        label={
          <Card
            className={classes.root}
            key={post.ma_dot_kiem_tra}
            style={
              DateNow === newdate
                ? { border: "2px solid red" }
                : { border: "2px solid #f1f1f1" }
            }
          >
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Đợt kiểm tra:
                  {post.ma_tuyen}_{post.bat_dau_doan}-{post.ket_thuc_doan}_
                  {post.ngay_kiem_tra}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Bắt đầu: {post.bat_dau_doan} - Kết thúc: {post.ket_thuc_doan}{" "}
                  <br />
                  Ngày kiểm tra: {newdate} {" | "} Mã tuyến: {post.ma_tuyen}
                  <br />
                  <FullDialogBC data={post} />
                  <DialogPopup
                    id={post.ma_dot_kiem_tra}
                    post={post}
                    mode={"Video"}
                  />
                  <DialogPopupImage
                    id={post.ma_dot_kiem_tra}
                    post={post}
                    info={`${getTextDisplay(post.ma_tuyen, ListTuyen)} ( 
                    ${post.bat_dau_doan}
                    -
                    ${post.ket_thuc_doan} )`}
                  />
                  <DialogSavePopup2 post={post} />
                </Typography>
              </CardContent>
            </div>
          </Card>
        }
      />
    );
  };

  const RenderListItem = (list, tuyen) => {
    return (
      <>
        {list
          ? BatDau === null && KetThuc === null
            ? list.map((post) => post.ma_tuyen === tuyen && renderCard(post))
            : BatDau !== null && KetThuc !== null
            ? list.map(
                (post) =>
                  post.ma_tuyen === tuyen &&
                  post.bat_dau_doan === BatDau.split("|")[0] &&
                  post.ket_thuc_doan === KetThuc.split("|")[0] &&
                  renderCard(post)
              )
            : BatDau !== null && KetThuc === null
            ? list.map(
                (post) =>
                  post.ma_tuyen === tuyen &&
                  post.bat_dau_doan === BatDau.split("|")[0] &&
                  renderCard(post)
              )
            : BatDau === null && KetThuc !== null
            ? list.map(
                (post) =>
                  post.ma_tuyen === tuyen &&
                  post.ket_thuc_doan === KetThuc.split("|")[0] &&
                  renderCard(post)
              )
            : ""
          : ""}
      </>
    );
  };

  const render = (post, Posts) => {
    const ru = ListTuyenIT.indexOf(post.ma_tuyen);
    if (ru === -1) ListTuyenIT.push(post.ma_tuyen);
    NodeIdx++;
    var newdate = FormatDate(post.ngay_kiem_tra);
    var TenTuyen = getTextDisplay(post.ma_tuyen, ListTuyen);
    return (
      <>
        {ru === -1 ? (
          <TreeItem
            nodeId={NodeIdx}
            onLabelClick={() => {
              /* GetListVideo(post.ma_dot_kiem_tra) */
            }}
            style={{ marginBottom: 5 }}
            label={
              <>
                <List
                  component="nav"
                  style={
                    DateNow === newdate
                      ? { border: "5px solid red", borderRadius: 5 }
                      : { border: "5px solid #f1f1f1", borderRadius: 5 }
                  }
                >
                  <ListItem
                    style={{
                      width: "80%",
                      display: "inline-block",
                    }}
                  >
                    <ListItemText
                      className={classes.textContent}
                      primary={TenTuyen}
                      secondary={newdate}
                    />
                  </ListItem>
                  {DateNow === newdate && (
                    <img
                      src={TodayIcon}
                      alt=""
                      style={{
                        width: "50px",
                        top: 0,
                        float: "right",
                        marginRight: 5,
                        borderRadius: 5,
                      }}
                    />
                  )}
                </List>
              </>
            }
          >
            {RenderListItem(Posts, post.ma_tuyen)}
          </TreeItem>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <div id="dotbay" style={{ height: "100%", overflowY: "scroll" }}>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FormControl
          variant={"outlined"}
          style={{
            alignSelf: "center",
            minWidth: "25%",
            marginLeft: 10,
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Chọn Tuyến
          </InputLabel>
          <Select
            width="100%"
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={"Chọn Tuyến"}
            value={Tuyen}
            style={{ height: 40 }}
            onChange={onChangeSelectTuyen}
          >
            <MenuItem value={null}>Trống</MenuItem>
            {ListTuyen ? (
              ListTuyen.map((item, index) => (
                <MenuItem key={index} value={item.ma_tuyen}>
                  {/*item.tt_tuyen*/}
                  {item.ten_tuyen}
                </MenuItem>
              ))
            ) : (
              <Loading />
            )}
          </Select>
        </FormControl>
        <FormControl
          variant={"outlined"}
          style={{
            alignSelf: "center",
            minWidth: "19%",
            marginLeft: 10,
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Chọn ĐBĐ
          </InputLabel>
          <Select
            width="100%"
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={"Chọn ĐBĐ"}
            value={BatDau}
            style={{ height: 40 }}
            onChange={onChangeSelectBatDau}
          >
            <MenuItem value={null}>Trống</MenuItem>
            {ListVTT ? (
              ListVTT.map((item, index) => (
                <MenuItem key={index} value={item.ma_vi_tri}>
                  {item.ten_vi_tri}
                </MenuItem>
              ))
            ) : (
              <Loading />
            )}
          </Select>
        </FormControl>
        <FormControl
          variant={"outlined"}
          style={{
            alignSelf: "center",
            minWidth: "19%",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Chọn ĐKT
          </InputLabel>
          <Select
            width="100%"
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={"Chọn ĐKT"}
            value={KetThuc}
            style={{ height: 40 }}
            onChange={onChangeSelectKetThuc}
          >
            <MenuItem value={null}>Trống</MenuItem>
            {ListVTT ? (
              ListVTT.map((item, index) => (
                <MenuItem key={index} value={item.ma_vi_tri}>
                  {item.ten_vi_tri}
                </MenuItem>
              ))
            ) : (
              <Loading />
            )}
          </Select>
        </FormControl>
        <DialogSavePopup reload={getdata} />
        <Button
          onClick={() => getdata()}
          component={"C"}
          title="Làm mới dữ liệu"
        >
          <CachedIcon />
        </Button>
      </div>

      <TreeView
        className={classes.sizeIcon}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultExpanded={[1]}
      >
        {fetchedData ? (
          fetchedData.map((post, index) =>
            Tuyen === null && BatDau === null && KetThuc === null ? (
              render(post, fetchedData)
            ) : Tuyen !== null &&
              BatDau !== null &&
              KetThuc !== null &&
              Tuyen === post.ma_tuyen &&
              BatDau.split("|")[0] === post.bat_dau_doan &&
              KetThuc.split("|")[0] === post.ket_thuc_doan ? (
              render(post, fetchedData)
            ) : Tuyen !== null &&
              BatDau !== null &&
              KetThuc === null &&
              Tuyen === post.ma_tuyen &&
              BatDau.split("|")[0] === post.bat_dau_doan ? (
              render(post, fetchedData)
            ) : Tuyen !== null &&
              BatDau === null &&
              KetThuc !== null &&
              Tuyen === post.ma_tuyen &&
              KetThuc.split("|")[0] === post.ket_thuc_doan ? (
              render(post, fetchedData)
            ) : Tuyen !== null &&
              BatDau === null &&
              KetThuc === null &&
              Tuyen === post.ma_tuyen ? (
              render(post, fetchedData)
            ) : (
              <>
                <div key={post._id} style={{ display: "none" }}>
                  {(count = count + 1)}
                </div>
                {count === fetchedData.length ? (
                  <p
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      position: "absolute",
                    }}
                  >
                    Không có dữ liệu bạn cần tìm, vui lòng trở lại sau!
                  </p>
                ) : (
                  ""
                )}
              </>
            )
          )
        ) : (
          <Loading />
        )}
      </TreeView>
      <DialogImageShow2 hidden={true} />
      <DialogVideoShow />
    </div>
  );
}
