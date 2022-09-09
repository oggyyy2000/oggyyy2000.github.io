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
import FullDialogBC from "../generalObject/DialogBC";
import BtnPrint from "../generalObject/BtnPrint";
import TreeView from "@material-ui/lab/TreeView";
import CachedIcon from "@material-ui/icons/Cached";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getTextDisplay } from "../../util/GetTenTuyen";
import { FormatDate } from "../../util/formatDate";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import DialogPopupNormal from "../generalObject/VideoDialog/Dialog_Popup_Normal";
// data
import { T1 } from "../../util/toado/T1";
import { T2 } from "../../util/toado/T2";
import { T3 } from "../../util/toado/T3";
import { T4 } from "../../util/toado/T4";
import { T5 } from "../../util/toado/T5";
import { T6 } from "../../util/toado/T6";
import { T7 } from "../../util/toado/T7";
import { T8 } from "../../util/toado/T8";
///////////////////////////////////////////

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    borderRadius: 0,
    width: "100%",
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
  const urltb = process.env.REACT_APP_API_URL + "dotkiemtras/";
  const urlt = process.env.REACT_APP_API_URL + "tuyens/";
  const urlanh = process.env.REACT_APP_API_URL + "imagedkt/";
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [fetchedData, setFetchedData] = useState([]);
  const fetchedData = useSelector((state) => state.dbauto);
  const ListTuyen = useSelector((state) => state.listtuyen);
  //const [ListTuyen, setListTuyen] = useState([]);
  const [ListCot, setListCot] = useState([]);
  const [Tuyen, setTuyen] = useState(null);
  const [BatDau, setBatDau] = useState(null);
  const [KetThuc, setKetThuc] = useState(null);
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

  const sort = (str) => {
    var mySubString = str.substring(
      str.lastIndexOf("_") + 1,
      str.lastIndexOf(".")
    );
    return mySubString;
  };

  const GetImg = (str) => {
    async function getDataListImg() {
      dispatch({
        type: actions.CURRENT_VIDEO_NORMAL,
        data: [],
      });
      let urlg = urlanh + str + "/";
      try {
        let res = await axios({
          url: urlg,
          method: "get",
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

    getDataListImg().then((res) => {
      if (res) {
        dispatch({
          type: actions.CURRENT_VIDEO_NORMAL,
          data:
            res &&
            res.sort(function (a, b) {
              return sort(a.img_name) - sort(b.img_name);
            }),
        });
        dispatch({
          type: actions.ON_CURRENT_ID_VIDEO_CHANGE,
          data: "ALL",
        });
        dispatch({
          type: actions.MODE_SHOW_VIDEO,
          data: "Normal",
        });
      }
    });
  };

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
      if (res.status === 200) {
        //   console.log(res.status);
      }
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && !fetchedData && fetchedData?.length !== 0) {
        getDataDB().then((res) => {
          if (res) {
            let data = res.sort(function (a, b) {
              return new Date(b.ngay_kiem_tra) - new Date(a.ngay_kiem_tra);
            });
            dispatch({
              type: actions.Db_Auto,
              data,
            });

            GetImg(data[0].ma_dot_kiem_tra);
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
        // console.log(res.status);
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

  const getdata = () => {
    getDataDB().then((res) => {
      if (res) {
        dispatch({
          type: actions.Db_Auto,
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

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && fetchedData && fetchedData.length !== 0) {
        GetImg(fetchedData[0].ma_dot_kiem_tra);
      }
    };
    fetchData();

    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && fetchedData && fetchedData.length !== 0) {
        GetImg(fetchedData[0].ma_dot_kiem_tra);
      }
    };
    fetchData();

    return () => {
      componentMounted = false;
    };
  }, [fetchedData]);

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
    switch (event.target.value) {
      case "T1":
        setListCot(T1);
        break;
      case "T2":
        setListCot(T2);
        break;
      case "T3":
        setListCot(T3);
        break;
      case "T4":
        setListCot(T4);
        break;
      case "T5":
        setListCot(T5);
        break;
      case "T6":
        setListCot(T6);
        break;
      case "T7":
        setListCot(T7);
        break;
      case "T8":
        setListCot(T8);
        break;
      default:
        setListCot(null);
        break;
    }
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
          /* GetImg(post.ma_dot_kiem_tra)*/
        }}
        label={
          <Card className={classes.root} key={post.ma_dot_kiem_tra}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Đợt kiểm tra: {/*post.ma_dot_kiem_tra*/}
                  {post.ma_tuyen}_{post.bat_dau_doan}-{post.ket_thuc_doan}_
                  {post.ngay_kiem_tra}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Bắt đầu: {post.bat_dau_doan} - Kết thúc: {post.ket_thuc_doan}{" "}
                  <br />
                  Ngày kiểm tra: {newdate} {" | "} Mã tuyến: {post.ma_tuyen}
                  <br />
                  <FullDialogBC data={post} />
                  {/*<BtnPrint post={post} />*/}
                  <DialogPopupNormal id={post.ma_dot_kiem_tra} post={post} />
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
              /* GetImg(post.ma_dot_kiem_tra)*/
            }}
            label={
              <List
                component="nav"
                style={{ borderBottom: "1px solid #f1f1f1" }}
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
                  <FiberNewIcon style={{ color: "red" }} />
                )}
              </List>
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
            minWidth: "25%",
            marginLeft: 10,
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Chọn ĐBD
          </InputLabel>
          <Select
            width="100%"
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={"Chọn ĐBD"}
            value={BatDau}
            style={{ height: 40 }}
            onChange={onChangeSelectBatDau}
          >
            <MenuItem value={null}>Trống</MenuItem>
            {ListCot ? (
              ListCot.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.cot + "|" + item.x + "," + item.y}
                  disabled={
                    item.cot + "|" + item.x + "," + item.y === KetThuc
                      ? true
                      : false
                  }
                >
                  {item.cot}
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
            minWidth: "25%",
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
            {ListCot ? (
              ListCot.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.cot + "|" + item.x + "," + item.y}
                  disabled={
                    item.cot + "|" + item.x + "," + item.y === BatDau
                      ? true
                      : false
                  }
                >
                  {item.cot}
                </MenuItem>
              ))
            ) : (
              <Loading />
            )}
          </Select>
        </FormControl>
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
    </div>
  );
}
