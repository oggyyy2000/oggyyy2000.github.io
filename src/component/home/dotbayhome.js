import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Loading from "../generalObject/Loading";
import Button from "@material-ui/core/Button";
import FullDialogBC from "../generalObject/DialogBC";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getTextDisplay } from "../../util/GetTenTuyen";
import { FormatDate } from "../../util/formatDate";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CachedIcon from "@material-ui/icons/Cached";
import TreeItem from "@material-ui/lab/TreeItem";
import * as actions from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import DialogPopupNormal from "../generalObject/VideoDialog/Dialog_Popup_Normal";
import FiberNewIcon from "@material-ui/icons/FiberNew";

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
  const dispatch = useDispatch();
  const urltb = process.env.REACT_APP_API_URL + "dotkiemtras/";
  const urlanh = process.env.REACT_APP_API_URL + "imagedkt/";
  const urlt = process.env.REACT_APP_API_URL + "tuyens/";
  // const [fetchedData, setFetchedData] = useState([]);
  const Today = new Date();
  const DateNow1 =
    (Today.getMonth() > 8
      ? Today.getMonth() + 1
      : "0" + (Today.getMonth() + 1)) +
    "/" +
    Today.getFullYear();
  const DateNow =
    Today.getDate().toString().padStart(2, "0") +
    "/" +
    (Today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    Today.getFullYear();
  const [Year, setYear] = useState(Today.getFullYear());
  const [Month, setMonth] = useState(Today.getMonth());
  const classes = useStyles();
  const fetchedData = useSelector((state) => state.dbauto);
  const ListTuyens = useSelector((state) => state.listtuyen);
  let ListTuyen = [];
  let NodeIdx = 0;

  const sort = (str) => {
    var mySubString = str.substring(
      str.lastIndexOf("_") + 1,
      str.lastIndexOf(".")
    );
    return mySubString;
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
        //console.log(res.status);
      }
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

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
          //   console.log(res.status);
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
  };

  useEffect(() => {
    let componentMounted = true;
    const Find = async () => {
      if (componentMounted) {
        if (fetchedData) FindMonth(fetchedData, Month);
      }
    };
    Find();
    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    let componentMounted = true;
    const Find = async () => {
      if (componentMounted) {
        if (fetchedData) FindMonth(fetchedData, Month);
      }
    };
    Find();
    return () => {
      componentMounted = false;
    };
  }, [fetchedData]);

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && fetchedData && fetchedData?.length !== 0) {
        GetImg(fetchedData[0].ma_dot_kiem_tra);
      }
    };
    fetchData();

    return () => {
      componentMounted = false;
    };
  }, [fetchedData]);

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
      if (componentMounted && ListTuyens.length === 0) {
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

  const renderitem = (post, list) => {
    const ru = ListTuyen.indexOf(post.ma_tuyen);
    if (ru === -1) ListTuyen.push(post.ma_tuyen);
    NodeIdx++;
    var newdate = FormatDate(post.ngay_kiem_tra);
    var TenTuyen = getTextDisplay(post.ma_tuyen, ListTuyens);
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
            {RenderListItem(list, post.ma_tuyen)}
          </TreeItem>
        ) : (
          ""
        )}
      </>
    );
  };

  const CheckDate = (ngaykt, post) => {
    var d = new Date(ngaykt);
    return d.getFullYear() === Year && d.getMonth() === Month ? true : false;
  };

  const RenderListItem = (list, tuyen) => {
    return (
      <>
        {list
          ? list.map((post) =>
              CheckDate(post.ngay_kiem_tra, post) && post.ma_tuyen === tuyen
                ? renderCard(post)
                : ""
            )
          : ""}
      </>
    );
  };

  const FindMonth = (list, month) => {
    if (list.length !== 0) {
      var d = new Date(list[0].ngay_kiem_tra);
      if (d.getMonth() === Month && d.getFullYear() === Year) {
        return;
      } else {
        for (let j = 0; j < 100; j++) {
          for (var i = 11; i >= 0; i--) {
            if (d.getMonth() === i && d.getFullYear() === parseInt(Year - j)) {
              setYear(parseInt(Year - j));
              setMonth(i);
              return;
            }
          }
        }
      }
    }
  };

  const render = (post, list) => {
    var d = new Date(post.ngay_kiem_tra);
    return (
      <>
        {ListTuyen.indexOf(post.ma_tuyen) === -1 && CheckDate(d, post)
          ? renderitem(post, list)
          : ""}
      </>
    );
  };

  return (
    <>
      <div style={{ height: "100%", overflowY: "scroll" }}>
        <div
          style={{
            margin: 10,
            color: "black",
            fontWeight: "bold",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {DateNow1}
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
            fetchedData.map((post) => render(post, fetchedData))
          ) : (
            <Loading />
          )}
        </TreeView>
      </div>
    </>
  );
}
