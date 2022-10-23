import React from "react";
import StockGraph from "../components/StockGraph.jsx";
import stockData from "../data/processed/StockData.json";

export default {
  title: "Components/Stock Graph",
  component: StockGraph,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    chungus: { control: 'date'}
  },
};

const getStockSymbols = () => {
  return stockData.map(e => e.stockSymbol);
}

const getStartDate = (targetStockSymbol) => {
  const stock = stockData.find(e => e.stockSymbol === targetStockSymbol);
  const beginDateAndClosingPrice = stock.datesAndClosingPrices[0];
  return beginDateAndClosingPrice.date;
}

const getEndDate = (targetStockSymbol) => {
  const stock = stockData.find(e => e.stockSymbol === targetStockSymbol);
  const lastDateAndClosingPrice = stock.datesAndClosingPrices[stock.datesAndClosingPrices.length - 1];
  return lastDateAndClosingPrice.date;
}

export const StockGraphStory = () => {
  const stockSymbols = getStockSymbols();
  const startDate = getStartDate(stockSymbols[0]);
  const endDate = getEndDate(stockSymbols[0]);
  
  const data = {
    stockData,
    stockSymbols,
    selectedStockSymbol: stockSymbols[0],
    stockAmount: 0,
    startDate,
    endDate
  };
  
  return (
    <StockGraph data={data} />
  );
}
