import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto";
import './addingGuesthouse.scss';
import { AuthContext } from "../contexts/AuthContext";

function createPieChart(data) {
  const lowPriceCount = data.filter((item) => item.price <= 400).length;
  const mediumPriceCount = data.filter(
    (item) => item.price > 400 && item.price < 500
  ).length;
  const highPriceCount = data.filter((item) => item.price >= 600).length;

  const pieChart = new Chart(document.getElementById("pie-chart"), {
    type: "pie",
    data: {
      labels: ["Low Prices(<400)", "Medium Prices(<400||>=500)", "High Prices(>600)"],
      datasets: [
        {
          label: "Price Ranges",
          data: [lowPriceCount, mediumPriceCount, highPriceCount],
          backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function PieChart() {
  const [data, setData] = useState([]);
  const {guesthouses} = useContext(AuthContext)

  useEffect(() => {
    setData(guesthouses)
  }, [guesthouses])


  // useEffect(() => {
  //   fetch(
  //     // "https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json?orderBy=\"$key\""
  //     "https://react-project-5130e-default-rtdb.firebaseio.com/addGuesthouses?orderBy=\"$key\""
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setData(Object.values(data)));
  // }, []);

  useEffect(() => {
    if (data.length) {
      createPieChart(data);
    }
  }, [data]);

  return (
    <div>
      <canvas id="pie-chart" width="500" height="500" className="pie-chart-wrapper"></canvas>
    </div>
  );
  }

export default PieChart;