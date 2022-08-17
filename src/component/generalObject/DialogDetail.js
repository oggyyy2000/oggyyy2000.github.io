import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDetail(props) {
  const classes = useStyles();
  const post = props.data;
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(true);

  if (post.muc_on_dinh <= 50) {
    setIcon(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button component={"C"} onClick={handleClickOpen}>
        Xem chi tiết
        {icon ? (
          <VerifiedUserIcon style={{ color: "green" }} />
        ) : (
          <ErrorOutlineIcon style={{ color: "red" }} />
        )}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Chi tiết của {post.ma_thiet_bi}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              component={"C"}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            Mã thiết bị: {post.ma_thiet_bi} {"  |  "}
            Loại thiết bị: {post.loai_thiet_bi}
          </ListItem>
          <Divider />
          <ListItem>
            Trạng thái: {post.trang_thai} {"  |  "}
            Mức ổn định: {post.muc_on_dinh}
            <br />
          </ListItem>
          <Divider />
          <ListItem>
            Tọa độ: {post.toa_do} {" | "}
            Đường dây: {post.duong_day} <br />
          </ListItem>
          <Divider />
          <ListItem>
            Thiết bị công trình cha: {post.thiet_bi_cong_trinh_cha}
            {" | "}
            Thiết bị công trình: {post.thiet_bi_cong_trinh} <br />
          </ListItem>
          <Divider />
          <ListItem>
            Số thứ tự: {post.STT} {" | "}
            Serial: {post.so_che_tao_serial} <br />
          </ListItem>
          <Divider />
          <ListItem>
            Ngày vận hành: {post.ngay_van_hanh} {" | "}
            CMIS: {post.ma_CMIS}
            <br />
          </ListItem>
          <Divider />
          <ListItem>
            TSCD: {post.so_TSCD}
            {" | "}
            Tình trạng vận hành: {post.tinh_trang_van_hanh} <br />
          </ListItem>
          <Divider />
          <ListItem>
            Mã liên kết khác: {post.ma_lien_ket_khac} {" | "}
            Hãng sản xuất: {post.hang_san_xuat} <br />
          </ListItem>
          <Divider />
          <ListItem>
            Nhà cung cấp: {post.nha_cung_cap} {" | "}
            Nước sản xuất: {post.nuoc_san_xuat}
            <br />
          </ListItem>
          <Divider />
          <ListItem>
            Sở hữu: {post.so_huu} {" | "}
            Ngày lắp đặt: {post.ngay_lap_dat} <br />
          </ListItem>
          <Divider />
          <ListItem>
            Năm sản xuất: {post.nam_san_xuat} {" | "}
            Ngày sửa đổi: {post.ngay_sua_doi}
            <br />
          </ListItem>
          <Divider />
          <ListItem>
            Ghi chú: {post.ghi_chu} {" | "}
            Đơn vị: {post.don_vi} <br />
          </ListItem>
          <Divider />
          <ListItem>
            Chi tiết: {post.chi_tiet_tbi} {" | "}
            Mã bất thường: {post.ma_bat_thuong}
            <br />
          </ListItem>
          <Divider />
          <ListItem>
            Mã tuyến: {post.ma_tuyen} <br />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
