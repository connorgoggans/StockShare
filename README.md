# StockShare

## What is StockShare?
StockShare is a simple web app that makes investing fun by allowing you to democratically share investments with your friends.

## Setup
Standard stuff: 

```bash
git clone https://github.com/connorgoggans/StockShare.git
cd StockShare

# server setup
cd server
npm install
node index.js

# exit server
cd ..

# frontend deployment
cd website
# Requires Python
python -m SimpleHTTPServer

```

## Tech Used
* Node.js/Express.js backend
* Vue.js (with a dash of JQuery) frontend
* Braintree SDK for payment processing
* [Robinhood unofficial API](https://urbanoalvarez.es/robinhood-node/) for trading
* Firebase for storing user profiles

## License
MIT License.