import React from 'react';
import { Line } from 'react-chartjs-2';
import './StockChart.css';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(0, 0, 0)',
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const StockChart = () => (
  <>
    <div className="stock-chart__wrapper">
        <Line data={data} options={options} id="stock-chart"/>
    </div>
  </>
);

export default StockChart;