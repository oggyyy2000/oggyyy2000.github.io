import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DSBT() {
  const classes = useStyles();
  const urldsbt = process.env.REACT_APP_API_URL + "getbatthuong/";
  const [modalStyle] = React.useState(getModalStyle);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [Detail, setDetail] = useState({});
  const [checked, setChecked] = React.useState(false);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  useEffect(() => {
    axios.get(urldsbt).then((response) => {
      let temp = [];
      for (let i = 0; i < response?.data.length; i++) {
        temp.push({ id: i, ...response?.data[i] });
      }
      setRows(temp);
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const FindData = (id) => {
    const data = rows.find((item) => item.id === id);
    handleOpen();
    if (data?.tinh_trang_xu_ly !== "chua_xu_ly") {
      setChecked(true);
    } else {
      setChecked(false);
    }
    setDetail(data);
  };

  const columns = [
    { field: "ma_bat_thuong", headerName: "Mã bất thường", width: 200 },
    {
      field: "ma_vi_tri",
      headerName: "Mã vị trí",
      width: 250,
      editable: true,
    },
    {
      field: "ngay_kiem_tra",
      headerName: "Ngày Kiếm Tra",
      width: 250,
      editable: true,
    },
    {
      field: "tinh_trang_xu_ly",
      headerName: "Tình Trạng Xử Lý",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Hành động",
      editable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            FindData(params.id);
          }}
          component={"C"}
        >
          Sửa
        </Button>
      ),
    },
  ];

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const UpdateData = () => {
    let data = Detail;
    delete data.id;
    data.tinh_trang_xu_ly = checked ? "da_xu_ly" : "chua_xu_ly";

    axios
      .put(
        process.env.REACT_APP_API_URL +
          "capnhatbatthuong/" +
          Detail?.ma_bat_thuong,
        data
      )
      .then((response) => {
        axios.get(urldsbt).then((response) => {
          let temp = [];
          for (let i = 0; i < response?.data.length; i++) {
            temp.push({ id: i, ...response?.data[i] });
          }
          setRows(temp);
        });
        handleClose();
      });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p>{Detail?.ma_bat_thuong}</p>
      <img
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        src={`${process.env.REACT_APP_API_URL}${Detail?.hinh_anh_bat_thuong?.image}`}
      />
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="Trạng thái xử lý"
      />
      <Button component={"C"} onClick={() => UpdateData()}>
        Cập nhật
      </Button>
    </div>
  );

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}
