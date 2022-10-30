const getStock = (stockData, targetStockSymbol) => {
  return stockData.find(e => e.stockSymbol === targetStockSymbol);
}

const getStockSymbols = stockData => {
  return stockData.map(e => e.stockSymbol);
}

const getStockNameFromSymbol = (stockData, targetStockSymbol) => {
  return stockData
    .find(datum => datum.stockSymbol === targetStockSymbol)
    .stockName;
}

const getStartDate = (stockData, targetStockSymbol) => {
  const stock = stockData.find(e => e.stockSymbol === targetStockSymbol);
  const beginDateAndClosingPrice = stock.datesAndClosingPrices[0];
  return beginDateAndClosingPrice.date;
}

const getEndDate = (stockData, targetStockSymbol) => {
  const stock = stockData.find(e => e.stockSymbol === targetStockSymbol);
  const lastDateAndClosingPrice = stock.datesAndClosingPrices[stock.datesAndClosingPrices.length - 1];
  return lastDateAndClosingPrice.date;
}

export { getStock, getStockSymbols, getStockNameFromSymbol, getStartDate, getEndDate };
