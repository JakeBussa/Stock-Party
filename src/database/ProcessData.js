/**
 * For each CSV file in the raw folder, extracts the data from the file and writes it out to a new JSON file in the
 * processed folder. These JSON files will be referenced by the application and represent stock performance over time.
 * Usage: node ConvertData.js <SomeFile.csv>
 */
import fs from "fs";

main();

function main () {
  // get the CSV files to process
  const filesToProcess = JSON.parse(readFileData("FilesToProcess.json"));

  // for each file to process
  for (let i = 0; i < filesToProcess.length; i++) {
    const fileToProcess = filesToProcess[i];

    const { 
      rawFilePath,
      processedFilePath,
      stockSymbol,
      stockName
    } = fileToProcess;

    console.log(`Processing ${rawFilePath}...`);

    // get the data of that CSV file
    const csvData = readFileData(rawFilePath);

    // extract the date and closing prices from the CSV data
    const datesAndClosingPrices = extractCSVData(csvData);

    // create the JSON data to write out
    const jsonData = JSON.stringify({
      stockSymbol,
      stockName,
      datesAndClosingPrices
    }, null, 2);

    // write out the JSON file that will be used by the application
    writeFileData(processedFilePath, jsonData);

    console.log(`Successfully created file ${processedFilePath}!\n`);
  }
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
