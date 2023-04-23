import React, { useState, useEffect } from "react";
import { Chart } from 'chart.js';
import './addingGuesthouse.scss';

function GuestHousesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      // "https://guestvista-4308f-default-rtdb.firebaseio.com/addGuesthouses.json?orderBy=\"$key\""
      "https://react-project-5130e-default-rtdb.firebaseio.com/addGuesthouses?orderBy=\"$key\""
    )
      .then((response) => response.json())
      .then((data) => setData(Object.values(data)));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const locations = {};
      data.forEach((guesthouse) => {
        if (locations[guesthouse.location]) {
          locations[guesthouse.location]++;
        } else {
          locations[guesthouse.location] = 1;
        }
      });

      const ctx = document.getElementById("guesthousesChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(locations),
          datasets: [
            {
              label: "Number of Guesthouses",
              data: Object.values(locations),
              backgroundColor: "#3e95cd",
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Number of Guesthouses in Available Locations",
          },
        },
      });
    }
  }, [data]);

  return <canvas id="guesthousesChart" className="guesthouses-chart" />;
}

export default GuestHousesChart;