import React from "react";
import "./StockDetails.css"

export default class StockDetails extends React.Component {
  render () {
    return (
      <ul className="">
        <li>
          <StockPicker stockSymbols={["Stock 1", "Stock 2", "Stock 3"]} />
        </li>
        <li>
          <StockAmount />
        </li>
        <li>
          <BeginYear />
        </li>
        <li>
          <EndYear />
        </li>
      </ul>
    );
  }
}

const StockPicker = (props) => {
  return (
    <select>
      {
        props.stockSymbols.map(stockSymbol =>
          <option>
            {stockSymbol}
          </option>
        )
      }
    </select>
  );
}

function StockAmount (props) {
  return (
    <div className="stockAmount">
      <label>Stock Amount</label>
      <input type="text" />
    </div>
  );
}

function BeginYear (props) {
  return (
    <>
      <label>
        Begin Year
      </label>
    </>
  );
}

function EndYear (props) {
  return (
    <>
      <label>
        End Year
      </label>
    </>
  );
}
