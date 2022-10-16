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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BUCKETS = 10;

export default class StockGraph extends React.Component {
  getStockNameFromSymbol = targetStockSymbol => {
    const stockData = this.props.data.stockData;
    return stockData
      .find(datum => datum.stockSymbol === targetStockSymbol)
      .stockName;
  }

  // get all dates between the start date and the end date

  // group by 10 dates
  // get the length of the datesAndPrices and divide by 10
  // if length less than 10, use just the length
  // for each group, sum the date and closingPrice
  // divide the cumSum by the length of the current group to get the average date and closingPrice
  // push the averageDate and averageClosingPrice into an array
  // return this array


  render() {
    const { selectedStockSymbol } = this.props.data;
    const stockName = this.getStockNameFromSymbol(selectedStockSymbol);
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','1','1','2'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(label => 10),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    };

    return (
      <div style={{ backgroundColor: "rgb(0,255,0)", textAlign: "center"}}>
        <h2 style={{ fontSize: "50px" }}>
          {stockName} Performance
        </h2>
        <div style={{ width: "1000px", height: "550px", display: "inline-block"}}>
          <Line data={data} />
        </div>
      </div>
    );
  }
}
