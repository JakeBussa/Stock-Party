import React from "react";
import "./Description.css";

export default class Description extends React.Component {
  render() {
    return (
      <>
        <h1>Stock Party!</h1>
        <div
          style={{
            backgroundColor: "rgb(45,45,45)",
            borderRadius: "10px",
            margin: "5px 200px 5px 200px",
            display:"inline-block"
          }}
        >
          <p>
            Have you ever woken up in the middle of the night in a cold sweat and full of regret because you didn't
            invest in Amazon when it was a small book company? Well, if this happens to be the case, you can feel that
            regret with other investments too! <span className="lol">😎</span> With this little app, you will be able
            to select an investment and see how well it performed with a given date range. Here's some info to get you
            started:
          </p>
          <ul className="button-info-list">
            <li>
              Clicking the <span className="button-info">Stock</span> dropdown button will list the available stocks to
              choose from.
            </li>
            <li>
              The <span className="button-info">Amount</span> field is the number of stocks that you wish to purchase.
            </li>
            <li>
              Clicking the <span className="button-info">Start Date</span> calendar will list the dates the stock
              has existed for. The date entered represents when you purchased a particular investment.
            </li>
            <li>
              Similarly, the <span className="button-info">End Date</span> calendar will list the dates after the&nbsp;
              <span className="button-info">Start Date</span> that the stock has existed for. This represents the date
              in which you sold an investment.
            </li>
          </ul>
          <p>
            The line graph after the form shows how the stock performed over time. This graph is created based off of
            the <span className="button-info">Stock</span>, <span className="button-info">Start Date</span>, and &nbsp;
            <span className="button-info">End Date</span> values. Past that, there's a section that will show you how
            much that stock is worth now.
          </p>
        </div>
      </>
    );
  }
}
