import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import '../StockChart/StockChart.css'
import './DashChart.css'
// import * as stockReducer from '../../store/stock'

function DashChart({dateRange, history}) {
  let lineColor;
  if (history[dateRange][0] > history[dateRange][history[dateRange].length - 1]) {
    lineColor = 'rgb(255, 80, 0)';
  } else {
    lineColor = 'rgb(0, 200, 5)';
  }

  const data = {
    labels:history[dateRange],
    datasets: [
      {
        label: 'Price',
        data: history[dateRange],
        fill: false,
        backgroundColor: 'rgb(, 0, 0)',
        borderColor: lineColor,
        borderWidth: '1.5',
      },
    ],
  };

  const options = {
    scales: {
      xAxes: {
        grid: {
          display: false,
        },
        gridLines: {
          display: true,
          color: 'rgb(255,255,255)',
        },
        ticks: {
          display: false
        }
      },
      yAxes:
        {
          grid: {
            display: false,
          },
          gridLines: {
            display: true,
            color: 'rgb(255,255,255)',
         },
          ticks: {
            display: false,
            beginAtZero: true,
          },
        },
    },
    elements: {
      point:{
          radius: 0
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: false
      },
      title: {
        display: false,
        text: (ctx) => {
          const {intersect, mode} = ctx.chart.options.interaction;
          return 'Mode: ' + mode + ', intersect: ' + intersect;
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <>
      <div className="stock-chart__wrapper">
          <Line data={data} options={options} id="stock-chart dash-chart"/>
      </div>
    </>
  )
};

export default DashChart;
