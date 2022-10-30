import React from "react";
import "./Input.css";
import { getStock, getStartDate, getEndDate } from "../../util/StockUtil";

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

  /* handlers */
  handleSubmit = e => {
    e.preventDefault();

    const stockData = this.props.data.stockData;

    // grab the values from the elements within the form
    // can't use the state because it's not fully up to date
    const selectedStockSymbol = e.target[0].value;
    const stockAmount = parseInt(e.target[1].value);
    const startDate = e.target[2].value;
    const endDate = e.target[3].value;

    /* date validation */
    // check that the begin date exists for the given stock
    if (! this.valiDate(stockData, selectedStockSymbol, startDate)) {
      alert(`${selectedStockSymbol} doesn't have a start date of ${startDate}.\nUse another start date instead.`)
      return;
    }

    // check that the end date exists for the given stock
    if (! this.valiDate(stockData, selectedStockSymbol, endDate)) {
      alert(`${selectedStockSymbol} doesn't have an end date of ${endDate}.\nUse another end date instead.`)
      return;
    }

    // check that the start date doesn't come after the end date
    if (! this.validDateRange(startDate, endDate)) {
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

    const stockData = this.props.data.stockData;

    const startDate = getStartDate(stockData, stockSymbol);
    const endDate = getEndDate(stockData, stockSymbol);

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
  // checks whether the target date exists for the given stock
  valiDate = (stockData, targetStockSymbol, targetDate) => {
    const stock = getStock(stockData, targetStockSymbol);
    const dateExists = stock
      .datesAndClosingPrices
      .map(dateAndClosingPrice => new Date(dateAndClosingPrice.date).toLocaleDateString())
      .find(date => date === new Date(targetDate).toLocaleDateString());

      return dateExists;
  }

  // checks whether the target start date comes before the target end date
  // assumes valid target start and end dates
  validDateRange = (targetStartDate, targetEndDate) => {
    const date1 = new Date(targetStartDate);
    const date2 = new Date(targetEndDate);

    return date1 <= date2;
  }

  // will attempt to format the given date
  // if the date can't be formatted, just returns the date
  formatDate = date => {
    try {
      return new Date(date).toISOString().slice(0,10);
    } catch (e) {
      console.log(`Error when trying to format date: ${date}`);
      console.log(e);
      return date;
    }
  }

  render () {
    const {
      stockSymbols,
      stockAmount,
      startDate,
      endDate
    } = this.state.data;

    // try to format the start and end dates to match the date input components
    const formattedStartDate = this.formatDate(startDate);
    const formattedEndDate = this.formatDate(endDate);

    return (
      <form onSubmit={this.handleSubmit}>
        <div 
          style={{
            textAlign: "center",
            backgroundColor: "rgb(45,45,45)",
            borderRadius: "10px",
            margin: "5px 200px 5px 200px",
            display: "grid"
          }}
        >
          <div style={{ margin: "0px 10px 0px 10px", display: "inline-block" }}>
            <ul className="bullet-style">
              <li style={{ display: "inline", marginRight: "20px" }}>
                <label style={{ marginRight: "10px", fontSize: "25px" }}>
                  Stock:
                </label>
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
              <li style={{ display: "inline", marginRight: "20px" }}>
                <label style={{ marginRight: "10px", fontSize: "25px" }}>
                  Stock Amount:
                </label>
                <input 
                  style={{ minWidth: "100px", maxWidth: "100px", fontSize: "25px"}}
                  type="number"
                  min="0"
                  max={STOCK_AMOUNT_LIMIT}
                  value={stockAmount}
                  onChange={this.handleStockAmountOnChange}
                />
              </li>
              <li style={{ display: "inline", marginRight: "20px" }}>
                <label style={{ marginRight: "10px", fontSize: "25px" }}>
                  Start Date:
                </label>
                <input
                  style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }}
                  type="date"
                  value={formattedStartDate}
                  onChange={this.handleStartDateOnChange}
                />
              </li>
              <li style={{ display: "inline" }}>
                <label style={{ marginRight: "10px", fontSize: "25px" }}>
                  End Date:
                </label>
                <input
                  style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }}
                  type="date"
                  value={formattedEndDate}
                  onChange={this.handleEndDateOnChange}
                />
              </li>
            </ul>
          </div>
          <div style={{ display: "inline-block", marginBottom: "15px" }}>
            <button
              className={"button-style"}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}
