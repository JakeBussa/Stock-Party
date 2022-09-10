import React from "react";

class Heading extends React.Component {
  render() {
    return (
      <>
        <h1>Stock Performance Analyzer</h1>
        <p>
          Have you ever wondered "if I bought this many shares of a company back then, I would have this much now"?
          Well, you're in luck! This little app will allow you to select a stock, amount, start date, end date, and you
          will be able to see how well your investment turned out.
        </p>
      </>
    );
  }
}

export default Heading;
