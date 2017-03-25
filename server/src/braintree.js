var braintree = require('braintree');
var config = require("./config.js");
var express = require('express')

var app = express();


var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.braintree.merchantId,
    publicKey: config.braintree.publicKey,
    privateKey: config.braintree.privateKey
});



// gives the token to the client to individually authorize the payment
app.get("/client_token", function(req, res) {
    gateway.clientToken.generate({}, function(err, response) {
        res.send(response.clientToken);
    });
});

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})


function makeTransaction() {

}