import React from "react";
import "./Input.css"

export default class Input extends React.Component {
  render () {
    return (
      <div style={{ textAlign: "center", backgroundColor: "rgb(0,0,255)", display: "grid" }}>
        <div style={{ backgroundColor: "rgb(50,50,255)", margin: "10px 10px 10px 10px", display: "inline-block" }}>
          <ul className="bullet-style">
            <li style={{ display: "inline", marginRight: "10px" }}>
              <StockPicker props={this.props}/>
            </li>
            <li style={{ display: "inline", marginRight: "10px" }}>
              <StockAmount props={this.props}/>
            </li>
            <li style={{ display: "inline", marginRight: "10px" }}>
              <BeginDate props={this.props}/>
            </li>
            <li style={{ display: "inline" }}>
              <EndDate props={this.props}/>
            </li>
          </ul>
        </div>
        <div style={{ backgroundColor: "rgb(50,50,255)", margin: "10px 10px 10px 10px", display: "inline-block"}}>
          <Submit />
        </div>
      </div>
    );
  }
}

const StockPicker = ({props}) => {
  const setDateRange = (e) => {
    const stockSymbol = e.target.value;
    const startDate = getStartDate(stockSymbol);
    const endDate = getEndDate(stockSymbol);
    props.setStartDate(startDate);
    props.setEndDate(endDate);
  }

  const getStartDate = (targetStockSymbol) => {
    const stock = props.data.stockData.find(e => e.stockSymbol === targetStockSymbol);
    const beginDateAndClosingPrice = stock.datesAndClosingPrices[0];
    return beginDateAndClosingPrice.date;
  }

  const getEndDate = (targetStockSymbol) => {
    const stock = props.data.stockData.find(e => e.stockSymbol === targetStockSymbol);
    const lastDateAndClosingPrice = stock.datesAndClosingPrices[stock.datesAndClosingPrices.length - 1];
    return lastDateAndClosingPrice.date;
  }

  return (
    <select onChange={setDateRange} style={{ fontSize: "25px", fontColor: "black" }}>
      {
        props.data.stockSymbols.map(stockSymbol =>
          <option key={stockSymbol}>
            {stockSymbol}
          </option>
        )
      }
    </select>
  );
}

// todo figure out how to get the stock amount properly and figure out why date is one day off
const StockAmount = ({props}) => {
  const updateStockAmount = (e) => {
    props.setStockAmount(parseInt(e.target.value));
  }

  return (
    <>
      <label style={{ marginRight: "10px", fontSize: "25px" }}>Stock Amount:</label>
      <input 
        type="number"
        min="0"
        max="10000"
        style={{ minWidth: "100px", maxWidth: "100px", fontSize: "25px"}}
      />
    </>
  );
}
// todo add this logic to the end date, just use the startdate and enddate variables instead of defaults, use a single
// date object instead of BeginDate and EndDate
const BeginDate = ({props}) => {
  const updateDate = (e) => {
    props.setStartDate(e.target.value);
  }

  const formattedStartDate = new Date(props.data.startDate).toISOString().slice(0,10);

  return (
    <>
      <label style={{ marginRight: "10px", fontSize: "25px" }}>Begin Date:</label>
      <input
        type="date"
        value={formattedStartDate}
        onChange={updateDate}
        style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }}
      />
    </>
  );
}

const EndDate = ({props}) => {
  const updateDate = (e) => {
    props.setEndDate(e.target.value);
  }

  const formattedEndDate = new Date(props.data.endDate).toISOString().slice(0,10);

  return (
    <>
      <label style={{ marginRight: "10px", fontSize: "25px" }}>End Date:</label>
      <input
        type="date"
        value={formattedEndDate}
        onChange={updateDate}
        style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }}
      />
    </>
  );
}

const Submit = (props) => {
  return (
    <button style={{ fontSize: "35px", backgroundColor: "green", borderRadius: "6px", textAlign: "center"}}>
      Submit
    </button>
  );
}
