import React, { useEffect, useSelector } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import './StockChart.css';
import * as stockReducer from '../../store/stock'




function StockChart({dateRange, symbol, history}) {
  const dispatch = useDispatch();
  // console.log(history[symbol][dateRange])
  // useEffect(()=> {
  //   // dispatch(stockReducer.getStockHistory(symbol))
  // }, [dispatch])
  let lineColor;
  if (history[symbol][dateRange][0] > history[symbol][dateRange][history[symbol][dateRange].length - 1]) {
    lineColor = 'rgb(255, 80, 0)';
  } else {
    lineColor = 'rgb(0, 200, 5)';
  }

  const data = {
    // labels: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
    labels:history[symbol][dateRange],
    datasets: [
      {
        label: 'Price',
        data: history[symbol][dateRange],
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
          <Line data={data} options={options} id="stock-chart"/>
      </div>
    </>
  )
};

export default StockChart;
