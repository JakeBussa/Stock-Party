import React from "react";
import "./App.css"
import Heading from "./components/Heading.js";
import StockDetails from "./components/StockDetails.js";
import StockGraph from "./components/StockGraph.js";
import PerformanceDetails from "./components/PerformanceDetails.jsx";
import stockData from "./data/processed/StockData.json";

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      performanceDetailsData: {
        startDate: new Date(),
        endDate: new Date()
      }
    };
    console.log(stockData);
  }

  render () {
    return (
      <>
        <Heading />
        <StockDetails />
        <StockGraph />
        <PerformanceDetails performanceDetailsData={this.state.performanceDetailsData} />
      </>
    );
  }
}
