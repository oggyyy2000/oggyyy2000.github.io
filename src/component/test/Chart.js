import { Bar } from "react-chartjs-2";
import { Chart, data, options } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";
import { useTheme } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";

const ChartView = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const profitChartRef = useRef();
  var ctx = "myChart";
  const chart = props.chart;

  if (profitChartRef?.current) {
    //profitChartRef.current.chartInstance.render();
    //profitChartRef.current.chartInstance.destroy();
  }

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          backgroundColor: chart?.BackgroundCols || [],
          data: chart?.Datas || [],
          label: ` Tinh trang thiet bi`,
        },
      ],
      labels: chart?.Labels || [],
    },
    options: {
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
              fontColor: theme.palette.text.secondary,
              beginAtZero: true,
              min: 0,
              max: 10,
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

  function ClickHandler(click) {
    const points = myChart.getElementsAtEventForMode(
      click,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length) {
      const firstPoint = points[0];
      const label = myChart.data.labels[firstPoint._index];
      const value =
        myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
      dispatch({ type: actions.idthietbi, data: label });
      dispatch({
        type: actions.idanh,
        data: {},
      });
    }
  }

  return (
    <canvas
      id="myChart"
      onClick={ClickHandler}
      style={{ height: "100%", width: "100%" }}
    >
      <Bar ref={profitChartRef} data={data} options={options} />
    </canvas>
  );
};

export default ChartView;
