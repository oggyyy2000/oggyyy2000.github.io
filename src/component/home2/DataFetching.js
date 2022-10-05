import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  ThemeProvider,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import axios from "axios";
import GlobalStyles from "../../asset/css/GlobalStyles";
import theme from "../../theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../../mixins/chartjs";
import Bieudothongke from "./bieudothongke";
//import Loading from "./Loading";
//import { MucDoLoi } from "./List";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { ChangerUrl } from "../../util/ChangeUrl";
import SlideshowGallery from "../generalObject/slideshow-gallery/SlideshowGallery2";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { Resize, ResizeHorizon, ResizeVertical } from "react-resize-layout";

const useStyles = makeStyles(() => ({
  root: {
    "&::-webkit-scrollbar": {
      width: 20,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1976d2",
      borderRadius: 20,
      border: "6px solid transparent",
      backgroundClip: "content-box",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgb(17, 82, 147)",
    },
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justify: "center",
    "& > *": {
      justifyContent: "center",
      display: "flex",
    },
  },
}));

function DataFetching(props) {
  const classes = useStyles();
  const [ListTuyen, setListTuyen] = useState([]);
  const [ListThietbi, setListThietBi] = useState({});
  const { tuyen } = props;
  //const [Tuyen, setTuyen] = useState(tuyen);
  const dispatch = useDispatch();
  const anhthietbiloi = useSelector((state) => state.anhthietbiloi);
  const idtuyen = useSelector((state) => state.idtuyen);
  const idanh = useSelector((state) => state.idanh);
  const idthietbi = useSelector((state) => state.idthietbi);
  const [dEtail, setdEtail] = useState({});
  const [page, setPage] = useState(1);
  const urlt = process.env.REACT_APP_API_URL + "getalltuyens";
  const [gridSize, setGridSize] = useState({ panelone: 12, paneltwo: 0 });
  const urltttbgs = `${
    process.env.REACT_APP_API_URL
  }getallttgiamsatthietbis?page=${page}${tuyen ? "&ma_tuyen=" + tuyen : ""}`;

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleChangetb = (event) => {
    setListThietBi(event.target.value);
  };

  /*const handleChangeTuyen = (event) => {
    setTuyen(event.target.value);
  };*/

  useEffect(() => {
    axios
      .get(urlt)
      .then((res) => {
        setListTuyen(res.data);
        //setTuyen(res?.data[0]?.ma_tuyen);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  useEffect(() => {
    axios
      .get(urltttbgs)
      .then((res) => {
        let data = res?.data?.data || [];
        for (let i = 0; i < data?.length; i++) {
          let item = data[i];
          let arr = item[Object.keys(item)[0]];
          var result = groupByKey(arr, "loai_thiet_bi");
          item[Object.keys(item)[0]] = result;
        }

        if (res?.data?.data) {
          res.data.data = data;
        }

        dispatch({ type: actions.anhthietbiloi, data: res.data });
        setdEtail({});
        dispatch({
          type: actions.idanh,
          data: {},
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tuyen, page]);

  let findbykeyinarray = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (Object.keys(array[i])[0] == value) {
        return array[i];
      }
    }
  };

  useEffect(() => {
    let data = anhthietbiloi?.data;
    if (data) {
      let temp = findbykeyinarray(data, idthietbi);
      if (temp) {
        let temp2 = temp[Object.keys(temp)[0]];
        let item = temp2[idanh?.loai]?.find(
          (x) => x.ma_thiet_bi === idanh.ma_thiet_bi
        );
        setdEtail(item);
        if (item) {
          setGridSize({ panelone: 7, paneltwo: 5 });
        } else {
          setGridSize({ panelone: 12, paneltwo: 0 });
        }
      }
    }
  }, [idanh]);

  useEffect(() => {
    setGridSize({ panelone: 12, paneltwo: 0 });
  }, [page]);

  return <Bieudothongke />;
}

export default DataFetching;
