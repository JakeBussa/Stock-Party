import Heading from "./components/Heading.js";
import StockDetails from "./components/StockDetails.js";
import StockGraph from "./components/StockGraph";
import PerformanceDetails from "./components/PerformanceDetails";
import "./App.css"
import React from "react";

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      performanceDetailsData: {
        startDate: new Date(),
        endDate: new Date()
      }
    };
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
