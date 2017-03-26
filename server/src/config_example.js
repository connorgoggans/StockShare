// Inspired by the trvl repo

var config = {};

// Firebase
config.firebase = {};
config.firebase.apiKey = "API KEY";
config.firebase.databaseURL = "YOUR URL";

// Braintree    
config.braintree = {};
config.braintree.merchantId = "MERCHANT ID";
config.braintree.publicKey = "PUBLIC KEY";
config.braintree.privateKey = "PRIVATE KEY";



//Ports
config.ports = {};
config.ports.listen = 3000;
config.ports.allow = 8000;

module.exports = config;