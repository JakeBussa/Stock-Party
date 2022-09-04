/**
 * Extracts the Date and Close values from the given CSV file and writes it as a JSON file to be used by the app.
 * Usage: node ConvertData.js <SomeFile.csv>
 */
import fs from 'fs';
import moment from 'moment';

main();

function main () {
  let fileName = process.argv[2];
  let companyName = process.argv[3];

  if (process.argv.length !== 4) {
    console.log("Missing file name and or comapany name arguments");
    process.exit(1);
  }

  console.log(`Converting file ${fileName}`);

  fs.readFile (fileName, "utf8", (error, csvData) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    let extractedData = extractData(csvData);
    fileName = fileName.replace(/\.csv/, ".json");
    writeJSONFile(fileName, companyName, extractedData);
  });
}

/**
 * This will extract the Date and Close values from the given CSV data that contains the columns [Date, Open, High, Low,
 * Close, Adj Close, Volume].
 * @param {string} csvData - is the CSV data to extract the Date and Close values from.
 * @return {Object[]} returns a list of date (Moment) and closing price (Float) values from the CSV data.
 */
function extractData (csvData) {
  let lines = csvData.split(/\n/);
  let data = [];
  
  // start at 1 to skip the header line
  for (let i = 1; i < lines.length; i++) {
    let line = lines[i];
    let values = line.split(/,/);

    let date = new Date(values[0]);
    let closingPrice = parseFloat(values[4]);

    data.push({date, closingPrice});
  }

  return data;
}

/**
 * Creates a JSON file with the given file name and data.
 * @param {String} fileName - Name of the JSON file.
 * @param {String} companyName - The name of the company.
 * @param {Object[]} extractedData - List of date (Moment) and closing price (Float) values.
 */
function writeJSONFile (fileName, companyName, extractedData) {
  let allData = {
    stockSymbol: fileName,
    companyName,
    data: extractedData
  };
console.log(allData);
  let jsonFile = JSON.stringify(allData, null, 2);

  fs.writeFile(fileName, jsonFile, error => {
    if (error) {
      console.log(error);
      exit(1);
    }

    console.log(`Successfully created file ${fileName}`);
  });
}
