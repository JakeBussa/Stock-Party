import React from "react";
import "./App.css"
import Description from "./components/Description.js";
import Input from "./components/Input.js";
import StockGraph from "./components/StockGraph.js";
import Output from "./components/Output.jsx";
import stockData from "./data/processed/StockData.json";

export default class App extends React.Component {
  constructor (props) {
    super(props);

    const stockSymbols = getStockSymbols();
    const startDate = getStartDate(stockSymbols[0]);
    const endDate = getEndDate(stockSymbols[0]);

    this.state = {
      data: {
        stockData,
        stockSymbols,
        selectedStockSymbol: stockSymbols[0],
        stockAmount: 0,
        startDate,
        endDate
      }
    };
  }

  setSelectedStockSymbol (newSelectedStockSymbol) {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        selectedStockSymbol: newSelectedStockSymbol
      }
    }))
  }

  setStockAmount (newStockAmount) {
    this.setState(prevState => ({
      data: {
        ...prevState.data,        
        stockAmount: newStockAmount
      }
    }));
  }

  setStartDate (newStartDate) {
    this.setState(prevState => ({
      data: {
        ...prevState.data,        
        startDate: newStartDate
      }
    }));
  }

  setEndDate (newEndDate) {
    this.setState(prevState => ({
      data: {
        ...prevState.data,        
        endDate: newEndDate
      }
    }));
  }

  render () {
    return (
      <>
        <Description />
        <Input
          data={this.state.data}
          setSelectedStockSymbol={this.setSelectedStockSymbol.bind(this)}
          setStartDate={this.setStartDate.bind(this)}
          setEndDate={this.setEndDate.bind(this)}
          setStockAmount={this.setStockAmount.bind(this)}
        />
        <StockGraph 
          data={this.state.data}
        />
        <Output 
          data={this.state.data}
        />
      </>
    );
  }
}

const getStockSymbols = () => {
  return stockData.map(e => e.stockSymbol);
}

const getStartDate = (targetStockSymbol) => {
  const stock = stockData.find(e => e.stockSymbol === targetStockSymbol);
  const beginDateAndClosingPrice = stock.datesAndClosingPrices[0];
  return beginDateAndClosingPrice.date;
}

const getEndDate = (targetStockSymbol) => {
  const stock = stockData.find(e => e.stockSymbol === targetStockSymbol);
  const lastDateAndClosingPrice = stock.datesAndClosingPrices[stock.datesAndClosingPrices.length - 1];
  return lastDateAndClosingPrice.date;
}
