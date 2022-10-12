/**
 * For each CSV file, extracts the data from that file and writes it out to a new JSON file. This JSON file will contain
 * all of the stocks and their performance data which will be referenced by the application. Will need to add back this
 * in package.json in order to run this: "type": "module".
 * 
 * Usage:
 * cd ./src/data
 * node ConvertData.js
 */
import fs from "fs";

main();

function main () {
  // get the CSV files to process
  const filesToProcess = JSON.parse(readFileData("./FilesToProcess.json"));

  // used to store all of the stock data before it gets written out
  let stockData = []

  // for each file to process
  for (let i = 0; i < filesToProcess.length; i++) {
    const fileToProcess = filesToProcess[i];

    const { 
      fileName,
      stockSymbol,
      stockName
    } = fileToProcess;

    console.log(`Processing ${fileName}...`);

    // get the data of that CSV file
    const csvData = readFileData(`./raw/${fileName}`);

    // extract the date and closing prices from the CSV data
    const datesAndClosingPrices = extractCSVData(csvData);

    // add this stock data
    stockData.push({
      stockSymbol,
      stockName,
      datesAndClosingPrices
    });

    console.log(`Successfully processed file ${fileName}!\n`);
  }

  // create the JSON data to write out
  const jsonData = JSON.stringify(stockData, null, 2);

  // write out the JSON file that will be used by the application
  writeFileData("./processed/StockData.json", jsonData);
}

/**
 * Given a file path, returns the data within that file.
 * @param {String} filePath - the file path to use.
 * @return {String} data within the file.
 */
function readFileData (filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

/**
 * Extracts the Date and Close values from the given CSV data. The CSV data is assumed to contain the columns: Date,
 * Open, High, Low, Close, Adj. Close, and Volume.
 * @param {String} csvData - the CSV data to extract the columns from.
 * @return {Array{}} returns an Array of Objects containing the date and closingPrice values.
 */
function extractCSVData (csvData) {
  const lines = csvData.split(/\n/);
  const data = [];
  
  // start at 1 to skip the header line of the CSV data
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(/,/);
    const date = new Date(values[0]);
    const closingPrice = parseFloat(values[4]);

    data.push({ date, closingPrice });
  }

  return data;
}

/**
 * Writes out the file data with the given file path.
 * @param {String} filePath - The path to write the data out to.
 * @param {String} data - The data to write out.
 */
function writeFileData (filePath, data) {
  fs.writeFile(filePath, data, error => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });
}
