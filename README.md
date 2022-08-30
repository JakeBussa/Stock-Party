# About

This application allows a user to see how a stock has performed over the course of history. It also gives them the
option to see how much money they could have made from an initial investment. I typically do back-end work and wanted to
work out my front-end muscles a little bit with this application.

## To Run

todo add the commands to run this application

## Data Collection Method

Investment data was downloaded from [Yahoo Finance](https://finance.yahoo.com) and manually transformed so that it can
be used by the application. The process is the following:

* Find a nice looking stock on Yahoo.
* Download its full historical data as a CSV file.
  * This file has a extra data that we don't really need.
  * CSV files are kind of "meh" to work with.
* Run `node database/ConvertData.js <Excel file>` which will spit out a nice looking JSON file.
  * The file name will be the same as the CSV file supplied.
  * This file will be created in our "database" folder.
  * The JSON file will only contain the date and closing value of the stock instead of all that other jazz we don't care
    too much about.
* Profit.

Went with this method for data because APIs were either out of date or websites wanted money. **I am cheap**. I also
didn't want to go through the hassle of setting up server along with a database quite just yet.
