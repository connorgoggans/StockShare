var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require("./src/config.js");
var firebase = require('firebase');

var payments = require("./src/braintree.js");
var stocks = require("./src/robinhood.js");
var database = require("./src/database.js");

var trading = require("./src/app.js");

var provider = new firebase.auth.GoogleAuthProvider();

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport oauth sign-in
/*
firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    // ...
}).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
});
*/

// gives the token to the client to individually authorize the payment
app.get("/client_token", function(req, res) {
    payments.token(res);
});


app.post("/checkout", function(req, res) {
    console.log("hey");
    console.log(req.body);

    //console.log(nonceFromTheClient);
    // Use payment method nonce here
    payments.transaction(req.body.payment_method_nonce, req.body.amount, function(page) {
        res.send(page);
    });
});

app.post("/buy", function(req, res) {

    trading.buy(req.nonce, req.symbol, function(page) {
        res.send(page);
    });
});

app.post("/sell", function(req, res) {

    trading.sell(req.nonce, req.symbol, req.user, function(page) {
        res.send(page);
    });
});


// get info about the stock
app.get("/stock_info", function(req, res) {
    //console.log(req.symbol);
    stocks.info(req.query.symbol, function(page) {
        res.send(page);
    });
});

app.get('/pending_transactions', function(req, res) {
    //database.init();
    database.pending(function(data) {
        res.send(data);
        res.end();
    })
})


app.listen(config.ports.listen, function() {
    console.log('Example app listening on port 3000!')
})
