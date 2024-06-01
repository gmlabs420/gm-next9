"use client";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function GmsGrow() {
  const [holdersData, setHoldersData] = useState([0, 100, 500, 1000, 10000, 100000, 1000000]);
  const [holdersChart, setHoldersChart] = useState(null);

  useEffect(() => {
    if (holdersChart) {
      holdersChart.destroy();
    }

    const ctxHolders = document.getElementById("holdersChart").getContext("2d");

  

    const newHoldersChart = new Chart(ctxHolders, {
      type: "line",
      data: {
        labels: holdersData.map((_, index) => `Data ${index + 1}`),
        datasets: [
          {
            label: "Total Holders",
            data: holdersData,
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toLocaleString(); // Format y-axis labels
              },
            },
          },
        },
      },
    });

    setHoldersChart(newHoldersChart);

    return () => {
      newHoldersChart.destroy();
    };
  }, [holdersData]);

  return (
    <section className="grow-module">
      <h1>GROW</h1>

      <div className="info-container">
        <div className="info-box">
          <h3>Total GMs</h3>
          <div className="recessed-field">
            <h3>1000</h3>
          </div>
        </div>
        <div className="info-box">
          <h3>Total Holders</h3>
          <div className="recessed-field">
            <h3>300</h3>
          </div>
        </div>
      </div>

      <div className="chart-box">
        <h3>Total Holders Over Time</h3>
        <canvas id="holdersChart"></canvas>
      </div>
    </section>
  );
}
