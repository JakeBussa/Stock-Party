import React from "react";
import { getStock } from "../../util/StockUtil";

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

    // when parsing the date, would somehow be one day behind? Javascript is weird
    const formattedStartDate = this.addDays(new Date(startDate), 1).toLocaleDateString();
    const formattedEndDate = this.addDays(new Date(endDate), 1).toLocaleDateString();

    return (
      <div
        style={{
          backgroundColor: "rgb(45,45,45)",
          textAlign: "center",
          margin: "10px 200px 20px 200px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontSize: "50px", margin: "0px" }}>
          Your Performance
        </h2>
        <div style={{ margin: "10px 10px 10px 10px" }}>
          <label style={{ fontSize: "30px" }}>
            Worth in {formattedStartDate}: ${startDateValue}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Worth in {formattedEndDate}: ${endDateValue}
          </label>
        </div>
        <label style= {{ fontSize: "30px" }}>
          Performance:&nbsp;
          <span
            style= {{ color: hasPositivePerformance ? "green" : "red"}}>
            { `${hasPositivePerformance ? "+" : "-"}$${stockPerformance}` }
          </span>
        </label>
      </div>
    );
  }
}
