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
config.braintree.merchantId = "";
config.braintree.publicKey = "";
config.braintree.privateKey = "";

module.exports = config;