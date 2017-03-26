var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require("./src/config.js");

var payments = require("./src/braintree.js");
var stocks = require("./src/robinhood.js");

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
    console.log("Buying " + req.shareNum + " shares of " + req.symbol);

    stocks.buy(req.symbol, req.shareNum, function(page) {
        res.send(page);
    });
});

app.post("/sell", function(req, res) {
    console.log("Selling " + req.shareNum + " shares of " + req.symbol);

    stocks.sell(req.symbol, req.shareNum, function(page) {
        res.send(page);
    });
});

app.listen(config.ports.listen, function() {
    console.log('Example app listening on port 3000!')
})
