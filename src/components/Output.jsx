import React from "react";
import { getStock } from "../util/StockUtil";

export default class Output extends React.Component {
  /* utilities */
  // add days to a date
  addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  // get the price with the given day
  getDatePrice = (stockData, targetStockSymbol, targetDate) => {
    const stock = getStock(stockData, targetStockSymbol);
    const dateAndClosingPrice = stock
      .datesAndClosingPrices
      .map(dateAndClosingPrice => {
        return {
          date: new Date(dateAndClosingPrice.date).toLocaleDateString(),
          closingPrice: dateAndClosingPrice.closingPrice
        }
      })
      .find(dateAndClosingPrice => dateAndClosingPrice.date === new Date(targetDate).toLocaleDateString());
  
    const closingPrice = dateAndClosingPrice.closingPrice;
  
    if (! closingPrice) {
      console.log("Tried to get price on date, but date doesn't exist");
      return 0;
    }
  
    return parseFloat(closingPrice);
  }

  render() {
    const {
      stockData,
      selectedStockSymbol,
      stockAmount,
      startDate,
      endDate
    } = this.props.data;

    const startDatePrice = this.getDatePrice(stockData, selectedStockSymbol, startDate);
    const endDatePrice = this.getDatePrice(stockData, selectedStockSymbol, endDate);

    const startDateValue = parseFloat((stockAmount * startDatePrice).toFixed(2));
    const endDateValue = parseFloat((stockAmount * endDatePrice).toFixed(2));
    const stockPerformance = parseFloat((endDateValue - startDateValue).toFixed(2));
    const hasPositivePerformance = endDateValue > startDateValue;

    // when parsing the date, would somehow be one day behind? Javascript is weird.
    const formattedStartDate = this.addDays(new Date(startDate), 1).toLocaleDateString();
    const formattedEndDate = this.addDays(new Date(endDate), 1).toLocaleDateString();

    return (
      <div style={{ backgroundColor: "rgb(255,0,0)", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "rgb(255,50,0)", margin: "10px 10px 10px 10px", display: "grid" }}>
          <label style={{ fontSize: "25px" }}>
            Worth in {formattedStartDate}: ${startDateValue}
          </label>
          <label  style={{ fontSize: "25px" }}>
            Worth in {formattedEndDate}: ${endDateValue}
          </label>
        </div>
        <div style={{
          backgroundColor: "rgb(255,50,0)",
          margin: "10px 10px 10px 10px",
          alignItems: "center",
          display: "flex"
        }}>
        <label style= {{ fontSize: "25px" }}>
          Performance:&nbsp;
          <span
            style= {{ color: hasPositivePerformance ? "green" : "red"}}>
            { `${hasPositivePerformance ? "+" : "-"}$${stockPerformance}` }
          </span>
        </label>
        </div>
      </div>
    );
  }
}
