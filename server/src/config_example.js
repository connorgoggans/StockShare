// config.js
// Stores secret information for API and database configuration.

var config = {
    // Firebase
    firebase = {},
    firebase: apiKey = "",
    firebase: authDomain = "",
    firebase: databaseURL = "",
    firebase: storageBucket = "",
    firebase: messagingSenderId = "",

    // Braintree
    braintree = {},
    braintree: merchantId = "",
    braintree: publicKey = "",
    braintree: privateKey = "",

    // Ports
    ports = {},
    ports: listen = 3000,
    ports: allow = 8000
};

module.exports = config;