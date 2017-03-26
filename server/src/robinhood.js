var credentials = require("./masterAccountCredentials.js");


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

exports.buy = buyAction;
exports.sell = sellAction;
