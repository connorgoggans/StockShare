var payments = require("./braintree.js");
var stocks = require("./robinhood.js");
var firebase = require('firebase');
var db = require("./database.js");

var provider = new firebase.auth.GoogleAuthProvider();

// Trade Function
function trade(nonce,symbol){
  //TODO: needs to get investor data from firebase and do
  //BT for each investor
  //should change price by fractional share for each
  var price = 0.10 * (stocks.price(symbol));

  payments.transaction(nonce, price, function(successFlag){
    if(!successFlag){
      console.log('Braintree transaction failed');
      return;
    }
  });

  db.addBuyer(symbol, "user5");

  db.complete(function(result){
    console.log(result[0]);
    if(symbol in result[0]){
      stocks.buy(symbol, function(successFlag){
        if(!successFlag){
          console.log('Robinhood transaction failed');
          return;
        }
      });
    }
  });
}

// Sell Function
function sell(nonce, symbol, user){
  db.addVote(symbol, user, function(result){
    //do nothing
  });
  stocks.sell(symbol, function(successFlag){
    if(!successFlag){
      console.log('Robinhood transaction failed');
      return;
    }
  });


  var price = 0.10 * (stocks.price(symbol));
  payments.transaction(nonce, price, function(successFlag){
    if(!successFlag){
      console.log('Braintree transaction failed');
      return;
    }
  });

}

exports.buy = trade;
exports.sell = sell;
