import React from "react";
import "../App.css";
import Input from "../components/input/Input.jsx";
import stockData from "../data/processed/StockData.json";
import { getStockSymbols, getStartDate, getEndDate } from "../util/StockUtil";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    stockData: {
      control: "null"
    },
    stockSymbols: {
      control: "null"
    },
    stockAmount: {
      control: "null"
    },
    startDate: {
      control: "null"
    },
    endDate: {
      control: "null"
    },
  }
};

const Template = args => {
  return (
    <Input data={args} />
  );
};

export const InputStory = Template.bind({});

const stockSymbols = getStockSymbols(stockData);
const startDate = getStartDate(stockData, stockSymbols[0]);
const endDate = getEndDate(stockData, stockSymbols[0]);

InputStory.args = {
  stockData,
  stockSymbols,
  stockAmount: 0,
  startDate,
  endDate
};
