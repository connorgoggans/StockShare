// config.js
// Stores secret information for API and database configuration.

// Config info for Firebase
var config = {
    firebase = {},
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};

// Braintree    
config.braintree = {};
config.braintree.merchantId = "MERCHANT ID";
config.braintree.publicKey = "PUBLIC KEY";
config.braintree.privateKey = "PRIVATE KEY";

module.exports = config;