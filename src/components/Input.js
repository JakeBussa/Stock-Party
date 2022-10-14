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

    const {
      selectedStockSymbol,
      stockAmount,
      startDate,
      endDate
    } = this.state.data;

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
  getStartDate = (targetStockSymbol) => {
    const stock = this.state.data.stockData.find(e => e.stockSymbol === targetStockSymbol);
    const beginDateAndClosingPrice = stock.datesAndClosingPrices[0];
    return beginDateAndClosingPrice.date;
  }

  getEndDate = (targetStockSymbol) => {
    const stock = this.state.data.stockData.find(e => e.stockSymbol === targetStockSymbol);
    const lastDateAndClosingPrice = stock.datesAndClosingPrices[stock.datesAndClosingPrices.length - 1];
    return lastDateAndClosingPrice.date;
  }

  render () {
    const { stockSymbols, stockAmount, startDate, endDate } = this.state.data;

    const formattedStartDate = new Date(startDate).toISOString().slice(0,10);
    const formattedEndDate = new Date(endDate).toISOString().slice(0,10);

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
                <label style={{ marginRight: "10px", fontSize: "25px" }}>Begin Date:</label>
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
