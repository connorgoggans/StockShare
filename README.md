# StockShare

## What is this
A simple web app to allow multiple people to share an investment.

## Setup
Standard stuff: 

```bash
git clone https://github.com/connorgoggans/StockShare.git
cd StockShare

# server stuff
cd server
npm install
node index.js

# exit server
cd ..

# frontend stuff
cd website
# Requires Python
python -m SimpleHTTPServer

```

## Tech Used
* Node/Express backend
* Vue.js (with a dash of JQuery) frontend
* Braintree SDK for payment processing
* [Robinhood unofficial API](https://urbanoalvarez.es/robinhood-node/) for trading
* Firebase for storing user profiles

## License
MIT License.
