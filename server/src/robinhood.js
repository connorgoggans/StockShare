var credentials = require("./masterAccountCredentials.js");


function buyAction(symbol, shareNum, callback){
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
                  quantity: shareNum,
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
                      callback("Success");
                  }
              })
          }
      })

  });
}

function sellAction(symbol,shareNum, callback){
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
                  quantity: shareNum,
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
                      callback("Success");
                  }
              })
          }
      })

  });
}

function getStockInfo(symbol, callback){
  var Robinhood = require('robinhood')(credentials, function(){
    Robinhood.fundamentals(symbol, function(error, response, body){
        if(error){
            console.error(error);
        }else{
            console.log(body);
            callback(body);
            //{                               // Example for SBPH
            //    average_volume: string,     // "14381.0215"
            //    description: string,        // "Spring Bank Pharmaceuticals, Inc. [...]"
            //    dividend_yield: string,     // "0.0000"
            //    high: string,               // "12.5300"
            //    high_52_weeks: string,      // "13.2500"
            //    instrument: string,         // "https://api.robinhood.com/instruments/42e07e3a-ca7a-4abc-8c23-de49cb657c62/"
            //    low: string,                // "11.8000"
            //    low_52_weeks: string,       // "7.6160"
            //    market_cap: string,         // "94799500.0000"
            //    open: string,               // "12.5300"
            //    pe_ratio: string,           // null (price/earnings ratio)
            //    volume: string              // "4119.0000"
            //}
        }
    })
  });
}

exports.buy = buyAction;
exports.sell = sellAction;
exports.info = getStockInfo;
