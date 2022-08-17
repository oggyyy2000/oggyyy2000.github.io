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
import axios from "axios";
import { get } from "jquery";
import { Chart, data, options } from "chart.js";
import noterrorinsuTT from "./icon/not_error_insuTT.png";

const Bieudothongke = (props) => {
  const urlt = "http://10.0.17.28:8000/thietbituyensfilter/tuyen/T4/";
  const [chart, setChart] = useState([]);
  const theme = useTheme();

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

  function ClickHandler(click) {
    const points = myChart.getElementsAtEventForMode(
      click,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length) {
      const firstPoint = points[0];
      // console.log(points);
      // console.log(firstPoint);
      const label = myChart.data.labels[firstPoint._index];
      const value =
        myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
      console.log(label);
      console.log(value);
    }
  }

  // const Headto = document.getElementById("myDiv");
  // function openDiv(click) {
  //   const points = myChart.getElementsAtEventForMode(
  //     click,
  //     "nearest",
  //     { intersect: true },
  //     true
  //   );
  //   const firstPoint = points[0];
  //   // console.log(points);
  //   // console.log(firstPoint);
  //   const label = myChart.data.labels[firstPoint._index];
  // }

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          backgroundColor: "rgba(124, 252, 0)",
          data: [
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
            "100",
          ],
          label: ` Tinh trang thiet bi`,
        },
      ],
      labels: [
        "VT1",
        "VT2",
        "VT3",
        "VT4",
        "VT5",
        "VT6",
        "VT7",
        "VT8",
        "VT9",
        "VT10",
        "VT11",
        "VT12",
        "VT13",
        "VT14",
        "VT15",
        "VT16",
        "VT17",
        "VT18",
        "VT19",
        "VT20",
        "VT21",
        "VT22",
        "VT23",
      ],
    },
    options: {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      events: ["mousemove", "click"],
      onHover: (event, chartElement) => {
        event.target.style.cursor = chartElement[0] ? "pointer" : "default";
      },

      scales: {
        xAxes: [
          {
            barThickness: 24,
            maxBarThickness: 30,
            barPercentage: 1.0,
            categoryPercentage: 1.0,
            ticks: {
              minRotation: 20,
              fontColor: theme.palette.text.secondary,
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
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: "index",
        titleFontColor: theme.palette.text.primary,
      },
    },
  });

  return (
    <Card {...props}>
      <CardHeader title="THỐNG KÊ THIẾT BỊ" />
      <Divider />
      <CardContent>
        <Box
          style={{
            height: 300,
            position: "relative",
            overflowX: "auto",
          }}
        >
          <canvas
            id="myChart"
            onClick={ClickHandler}
            style={{ height: "100%", width: "100%" }}
          >
            <Bar data={data} options={options} />
          </canvas>
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
