// config.js
// Stores secret information for API and database configuration.

var config = {};

// Firebase
config.firebase = {};
config.firebase.apiKey = "YOUR API KEY HERE";
config.firebase.databaseURL = "YOUR DATABASE URL HERE";

// Braintree
config.braintree = {};
config.braintree.merchantId = "YOUR MERCHANT ID HERE";
config.braintree.publicKey = "YOUR PUBLIC KEY HERE";
config.braintree.privateKey = "YOUR PRIVATE KEY HERE";


//Ports
config.ports = {};
config.ports.listen = 3000;
config.ports.allow = 8000;

module.exports = config;