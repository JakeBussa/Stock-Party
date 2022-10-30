import React from "react";
import "./App.css"
import Description from "./components/description/Description.jsx";
import Input from "./components/input/Input.jsx";
import StockGraph from "./components/stockgraph/StockGraph.jsx";
import Output from "./components/output/Output.jsx";
import stockData from "./data/processed/StockData.json";
import { getStockSymbols, getStartDate, getEndDate } from "./util/StockUtil";

export default class App extends React.Component {
  constructor (props) {
    super(props);

    const stockSymbols = getStockSymbols(stockData);
    const startDate = getStartDate(stockData, stockSymbols[0]);
    const endDate = getEndDate(stockData, stockSymbols[0]);

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

  setSelectedStockSymbol = newSelectedStockSymbol => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        selectedStockSymbol: newSelectedStockSymbol
      }
    }))
  }

  setStockAmount = newStockAmount => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,        
        stockAmount: newStockAmount
      }
    }));
  }

  setStartDate = newStartDate => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,        
        startDate: newStartDate
      }
    }));
  }

  setEndDate = newEndDate => {
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
