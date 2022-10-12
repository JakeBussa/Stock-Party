import React from "react";
// todo, call it startDate and endDate instead of year
// todo update date logic so that the user can only enter valid dates
export default class Output extends React.Component {
  render() {
    const {
      stockData,
      selectedStockSymbol,
      stockAmount,
      startDate,
      endDate
    } = this.props.data;

    const startDatePrice = getDatePrice(stockData, selectedStockSymbol, startDate);
    const endDatePrice = getDatePrice(stockData, selectedStockSymbol, endDate);

    const startDateValue = stockAmount * startDatePrice;
    const endDateValue = stockAmount * endDatePrice;
    const stockPerformance = endDate - startDate;
    const hasPositivePerformance = stockPerformance > startDateValue;

    const formattedStartDate = new Date(startDate).toLocaleDateString();
    const formattedEndDate = new Date(endDate).toLocaleDateString();

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
          Performance:
          <span
            style= {{ color: hasPositivePerformance ? "green" : "red"}}>
            { `${hasPositivePerformance ? "+" : "-"}$${Math.abs(100)}` }
          </span>
        </label>
        </div>
      </div>
    );
  }
}

const getDatePrice = (stockData, targetStockSymbol, targetDate) => {
  const stock = stockData.find(e => e.stockSymbol === targetStockSymbol);
  const datePrice = stock.datesAndClosingPrices
    .map(e => e.date)
    .map(e => new Date(e).toLocaleDateString())
    .find(e => e === new Date(targetDate).toLocaleDateString());
  
  if (! datePrice) {
    console.log("Tried to get price on date, but date doesn't exist");
    return 0;
  }

  return parseInt(datePrice);
}
