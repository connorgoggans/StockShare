var express = require('express');
var endpoints = require('../index.js');
var payments = require("./braintree.js");
var stocks = require("./robinhood.js");
var firebase = require('firebase');

var provider = new firebase.auth.GoogleAuthProvider();

var app = express();



// Trade Function
function trade(nonce,symbol, shareNum){
  //TODO: needs to get investor data from firebase and do
  //BT for each investor
  //should change price by fractional share for each
  var price = shareNum * (stocks.getStockInfo(symbol).open);
  payments.executeTransaction(nonce, price, function(successFlag){
    if(!successFlag){
      console.log('Braintree transaction failed');
      return;
    }
  });

  stocks.buy(symbol, shareNum, function(successFlag){
    if(!successFlag){
      console.log('Robinhood transaction failed');
      return;
    }
  });

}

// Sell Function
function sell(nonce, symbol, shareNum){
  stocks.sell(symbol, shareNum, function(successFlag){
    if(!successFlag){
      console.log('Robinhood transaction failed');
      return;
    }
  });

  //TODO: Should happen for each investor in firebase
  var price = shareNum * (stocks.getStockInfo(symbol).open);
  payments.executeTransaction(nonce, price, function(successFlag){
    if(!successFlag){
      console.log('Braintree transaction failed');
      return;
    }
  });

}

exports.buy = trade;
exports.sell = sell;
