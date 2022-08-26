import { Bar } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Chart, data, options } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";

const Bieudothongke = (props) => {
  // const urlt = "http://10.0.17.28:8000/thietbituyensfilter/tuyen/T4/";
  const [chart, setChart] = useState([]);
  const theme = useTheme();
  const anhthietbiloi = useSelector((state) => state.anhthietbiloi);
  const idtuyen = useSelector((state) => state.idtuyen);
  const dispatch = useDispatch();

  // lay label va value cua data
  // let TBstable = [];
  // let TBCTC = [];
  // axios
  //   .get(urlt)
  //   .then((res) => {
  //     console.log(res.data);
  //     for (const dataObj of res.data) {
  //       TBstable.push(dataObj.muc_on_dinh);
  //       TBCTC.push(dataObj.thiet_bi_cong_trinh_cha);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log(TBstable, TBCTC);
  const ctx = "myChart";

  function ClickHandler(event) {
    const firstPoint = event[0];
    if (firstPoint) {
      const label = data.labels[firstPoint._index];
      const value =
        data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
      dispatch({ type: actions.idthietbi, data: label });
    }
  }

  const CalcData = () => {
    let ArrayKey = Object.keys(anhthietbiloi[idtuyen] || {});
    let ArrayAvg = [];
    for (let i = 0; i < ArrayKey.length; i++) {
      let data = anhthietbiloi[idtuyen][ArrayKey[i]];
      let sum = 0;
      for (let j = 0; j < data.cdtt.length; j++) {
        sum += parseInt(data.cdtt[j]?.mucdoondinh || 0);
      }

      for (let j = 0; j < data.cdslc.length; j++) {
        sum += parseInt(data.cdslc[j]?.mucdoondinh || 0);
      }

      for (let j = 0; j < data.dday.length; j++) {
        sum += parseInt(data.dday[j]?.mucdoondinh || 0);
      }

      let len = data.cdtt.length + data.cdslc.length + data.dday.length;

      let avg = sum / len;
      ArrayAvg.push(avg.toFixed(2));
    }

    return ArrayAvg;
  };

  const BackgroundCol = () => {
    let backgroundColor = [];
    for (let i = 0; i < datamyChart.length; i++) {
      if (datamyChart[i] >= 70) {
        backgroundColor.push("rgb(0,255,0)");
      } else if (datamyChart[i] >= 50) {
        backgroundColor.push("rgb(255,255,0)");
      } else backgroundColor.push("rgb(255,0,0)");
    }

    return backgroundColor;
  };

  let datamyChart = CalcData();

  const data = {
    datasets: [
      {
        backgroundColor: BackgroundCol,
        data: datamyChart,
        // label: ` Tinh trang thiet bi`,
      },
    ],
    labels: Object.keys(anhthietbiloi[idtuyen] || {}),
  };

  const options = {
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    events: ["mousemove", "click"],
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? "pointer" : "default";
    },
    onClick: (event) => {
      ClickHandler(event);
    },

    scales: {
      xAxes: [
        {
          barThickness: 24,
          maxBarThickness: 30,
          barPercentage: 1.0,
          categoryPercentage: 1.0,
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            max: 6,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [3],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      // backgroundColor: theme.palette.background.paper,
      // bodyFontColor: theme.palette.text.secondary,
      // borderColor: theme.palette.divider,
      // borderWidth: 1,
      // enabled: true,
      // footerFontColor: theme.palette.text.secondary,
      // intersect: false,
      // mode: "index",
      // titleFontColor: theme.palette.text.primary,
      enabled: false,
    },
  };

  return (
    <Card {...props}>
      <CardHeader title="THỐNG KÊ THIẾT BỊ" />
      <Divider />
      <CardContent>
        <Box
          style={{
            height: 300,
          }}
        >
          {/* <canvas
            id="myChart"
            onClick={ClickHandler}
            style={{ height: "100%", width: "100%" }}
          > */}
          <Bar data={data} options={options} onElementsClick={ClickHandler} />
          {/* </canvas> */}
        </Box>
        {/* <Box>
          <div id="myDiv">
            <img src={noterrorinsuTT} height={75} width={40} />
          </div>
        </Box> */}
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Bieudothongke;
