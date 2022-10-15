import React from "react";

export default class StockGraph extends React.Component {
  getStockNameFromSymbol = targetStockSymbol => {
    const stockData = this.props.data.stockData;
    return stockData
      .find(datum => datum.stockSymbol === targetStockSymbol)
      .stockName;
  }

  render() {
    const { selectedStockSymbol } = this.props.data;
    const stockName = this.getStockNameFromSymbol(selectedStockSymbol);

    return (
      <div style={{ backgroundColor: "rgb(0,255,0)", textAlign: "center"}}>
        <h2 style={{ fontSize: "50px" }}>
          {stockName} Performance
        </h2>
      </div>
    );
  }
}
