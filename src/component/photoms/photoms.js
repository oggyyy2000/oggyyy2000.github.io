import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Detail from "./detail";
import Detail2 from "./detail2";
import IMGSHOW from "./imgshow";
import PhotoIcon from "@material-ui/icons/Photo";
import Waiting from "../generalObject/Waiting";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import Button from "@material-ui/core/Button";
import CachedIcon from "@material-ui/icons/Cached";
//-----------------------------------------
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//------------------------------------------
import itemDataError from "./const/itemDataError";
import itemDataNone from "./const/itemDataNone";
import { getTextDisplay } from "../../util/GetTenTuyen";
import { FormatDate } from "../../util/formatDate";
import Loading from "../generalObject/Loading";
import { ChangerUrl } from "../../util/ChangeUrl";

const useStyles = makeStyles((theme) => ({
  root: {
    //height: "50%",
    height: "100%",
    color: "black",
    backgroundColor: theme.palette.background.paper,
    //borderBottom: "3px solid black",
  },
  imageList: {
    width: "100%",
    // height: "90%",
  },
  rootcard: {
    flexGrow: 1,
    borderRadius: "5px",
    border: "2px solid #f1f0f5",
    boxshadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "100%",
  },
  image: {
    width: 128,
    height: 128,
    objectFit: "cover",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  roottab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  hoverimg: {
    // left: 0,
    height: "100%",
    position: "relative",
    // transform: "translateX(0%)",
    width: "100%",
    objectFit: "cover",
    "&:hover": {
      background: "#a5c2f0",
      border: "2px solid rgb(25, 118, 210)",
    },
  },
}));

const PhotoMS = () => {
  const classes = useStyles();
  const [Data, setData] = useState([]);
  const [Data2, setData2] = useState([]);
  const [Data3, setData3] = useState([]);
  const [Data4, setData4] = useState([]);
  const [Mode, setMode] = useState(0);
  const urltb = process.env.REACT_APP_API_URL + "dotkiemtras/";
  const urlanh = process.env.REACT_APP_API_URL + "imagedkt/";
  const fetchedData = useSelector((state) => state.dbauto);
  const urltb2 = process.env.REACT_APP_API_URL + "dotkiemtraimports/";
  const urlanh2 = process.env.REACT_APP_API_URL + "getimagesdetectimport/";
  const fetchedData2 = useSelector((state) => state.dbtc);

  const [isLoading1, setIsLoading1] = useState(true);
  const [isError1, setIsError1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isError2, setIsError2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isError3, setIsError3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(true);
  const [isError4, setIsError4] = useState(false);

  const dispatch = useDispatch();

  //

  const sort = (str) => {
    var mySubString = str.substring(
      str.lastIndexOf("_") + 1,
      str.lastIndexOf(".")
    );
    return mySubString;
  };

  async function getDataDB() {
    try {
      setIsLoading1(true);
      setIsError1(false);
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
      setIsError1(true);
      setIsLoading1(false);
    }
  }

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted /*&& !fetchedData */ && fetchedData?.length !== 0) {
        getDataDB().then((res) => {
          if (res) {
            dispatch({
              type: actions.Db_Auto,
              data: res.sort(function (a, b) {
                return new Date(b.ngay_kiem_tra) - new Date(a.ngay_kiem_tra);
              }),
            });

            setIsLoading1(false);
            setIsError1(false);

            GetImg(res[0].ma_dot_kiem_tra);
          }
        });
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, []);

  const reload1 = () => {
    getDataDB().then((res) => {
      if (res) {
        dispatch({
          type: actions.Db_Auto,
          data: res.sort(function (a, b) {
            return new Date(b.ngay_kiem_tra) - new Date(a.ngay_kiem_tra);
          }),
        });

        setIsLoading1(false);
        setIsError1(false);

        GetImg(res[0].ma_dot_kiem_tra);
      }
    });
  };

  const GetImg = (str) => {
    async function getDataListImg() {
      let urlg = urlanh + str + "/";
      try {
        setIsLoading2(true);
        setIsError2(false);
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
        setIsError2(true);
        setIsLoading2(false);
      }
    }

    getDataListImg().then((res) => {
      if (res) {
        dispatch({ type: actions.DETAIL_IMG, data: res && res[0] });
        setData(res);
        setData2(res);
        setIsLoading2(false);
      }
    });
  };

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
  }, []);
  ///

  async function getDataDB2() {
    try {
      setIsLoading3(true);
      setIsError3(false);
      let res = await axios({
        url: urltb2,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
      setIsError3(true);
      setIsLoading3(false);
    }
  }

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted /*&& !fetchedData2*/ && fetchedData2?.length !== 0) {
        getDataDB2().then((res) => {
          if (res) {
            dispatch({
              type: actions.Db_Tc,
              data: res.sort(function (a, b) {
                return new Date(b.ngay_kiem_tra) - new Date(a.ngay_kiem_tra);
              }),
            });
            setIsLoading3(false);

            GetImg2(res[0].ma_dot_kiem_tra);
          }
        });
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, []);

  const reload2 = () => {
    getDataDB2().then((res) => {
      if (res) {
        dispatch({
          type: actions.Db_Tc,
          data: res.sort(function (a, b) {
            return new Date(b.ngay_kiem_tra) - new Date(a.ngay_kiem_tra);
          }),
        });
        setIsLoading3(false);

        GetImg2(res[0].ma_dot_kiem_tra);
      }
    });
  };

  const GetImg2 = (str) => {
    async function getDataListImg2() {
      let urlg = urlanh2 + str;
      try {
        setIsLoading4(true);
        setIsError4(false);
        let res = await axios({
          url: urlg,
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
        }
        return res.data;
      } catch (err) {
        console.error(err);
        setIsError4(true);
        setIsLoading4(false);
      }
    }

    getDataListImg2().then((res) => {
      if (res && Object.keys(res).length != 0) {
        dispatch({
          type: actions.DETAIL_IMG,
          data: res && res[Object.keys(res)[0]],
        });
        let temparr = [];
        res.length !== 0 &&
          Object.keys(res).map((key, index) => temparr.push(res[key]));
        setData3(temparr);
        setData4(temparr);
      }
      setIsLoading4(false);
    });
  };

  useEffect(() => {
    let componentMounted = true;
    const fetchData = async () => {
      if (componentMounted && fetchedData2 && fetchedData2?.length !== 0) {
        GetImg2(fetchedData2[0].ma_dot_kiem_tra);
      }
    };
    fetchData();

    return () => {
      componentMounted = false;
    };
  }, []);

  ///

  const handleClick = (item) => {
    dispatch({ type: actions.DETAIL_IMG, data: item });
  };

  const handleShowMore = (mdkt) => {
    GetImg(mdkt);
  };

  const handleShowMore2 = (mdkt) => {
    GetImg2(mdkt);
  };

  //----------------------------------

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  let ListDB = [];

  const getFristImg = (newValue) => {
    if (newValue === 0) {
      GetImg(fetchedData && fetchedData[0].ma_dot_kiem_tra);
    } else {
      GetImg2(fetchedData2 && fetchedData2[0].ma_dot_kiem_tra);
    }
  };

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
    setMode(newValue);
    getFristImg(newValue);
  };
  //----------------------------------

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  const renderData = (str) => {
    //var temp = str.toString();
    //temp = temp.replace("b'", "").replace("'", "");
    return "data:image/jpeg;base64," + str;
  };

  const renderitem = (item, index) => {
    const ru = ListDB.indexOf(item.ma_dot_kiem_tra);
    if (ru === -1) {
      ListDB.push(item.ma_dot_kiem_tra);
      return (
        <div
          key={index}
          className={classes.rootcard}
          onClick={() => handleShowMore(item.ma_dot_kiem_tra)}
        >
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item>
                  {/*<ButtonBase
                    className={classes.image}
                    component={"C"}
                    onClick={() => handleClick(item)}
                  >
                    <img className={classes.img} alt="" src={item.img} />
                  </ButtonBase>*/}
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs style={{ paddingRight: 5 }}>
                    <Typography gutterBottom variant="subtitle1">
                      <p style={{ margin: 0 }}>
                        <b style={{ display: "inline-block" }}>
                          Thông tin kiểm tra:{" "}
                        </b>
                        <p style={{ margin: 0, display: "inline-block" }}>
                          {item.ma_tuyen}_{FormatDate(item.ngay_kiem_tra)}
                        </p>
                      </p>
                      <p style={{ margin: 0 }}>
                        {FormatDate(item.ngay_kiem_tra)}
                      </p>
                      <p style={{ margin: 0 }}>
                        {getTextDisplay(item.ma_tuyen)}
                      </p>
                      <p style={{ margin: 0 }}>
                        {item.bat_dau_doan}
                        {" - "} {item.ket_thuc_doan}
                      </p>
                    </Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    }
  };

  const renderitem2 = (item, index) => {
    const ru = ListDB.indexOf(item.ma_dot_kiem_tra);
    if (ru === -1) {
      ListDB.push(item.ma_dot_kiem_tra);
      return (
        <div
          key={index}
          className={classes.rootcard}
          onClick={() => handleShowMore2(item.ma_dot_kiem_tra)}
        >
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item>
                  {/*<ButtonBase
                    className={classes.image}
                    component={"C"}
                    onClick={() => handleClick(item)}
                  >
                    <img className={classes.img} alt="" src={item.img} />
                  </ButtonBase>*/}
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs style={{ paddingRight: 5 }}>
                    <Typography gutterBottom variant="subtitle1">
                      <p style={{ margin: 0 }}>
                        <b style={{ display: "inline-block" }}>
                          Thông tin kiểm tra:{" "}
                        </b>
                        <p style={{ margin: 0, display: "inline-block" }}>
                          {item.ma_tuyen}_{FormatDate(item.ngay_kiem_tra)}
                        </p>
                      </p>
                      <p style={{ margin: 0 }}>
                        {FormatDate(item.ngay_kiem_tra)}
                      </p>
                      <p style={{ margin: 0 }}>
                        {getTextDisplay(item.ma_tuyen)}
                      </p>
                      <p style={{ margin: 0 }}>
                        {item.bat_dau_doan}
                        {" - "} {item.ket_thuc_doan}
                      </p>
                    </Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    }
  };

  const renderPhoto = (item, index) => {
    return (
      <ImageListItem
        key={index}
        cols={item.cols || 1}
        onClick={() => handleClick(item)}
      >
        <img
          src={renderData(item.img_data)}
          alt="1"
          className={classes.hoverimg}
        />
      </ImageListItem>
    );
  };

  const renderPhoto3 = (item, index) => {
    return (
      <ImageListItem
        key={index}
        cols={item.cols || 1}
        onClick={() => handleClick(item)}
      >
        <img src={ChangerUrl(item)} alt="2" className={classes.hoverimg} />
      </ImageListItem>
    );
  };

  return (
    <>
      <Box style={{ height: "100%" }} display="flex" p={0}>
        <Box
          style={{ height: "100%", overflowY: "scroll", overflowX: "hidden" }}
          p={0}
          flex="0.25"
        >
          <div className={classes.roottab}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChangetab}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  component={"C"}
                  label="Ảnh đợt bay tự động"
                  {...a11yProps(0)}
                />
                <Tab
                  component={"C"}
                  label="Ảnh đợt bay tùy chọn"
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Button
                onClick={() => reload1()}
                component={"C"}
                title="Làm mới dữ liệu"
              >
                <CachedIcon />
              </Button>
              {isLoading1 ? (
                <Loading />
              ) : fetchedData && fetchedData2.length !== 0 ? (
                fetchedData.map((item, index) => renderitem(item, index))
              ) : !isError1 ? (
                "Không có dữ liệu"
              ) : (
                "Lỗi khi thực hiện lấy dữ liệu"
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Button
                onClick={() => reload2()}
                component={"C"}
                title="Làm mới dữ liệu"
              >
                <CachedIcon />
              </Button>
              {isLoading3 ? (
                <Loading />
              ) : fetchedData2 && fetchedData2.length !== 0 ? (
                fetchedData2.map((item, index) => renderitem2(item, index))
              ) : !isError3 ? (
                "Không có dữ liệu"
              ) : (
                "Lỗi khi thực hiện lấy dữ liệu"
              )}
            </TabPanel>
          </div>
        </Box>
        <Box
          id="show"
          style={{ height: "100%", overflow: "scroll" }}
          p={0}
          flex="0.50"
          bgcolor="#ffffff"
          position="relative"
        >
          {
            <>
              <Box className={classes.root}>
                <ImageList
                  rowHeight={160}
                  className={classes.imageList}
                  cols={3}
                >
                  {Mode === 0 ? (
                    isLoading1 && isLoading2 ? (
                      <Waiting
                        color="#f6f3f3"
                        icon={<PhotoIcon style={{ fontSize: "100" }} />}
                      />
                    ) : fetchedData && Data.length !== 0 ? (
                      Data.map((item, index) => renderPhoto(item, index))
                    ) : !isError2 && !isError1 ? (
                      "Không có dữ liệu"
                    ) : (
                      "Lỗi khi thực hiện lấy dữ liệu"
                    )
                  ) : isLoading3 && isLoading4 ? (
                    <Waiting
                      color="#f6f3f3"
                      icon={<PhotoIcon style={{ fontSize: "100" }} />}
                    />
                  ) : fetchedData2 && Data3.length !== 0 ? (
                    Data3.map((item, index) => renderPhoto3(item, index))
                  ) : !isError4 && !isError3 ? (
                    "Không có dữ liệu"
                  ) : (
                    "Lỗi khi thực hiện lấy dữ liệu"
                  )}
                </ImageList>
              </Box>
              {/* 
              <Box className={classes.root}> 
                <p style={{ padding: "5px", margin: "0px" }}>
                  Dữ liệu ảnh lỗi:
                </p>
                <ImageList
                  rowHeight={160}
                  className={classes.imageList}
                  cols={3}
                >
                  {Mode === 0 ? (
                    isLoading1 && isLoading2 ? (
                      <Waiting
                        color="#f6f3f3"
                        icon={<PhotoIcon style={{ fontSize: "100" }} />}
                      />
                    ) : fetchedData && Data.length !== 0 ? (
                      Data.map((item, index) => renderPhoto(item, index))
                    ) : !isError2 && !isError1 ? (
                      "Không có dữ liệu"
                    ) : (
                      "Lỗi khi thực hiện lấy dữ liệu"
                    )
                  ) : isLoading3 && isLoading4 ? (
                    <Waiting
                      color="#f6f3f3"
                      icon={<PhotoIcon style={{ fontSize: "100" }} />}
                    />
                  ) : fetchedData2 && Data3.length !== 0 ? (
                    Data3.map((item, index) => renderPhoto3(item, index))
                  ) : !isError4 && !isError3 ? (
                    "Không có dữ liệu"
                  ) : (
                    "Lỗi khi thực hiện lấy dữ liệu"
                  )}
                </ImageList>
              </Box>
              <Box className={classes.root}>
                <p style={{ padding: "5px", margin: "0px" }}>
                  Dữ liệu ảnh bình thường:
                </p>
                <ImageList
                  rowHeight={160}
                  className={classes.imageList}
                  cols={3}
                >
                  {Mode === 0 ? (
                    isLoading1 && isLoading2 ? (
                      <Waiting
                        color="#f6f3f3"
                        icon={<PhotoIcon style={{ fontSize: "100" }} />}
                      />
                    ) : fetchedData && Data2.length !== 0 ? (
                      Data2.map((item, index) => renderPhoto(item, index))
                    ) : !isError2 && !isError1 ? (
                      "Không có dữ liệu"
                    ) : (
                      "Lỗi khi thực hiện lấy dữ liệu"
                    )
                  ) : isLoading3 && isLoading4 ? (
                    <Waiting
                      color="#f6f3f3"
                      icon={<PhotoIcon style={{ fontSize: "100" }} />}
                    />
                  ) : fetchedData2 && Data4.length !== 0 ? (
                    Data4.map((item, index) => renderPhoto3(item, index))
                  ) : !isError4 && !isError3 ? (
                    "Không có dữ liệu"
                  ) : (
                    "Lỗi khi thực hiện lấy dữ liệu"
                  )}
                </ImageList>
              </Box>*/}
            </>
          }
        </Box>
        <Box style={{ height: "100%" }} p={0} flex="0.25" bgcolor="#f1f1f1">
          {Mode === 0 ? (
            isLoading1 && isLoading2 ? (
              <Loading />
            ) : (
              <Detail />
            )
          ) : isLoading3 && isLoading4 ? (
            <Loading />
          ) : (
            <Detail2 />
          )}
        </Box>
      </Box>
    </>
  );
};

export default PhotoMS;
