var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require("./src/config.js");

var payments = require("./src/braintree.js");

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



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

app.listen(config.ports.listen, function() {
    console.log('Example app listening on port 3000!')
})