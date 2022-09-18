import React from "react";
import "./StockDetails.css"

export default class StockDetails extends React.Component {
  render () {
    return (
      <div style={{ textAlign: "center", backgroundColor: "rgb(0,0,255)", display: "grid"}}>
        <div style={{ backgroundColor: "rgb(50,50,255)", margin: "10px 10px 10px 10px", display: "inline-block"}}>
          <ul className="bullet-style">
            <li style={{ display: "inline", marginRight: "10px"}}>
              <StockPicker stockSymbols={["Stock 1", "Stock 2", "Stock 3"]} />
            </li>
            <li style={{ display: "inline", marginRight: "10px" }}>
              <StockAmount />
            </li>
            <li style={{ display: "inline", marginRight: "10px" }}>
              <BeginYear />
            </li>
            <li style={{ display: "inline" }}>
              <EndYear />
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

const StockPicker = (props) => {
  return (
    <select style= {{ fontSize: "25px", fontColor: "black" }}>
      {
        props.stockSymbols.map(stockSymbol =>
          <option key={stockSymbol}>
            {stockSymbol}
          </option>
        )
      }
    </select>
  );
}

const StockAmount = (props) => {
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

const BeginYear = (props) => {
  return (
    <>
      <label style={{ marginRight: "10px", fontSize: "25px" }}>Begin Year:</label>
      <input type="date" style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }} />
    </>
  );
}

const EndYear = (props) => {
  return (
    <>
      <label style={{ marginRight: "10px", fontSize: "25px" }}>End Year:</label>
      <input type="date" style={{ minWidth: "180px", maxWidth: "180px", fontSize: "25px" }} />
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
