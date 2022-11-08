import React from "react";
import "../App.css";
import Output from "../components/output/Output.jsx";

export default {
  title: "Components/Output",
  component: Output,
  argTypes: {
    stockData: {
      control: "null"
    },
    stockSymbols: {
      control: "null"
    },
    selectedStockSymbol: {
      control: "null"
    },
    stockAmount: {
      control: {
        type: "number",
        min: 0,
        max: 10000
      }
    },
    startDate: {
      control: "null"
    },
    endDate: {
      control: "null"
    },
    startDatePrice: {
      control: "number",
      min: 0,
      max: 100,
      defaultValue: 1
    },
    endDatePrice: {
      control: "number",
      min: 0,
      max: 100,
      defaultValue: 5
    }
  }
};

const startDate = new Date("2000-01-01T00:00:00.000Z");
const endDate = new Date("2010-01-01T00:00:00.000Z");

const stockData = [
  {
    "stockSymbol": "MSFT",
    "stockName": "Microsoft",
    "datesAndClosingPrices": [
      {
        "date": startDate,
        "closingPrice": 1
      },
      {
        "date": endDate,
        "closingPrice": 5
      }
    ]
  }
];

const Template = (args) => {
  args.stockData[0].datesAndClosingPrices[0].closingPrice = args.startDatePrice;
  args.stockData[0].datesAndClosingPrices[1].closingPrice = args.endDatePrice;
  return (
    <Output data={args} />
  );
};

export const OutputStory = Template.bind({});

const stockSymbols = ["MSFT"];

OutputStory.args = {
  stockData,
  stockSymbols,
  selectedStockSymbol: stockSymbols[0],
  stockAmount: 0,
  startDate,
  endDate
};