var braintree = require('braintree');
var config = require("./config.js");
var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.braintree.merchantId,
    publicKey: config.braintree.publicKey,
    privateKey: config.braintree.privateKey
});



function executeTransaction(paymentNonce, amount, displayWebpage) {
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: paymentNonce,
        options: {
            submitForSettlement: true
        }
    }, function(err, result) {
        displayWebpage("Errors: " + JSON.stringify(err) + "\n" + "Results: " +
            JSON.stringify(result));
    });
}


// gives the token to the client to individually authorize the payment
app.get("/client_token", function(req, res) {
    gateway.clientToken.generate({}, function(err, response) {
        res.send(response.clientToken);
    });
});

app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.post("/checkout", function(req, res) {
    console.log("hey");
    console.log(req.body);

    console.log(nonceFromTheClient);
    // Use payment method nonce here
    executeTransaction(req.body.payment_method_nonce, req.body.amount, function(page) {
        res.send(page);
    });
});

app.listen(config.ports.listen, function() {
    console.log('Example app listening on port 3000!')
})