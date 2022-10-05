import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Resize, ResizeHorizon, ResizeVertical } from "react-resize-layout";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";
import Map_Item from "./Map_Item";

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
        <Box p={3}>
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
    id: `sub-tab-${index}`,
    "aria-controls": `sub-tab1panel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    position: "absolute",
    width: "80%",
    height: "80%",
    backgroundColor: theme.palette.background.paper,
    //border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },
}));

export default function DSBT() {
  const classes = useStyles();
  const urldsbt = process.env.REACT_APP_API_URL + "getbatthuong/";
  const [modalStyle] = React.useState(getModalStyle);
  const [rows_cxl, setRowsCXL] = useState([]);
  const [rows_dxl, setRowsDXL] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [Detail, setDetail] = useState({});
  const [value, setValue] = React.useState(0);
  const tuyen = "T87";
  const urlvt = `${process.env.REACT_APP_API_URL}getallvitribytuyens?${
    tuyen ? "&ma_tuyen=" + tuyen : ""
  }`;
  const urlt = `${process.env.REACT_APP_API_URL}getalltuyens`;
  const [ListVTT, setListVTT] = useState([]);
  const [ListT, setListT] = useState([]);

  useEffect(() => {
    async function getDatavtt() {
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
          //  console.log(res.status);
        }
        return res.data;
      } catch (err) {
        console.error(err);
      }
    }

    getDatavtt().then((res) => {
      setListT(res);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    // const top = 50 + rand();
    // const left = 50 + rand();

    const top = 50; //+ rand();
    const left = 50; // + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const GetDataTable = async () => {
    try {
      axios.get(urldsbt).then((response) => {
        let temp_cxl = [];
        let temp_dxl = [];
        let res_data = response?.data;
        for (let i = 0; i < res_data.length; i++) {
          let item = res_data[i];
          let TenTuyen = ListT.find(
            (x) => x.ma_tuyen === item.ma_tuyen
          )?.ten_tuyen;
          let new_item = {
            id: i,
            ...res_data[i],
            ten_tuyen: TenTuyen || item.ma_tuyen,
          };
          if (item.tinh_trang_xu_ly !== "da_xu_ly") {
            temp_cxl.push(new_item);
          } else {
            temp_dxl.push(new_item);
          }
        }
        setRowsCXL(temp_cxl);
        setRowsDXL(temp_dxl);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDataTable();
  }, []);

  useEffect(() => {
    GetDataTable();
  }, [ListT]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const FindDataCXL = (id) => {
    const data = rows_cxl.find((item) => item.id === id);
    handleOpen();
    setDetail(data);
  };

  const FindDataDXL = (id) => {
    const data = rows_dxl.find((item) => item.id === id);
    handleOpen();
    setDetail(data);
  };

  const UpdateDataByCheckBox = (item) => {
    let data = item?.row;
    delete data.id;
    let status =
      data?.tinh_trang_xu_ly === "da_xu_ly" ? "chua_xu_ly" : "da_xu_ly";
    data.tinh_trang_xu_ly = status;

    axios
      .put(
        process.env.REACT_APP_API_URL +
          "capnhatbatthuong/" +
          data?.ma_bat_thuong,
        data
      )
      .then((response) => {
        GetDataTable();
      });
  };

  const columns_cxl = [
    { field: "id", headerName: "STT", width: 120 },
    {
      field: "ten_tuyen",
      headerName: "Tên tuyến",
      width: 350,
    },
    {
      field: "ma_vi_tri",
      headerName: "Mã vị trí",
      width: 150,
    },
    {
      field: "ngay_kiem_tra",
      headerName: "Ngày Kiếm Tra",
      width: 250,
      editable: true,
    },
    {
      field: "loai_bat_thuong",
      headerName: "Loại bất thường",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Hành động",
      editable: false,
      width: 180,
      renderCell: (params) => (
        <Button
          onClick={() => {
            FindDataCXL(params.id);
          }}
          component={"C"}
        >
          <MoreVertIcon /> Chi Tiết
        </Button>
      ),
    },
    {
      field: "actions2",
      headerName: "Trạng thái",
      editable: false,
      width: 180,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params?.row?.tinh_trang_xu_ly === "da_xu_ly"}
              onChange={() => UpdateDataByCheckBox(params)}
            />
          }
          label={
            params?.row?.tinh_trang_xu_ly === "da_xu_ly"
              ? "Đã xử lý"
              : "Chưa xử lý"
          }
        />
      ),
    },
  ];

  const columns_dxl = [
    { field: "id", headerName: "STT", width: 120 },
    {
      field: "ten_tuyen",
      headerName: "Tên tuyến",
      width: 350,
    },
    {
      field: "ma_vi_tri",
      headerName: "Mã vị trí",
      width: 150,
    },
    {
      field: "ngay_kiem_tra",
      headerName: "Ngày Kiếm Tra",
      width: 250,
      editable: true,
    },
    {
      field: "loai_bat_thuong",
      headerName: "Loại bất thường",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Hành động",
      editable: false,
      width: 180,
      renderCell: (params) => (
        <Button
          onClick={() => {
            FindDataDXL(params.id);
          }}
          component={"C"}
        >
          <MoreVertIcon /> Chi Tiết
        </Button>
      ),
    },
    {
      field: "actions2",
      headerName: "Trạng thái",
      editable: false,
      width: 180,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params?.row?.tinh_trang_xu_ly === "da_xu_ly"}
              onChange={() => UpdateDataByCheckBox(params)}
            />
          }
          label={
            params?.row?.tinh_trang_xu_ly === "da_xu_ly"
              ? "Đã xử lý"
              : "Chưa xử lý"
          }
        />
      ),
    },
  ];

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Resize handleWidth="10px" handleColor="#f1f1f1">
        <ResizeHorizon width={"50%"} className="video">
          <center>
            <TransformWrapper
              defaultScale={1}
              defaultPositionX={200}
              defaultPositionY={100}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                  <Box>
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
                          src={`${process.env.REACT_APP_API_URL}${Detail?.hinh_anh_bat_thuong?.image}`}
                          style={{ width: "100%", objectFit: "cover" }}
                          alt="view_img"
                        />
                      </TransformComponent>
                    </div>
                  </Box>
                </React.Fragment>
              )}
            </TransformWrapper>
          </center>
        </ResizeHorizon>
        <ResizeHorizon minWidth="200px" width={"50%"}>
          <Map_Item tuyen={Detail?.ma_tuyen} VTT={Detail?.ma_vi_tri} />
        </ResizeHorizon>
      </Resize>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Chưa xử lý" {...a11yProps(0)} component={"C"} />
            <Tab label="Đã xử lý" {...a11yProps(1)} component={"C"} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <DataGrid
            rows={rows_cxl}
            columns={columns_cxl}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
            sortModel={[
              {
                field: "ngay_kiem_tra",
                sort: "desc",
              },
            ]}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DataGrid
            rows={rows_dxl}
            columns={columns_dxl}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
            sortModel={[
              {
                field: "ngay_kiem_tra",
                sort: "desc",
              },
            ]}
          />
        </TabPanel>
      </div>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}
