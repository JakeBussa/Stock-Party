import React from "react";

export default class PerformanceDetails extends React.Component {
  render() {
    console.log(this.props);
    const { startDate, endDate } = this.props.performanceDetailsData;
    const performanceValue = 100;
    const hasPositivePerformance = performanceValue >= 0;
    return (
      <div style={{ backgroundColor: "rgb(255,0,0)", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "rgb(255,50,0)", margin: "10px 10px 10px 10px", display: "grid" }}>
          <label style={{ fontSize: "25px" }}>
            Worth in {startDate.toLocaleDateString()}: $100.00
          </label>
          <label  style={{ fontSize: "25px" }}>
            Worth in {endDate.toLocaleDateString()}: $200.00
          </label>
        </div>
        <div style={{
          backgroundColor: "rgb(255,50,0)",
          margin: "10px 10px 10px 10px",
          alignItems: "center",
          display: "flex"
        }}>
        <label style= {{ fontSize: "25px" }}>
          Performance:
          <span
            style= {{ color: hasPositivePerformance ? "green" : "red"}}>
            { `${hasPositivePerformance ? "+" : "-"}$${Math.abs(performanceValue)}` }
          </span>
        </label>
        </div>
      </div>
    );
  }
}


