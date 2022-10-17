import React from "react";
import "./Input.css"

const STOCK_AMOUNT_LIMIT = 10000;

export default class Input extends React.Component {

  constructor(props) {
    super(props);

    const {
      stockData,
      stockSymbols,
      selectedStockSymbol,
      stockAmount,
      startDate,
      endDate
    } = this.props.data;

    this.state = {
      data: {
        stockData,
        stockSymbols,
        selectedStockSymbol,
        stockAmount,
        startDate,
        endDate
      }
    }
  }

  /* setters */
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

  /* handlers */
  handleSubmit = e => {
    e.preventDefault();

    // grab the values from the elements within the form
    // can't use the state because it's not fully up to date
    const selectedStockSymbol = e.target[0].value;
    const stockAmount = parseInt(e.target[1].value);
    const startDate = e.target[2].value;
    const endDate = e.target[3].value;

    /* date validation */
    // check that the begin date exists for the given stock
    if (! this.valiDate(selectedStockSymbol, startDate)) {
      alert(`${selectedStockSymbol} doesn't have a start date of ${startDate}.\nUse another start date instead.`)
      return;
    }

    // check that the end date exists for the given stock
    if (! this.valiDate(selectedStockSymbol, endDate)) {
      alert(`${selectedStockSymbol} doesn't have an end date of ${endDate}.\nUse another end date instead.`)
      return;
    }

    // check that the start date doesn't come after the end date
    if (! this.validDateRange(selectedStockSymbol, startDate, endDate)) {
      alert(`The start date ${startDate} shouldn't come after the end date ${endDate}.`)
      return;
    }

    this.props.setSelectedStockSymbol(selectedStockSymbol);
    this.props.setStockAmount(stockAmount);
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  handleStockPickerOnChange = e => {
    const stockSymbol = e.target.value;
    const startDate = this.getStartDate(stockSymbol);
    const endDate = this.getEndDate(stockSymbol);

    this.setStartDate(startDate);
    this.setEndDate(endDate);
  }

  handleStockAmountOnChange = e => {
    const stockAmount = e.target.value;

    // don't accept negatives and don't go over the stock limit amount
    if (stockAmount.charAt(0) !== "-" && stockAmount <= STOCK_AMOUNT_LIMIT) {
      this.setStockAmount(stockAmount);
    }
  }

  handleStartDateOnChange = e => {
    const startDate = e.target.value;
    this.setStartDate(startDate);
  }

  handleEndDateOnChange = e => {
    const endDate = e.target.value;
    this.setEndDate(endDate);
  }

  /* utilties */
  getStock = targetStockSymbol => {
    return this.state.data.stockData.find(e => e.stockSymbol === targetStockSymbol);
  }

  getStartDate = targetStockSymbol => {
    const stock = this.getStock(targetStockSymbol);
    const beginDateAndClosingPrice = stock.datesAndClosingPrices[0];
    return beginDateAndClosingPrice.date;
  }

  getEndDate = targetStockSymbol => {
    const stock = this.getStock(targetStockSymbol);
    const lastDateAndClosingPrice = stock.datesAndClosingPrices[stock.datesAndClosingPrices.length - 1];
    return lastDateAndClosingPrice.date;
  }

  // checks whether the target date exists for the given stock
  valiDate = (targetStockSymbol, targetDate) => {
    const stock = this.getStock(targetStockSymbol);
    const dateExists = stock.datesAndClosingPrices
      .map(dateAndClosingPrice => new Date(dateAndClosingPrice.date).toLocaleDateString())
      .find(date => date === new Date(targetDate).toLocaleDateString());

      return dateExists;
  }

  // checks whether the target start date comes before the target end date
  // assumes valid target start and end dates
  validDateRange = (targetStockSymbol, targetStartDate, targetEndDate) => {
    const stock = this.getStock(targetStockSymbol);
    const date1 = new Date(targetStartDate);
    const date2 = new Date(targetEndDate);

    return date1 <= date2;
  }

  render () {
    const { stockSymbols, stockAmount, startDate, endDate } = this.state.data;

    // try to format the start and end dates to match the date input components
    let formattedStartDate = startDate;

    try {
      formattedStartDate = new Date(startDate).toISOString().slice(0,10);
    } catch (e) {
      console.log("Error when trying to format start date.");
      console.log(e);
    }

    let formattedEndDate = endDate;

    try {
      formattedEndDate = new Date(endDate).toISOString().slice(0,10);
    } catch (e) {
      console.log("Error when trying to format end date.");
      console.log(e);
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ textAlign: "center", backgroundColor: "rgb(0,0,255)", display: "grid" }}>
          <div style={{ backgroundColor: "rgb(50,50,255)", margin: "10px 10px 10px 10px", display: "inline-block" }}>
            <ul className="bullet-style">
              <li style={{ display: "inline", marginRight: "10px" }}>
              <select onChange={this.handleStockPickerOnChange} style={{ fontSize: "25px", fontColor: "black" }}>
                {
                  stockSymbols.map(stockSymbol =>
                    <option key={stockSymbol}>
                      {stockSymbol}
                    </option>
                  )
                }
              </select>
              </li>
              <li style={{ display: "inline", marginRight: "10px" }}>
                <label style={{ marginRight: "10px", fontSize: "25px" }}>Stock Amount:</label>
                <input 
                  type="number"
                  min="0"
                  max={STOCK_AMOUNT_LIMIT}
                  value={stockAmount}
                  onChange={this.handleStockAmountOnChange}
                  style={{ minWidth: "100px", maxWidth: "100px", fontSize: "25px"}}
                />
              </li>
              <li style={{ display: "inline", marginRight: "10px" }}>
                <label style={{ marginRight: "10px", fontSize: "25px" }}>Start Date:</label>
                <input
                  type="date"
                  value={formattedStartDate}
                  onChange={this.handleStartDateOnChange}
                  style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }}
                />
              </li>
              <li style={{ display: "inline" }}>
                <label style={{ marginRight: "10px", fontSize: "25px" }}>End Date:</label>
                <input
                  type="date"
                  value={formattedEndDate}
                  onChange={this.handleEndDateOnChange}
                  style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }}
                />
              </li>
            </ul>
          </div>
          <div style={{ backgroundColor: "rgb(50,50,255)", margin: "10px 10px 10px 10px", display: "inline-block"}}>
            <button
              type="submit"
              style={{ fontSize: "35px", backgroundColor: "green", borderRadius: "6px", textAlign: "center"}}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}
