var credentials = require("./masterAccountCredentials.js");
var config = require("./config.js");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function buyAction(symbol)(){
  var Robinhood = require('robinhood')(credentials, function(){
      Robinhood.instruments(symbol,function(err, response, body){
          if(err){
              console.error(err);
          }else{
              console.log(body);
              var url = body.results[0].url;
              var stockSymbol = body.results[0].symbol;
              console.log(url);

              var options = {
                  type: 'limit',
                  quantity: 1,
                  bid_price: 1.00,
                  instrument: {
                    url: url,
                    symbol: stockSymbol
                  }
              }

              Robinhood.place_sell_order(options, function(error, response, body){
                  if(error){
                      console.error(error);
                  }else{
                      console.log(body);
                  }
              })
          }
      })

  });
}

function sellAction(symbol)(){
  var Robinhood = require('robinhood')(credentials, function(){
      Robinhood.instruments(symbol,function(err, response, body){
          if(err){
              console.error(err);
          }else{
              console.log(body);
              var url = body.results[0].url;
              var stockSymbol = body.results[0].symbol;
              console.log(url);

              var options = {
                  type: 'limit',
                  quantity: 1,
                  bid_price: 1.00,
                  instrument: {
                    url: url,
                    symbol: stockSymbol
                  }
              }

              Robinhood.place_buy_order(options, function(error, response, body){
                  if(error){
                      console.error(error);
                  }else{
                      console.log(body);
                  }
              })
          }
      })

  });
}
