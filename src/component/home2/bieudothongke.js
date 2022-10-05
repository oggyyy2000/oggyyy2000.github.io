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
      dispatch({
        type: actions.idanh,
        data: {},
      });
    }
  }

  const MakeData = () => {
    let DataObj = {};
    //let ArrayAvg = [];
    let ArrayPercent = [];
    let labels = [];
    let backgroundColor = [];
    let data = anhthietbiloi?.data || [];
    //let MaxY = 0;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let inneritem = item[Object.keys(item)[0]];

        let classItem = [
          "cach_dien_silicon",
          "cach_dien_thuy_tinh",
          "day_dien",
        ];
        let sumerror = 0;
        let len = 0;
        for (let j = 0; j < classItem.length; j++) {
          let classItemName = classItem[j];
          let classItemValue = inneritem[classItemName];
          if (classItemValue) {
            for (let x = 0; x < classItemValue.length; x++) {
              if (classItemValue[x].trang_thai != "1_normal") {
                sumerror += 1;
              }
              len += 1;
            }
          }
        }
        //let avg = sumerror !== 0 ? sumerror / len : len;
        if (len !== 0) {
          let percent = 100 - (sumerror / len) * 100;
          ArrayPercent.push(percent);
          //ArrayAvg.push(avg.toFixed(2));

          /*if (avg >= 1) {
            backgroundColor.push("rgb(0,255,0)");
          } else if (avg >= 0.5) {
            backgroundColor.push("rgb(255,255,0)");
          } else backgroundColor.push("rgb(255,0,0)");*/

          /*if (sumerror == 0) {
            backgroundColor.push("rgb(0,255,0)");
          } else if (sumerror < len / 3) {
            backgroundColor.push("rgb(255,255,0)");
          } else backgroundColor.push("rgb(255,0,0)");*/

          if (percent == 100) {
            backgroundColor.push("rgb(0,255,0)");
          } else if (percent < 100 && percent >= 50) {
            backgroundColor.push("rgb(255,255,0)");
          } else backgroundColor.push("rgb(255,0,0)");

          labels.push(Object.keys(item)[0]);
          //MaxY = MaxY < len ? len : MaxY;
        }
      }
    }

    //DataObj["Avg"] = ArrayAvg;
    DataObj["ArrayPercent"] = ArrayPercent;
    DataObj["backgroundColor"] = backgroundColor;
    DataObj["labels"] = labels;
    //DataObj["MaxY"] = MaxY;
    DataObj["MaxX"] = labels?.length || 0;

    return DataObj;
  };

  let datamyChart = MakeData();
  const data = {
    datasets: [
      {
        backgroundColor: datamyChart.backgroundColor,
        data: /*datamyChart.Avg*/ datamyChart.ArrayPercent,
      },
    ],
    labels: datamyChart.labels,
  };

  const options = {
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    //responsive: true,
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
            max: datamyChart?.MaxX || 10,
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
            max: /*datamyChart?.MaxY || 5*/ 100,
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
      enabled: false,
    },
  };

  return (
    <Card {...props}>
      <CardHeader title="THỐNG KÊ THIẾT BỊ" style={{ padding: 6 }} />
      <Divider />
      <CardContent>
        <Box
          style={{
            height: 230,
          }}
          id="canvas-container"
        >
          <Bar data={data} options={options} onElementsClick={ClickHandler} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Bieudothongke;
