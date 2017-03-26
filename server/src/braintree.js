var braintree = require('braintree');
var config = require("./config.js");




var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.braintree.merchantId,
    publicKey: config.braintree.publicKey,
    privateKey: config.braintree.privateKey
});

function generateToken(res) {
    gateway.clientToken.generate({}, function(err, response) {
        res.send(response.clientToken);
    });
}

function executeTransaction(paymentNonce, amount, callback) {
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: paymentNonce,
        options: {
            submitForSettlement: true
        }
    }, function(err, result) {
      if(err){
        callback(false);
      }else{
        callback(true);
      }
        //displayWebpage("Errors: " + JSON.stringify(err) + "\n" + "Results: " +
            //JSON.stringify(result));
    });
}



exports.transaction = executeTransaction;
exports.token = generateToken;
