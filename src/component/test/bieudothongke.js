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
  const [chart, setChart] = useState([]);
  const theme = useTheme();
  const anhthietbiloi = useSelector((state) => state.anhthietbiloi);
  const idtuyen = useSelector((state) => state.idtuyen);
  const dispatch = useDispatch();

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
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            max: 7,
          },
          barThickness: 24,
          maxBarThickness: 30,
          barPercentage: 1.0,
          categoryPercentage: 1.0,
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
            max: 100,
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
          <Bar data={data} options={options} onElementsClick={ClickHandler} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Bieudothongke;
