import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { getStockNameFromSymbol } from "../util/StockUtil";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NUM_BUCKETS = 8;

export default class StockGraph extends React.Component {
  // get all dates between the start date and the end date
  getDatesAndPricesBetween = (allStockData, targetStockSymbol, targetStartDate, targetEndDate) => {
    targetStartDate = new Date(targetStartDate);
    targetEndDate = new Date(targetEndDate);

    return allStockData
      .find(stockData => stockData.stockSymbol === targetStockSymbol)
      .datesAndClosingPrices
      .filter(dateAndClosingPrice => {
        const currentDate = new Date(dateAndClosingPrice.date);
        return currentDate >= targetStartDate && currentDate <= targetEndDate;
      });
  }

  getGroupedData = datesAndClosingPrices => {
    const numValuesInBucket = Math.round(datesAndClosingPrices.length / NUM_BUCKETS);

    const groupedData = {
      averagedDates: [],
      averagedPrices: []
    };

    // special case - if we have only one value in a bucket 
    if (numValuesInBucket === 1) {
      datesAndClosingPrices.forEach(dateAndClosingPrice => {
        const date = new Date(dateAndClosingPrice.date);
        const price = parseFloat(dateAndClosingPrice.closingPrice);
        groupedData.averagedDates.push(date);
        groupedData.averagedPrices.push(price);
      });
    // bucket normally otherwise
    } else {
      let dates = [];
      let prices = [];

      for (let i = 0; i < datesAndClosingPrices.length; i++) {
        let startNextBucket = (i + 1) % numValuesInBucket === 0;

        if (startNextBucket) {
          const averageDate = this.getAverageDate(dates);
          const averagePrice = this.getAveragePrice(prices);
          groupedData.averagedDates.push(averageDate);
          groupedData.averagedPrices.push(averagePrice);
          dates = [];
          prices = [];
        }

        dates.push(datesAndClosingPrices[i].date);
        prices.push(datesAndClosingPrices[i].closingPrice);
      }

      // may need to get any remaining values within dates and prices
      if (dates.length > 0) {
        const averageDate = this.getAverageDate(dates);
        groupedData.averagedDates.push(averageDate);
        dates = [];
      }

      if (prices.length > 0) {
        const averagePrice = this.getAveragePrice(prices);
        groupedData.averagedPrices.push(averagePrice);
        prices = [];
      }
    }

    return groupedData;
  }

  getAverageDate = dates => {
    const numDates = dates.length;
    const totalMilliseonds = dates
      .map(date => new Date(date).getTime()) // get milliseconds
      .reduce((a, b) => a + b);
    return new Date(totalMilliseonds / numDates);
  }

  getAveragePrice = prices => {
    const numPrices = prices.length;
    const totalPrice = prices
      .map(price => parseFloat(price))
      .reduce((a, b) => a + b);
    return totalPrice / numPrices;
  }

  render() {
    const { stockData, selectedStockSymbol, startDate, endDate } = this.props.data;

    const stockName = getStockNameFromSymbol(stockData, selectedStockSymbol);
    const datesAndPricesBetween = this.getDatesAndPricesBetween(stockData, selectedStockSymbol, startDate, endDate);
    const groupedData = this.getGroupedData(datesAndPricesBetween);

    const labels = groupedData
      .averagedDates
      .map(averageDate => averageDate.toLocaleDateString());

    const data = {
      labels,
      datasets: [
        {
          data: groupedData.averagedPrices,
          pointRadius: 6,
          pointHoverRadius: 8,
          borderColor: "white",
          backgroundColor: "black",
          borderWidth: 3,
          show: false
        }
      ]
    };

    const options = {
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
            color: "white",
            font: {
              size: 25
            }
          },
          ticks: {
            color: "white",
            font: {
              size: 15
            }
          }
        },
        y: {
          title: {
            display: true,
            text: "Price",
            color: "white",
            font: {
              size: 25
            }
          },
          ticks: {
            callback: value => {
              return "$" + value;
            },
            color: "white",
            font: {
              size: 15
            }
          }
        }
      }
    }

    return (
      <div style={{ backgroundColor: "rgb(0,255,0)", textAlign: "center"}}>
        <h2 style={{ fontSize: "50px" }}>
          {stockName} Performance
        </h2>
        <div style={{ width: "1000px", height: "550px", display: "inline-block"}}>
          <Line data={data} options={options}/>
        </div>
      </div>
    );
  }
}
