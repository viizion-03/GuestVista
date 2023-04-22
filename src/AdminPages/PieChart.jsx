import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

function createPieChart(data) {
  const lowPriceCount = data.filter((item) => item.price <= 350).length;
  const mediumPriceCount = data.filter(
    (item) => item.price > 350 && item.price < 450
  ).length;
  const highPriceCount = data.filter((item) => item.price >= 450).length;

  const pieChart = new Chart(document.getElementById("pie-chart"), {
    type: "pie",
    data: {
      labels: ["Low Prices(<300)", "Medium Prices(<300||>450)", "High Prices(>450)"],
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

  useEffect(() => {
    fetch(
      "https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json?orderBy=\"$key\""
    )
      .then((response) => response.json())
      .then((data) => setData(Object.values(data)));
  }, []);

  useEffect(() => {
    if (data.length) {
      createPieChart(data);
    }
  }, [data]);

  return (
    <div>
      <canvas id="pie-chart"></canvas>
    </div>
  );
}

export default PieChart;