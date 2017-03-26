var express = require('express');
var endpoints = require('../index.js');

var provider = new firebase.auth.GoogleAuthProvider();

var app = express();

// one get - info about the stock
// get info about the stock
app.get("/stock_info", function(req, res) {
    stocks.info(req.symbol, function(page) {
        res.send(page);
    });
});

// one post - trade
function trade(){

}
// one post - sell
function sell(){

}
