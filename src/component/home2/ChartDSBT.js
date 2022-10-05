import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";

//ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDSBT(props) {
  const urlDSBTT = `${process.env.REACT_APP_API_URL}getbatthuong/`;
  const [sum, setSum] = useState(0);
  const { tuyen } = props;

  const [DataChart, setDataChart] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 250).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        //var text = "Mai Động - Thanh Nhàn", //ĐZ 178 E1.3 Mai Động - 172 E1.22 Thanh Nhàn
        //textX = Math.round((width - ctx.measureText(text).width) / 2),
        //textY = height / 2;
        //  textX = width - ctx.measureText(text).width - 5,
        //  textY = height - fontSize - 35;
        // ctx.fillText(text, textX, textY);
        /*var text2 = `Tổng số lượng: ${sum}`,
          textX2 = width - ctx.measureText(text2).width - 5,
          textY2 = 10;
        ctx.fillText(text2, textX2, textY2);*/
        let CurrentTime = new Date().getMonth();
        var text3 = `Tổng hợp bất thường T${CurrentTime}:`,
          textX3 = 5,
          textY3 = height - fontSize - 35;
        ctx.fillText(text3, textX3, textY3);
        ctx.save();
      },
    },
  ];

  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  useEffect(() => {
    if (tuyen === "T87") {
      axios
        .get(urlDSBTT)
        .then((res) => {
          if (res?.data) {
            let new_data = groupByKey(res?.data || [], "loai_bat_thuong");

            let ListBg = [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ];

            let ListBorder = [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ];

            let data = {
              labels: [],
              datasets: [
                {
                  label: "Số bất thường",
                  data: [],
                  backgroundColor: [],
                  borderColor: [],
                  borderWidth: 1,
                },
              ],
            };

            /// add data
            let ArrayKey = Object.keys(new_data);
            data.labels = ArrayKey;
            for (let i = 0; i < ArrayKey?.length || 0; i++) {
              let Items = new_data[ArrayKey[i]];
              let count = 0;
              for (let j = 0; j < Items?.length || 0; j++) {
                count++;
              }
              data.datasets[0].data.push(count);
              data.datasets[0].backgroundColor.push(ListBg[i]);
              data.datasets[0].borderColor.push(ListBorder[i]);
            }
            setDataChart(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDataChart({
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      });
    }
  }, []);

  useEffect(() => {
    if (tuyen === "T87") {
      axios
        .get(urlDSBTT)
        .then((res) => {
          if (res?.data) {
            let new_data = groupByKey(res?.data || [], "loai_bat_thuong");

            let ListBg = [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ];

            let ListBorder = [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ];

            let data = {
              labels: [],
              datasets: [
                {
                  label: "Số bất thường",
                  data: [],
                  backgroundColor: [],
                  borderColor: [],
                  borderWidth: 1,
                },
              ],
            };

            /// add data
            let ArrayKey = Object.keys(new_data);
            data.labels = ArrayKey;
            for (let i = 0; i < ArrayKey?.length || 0; i++) {
              let Items = new_data[ArrayKey[i]];
              let count = 0;
              for (let j = 0; j < Items?.length || 0; j++) {
                count++;
              }
              data.datasets[0].data.push(count);
              data.datasets[0].backgroundColor.push(ListBg[i]);
              data.datasets[0].borderColor.push(ListBorder[i]);
            }
            setDataChart(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDataChart({
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [tuyen]);

  return (
    tuyen && <Doughnut data={DataChart} options={options} plugins={plugins} />
  );
}
