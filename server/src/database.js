// database.js
// Handles Firebase configuration 

// Include require() calls
var config = require("./config.js");
var firebase = require("firebase");

// initializeFirebase()
// Handles Firebase initialization in a single function
function initializeFirebase() {
    firebase.initializeApp(config);
    var database = firebase.database();
    var ref = database.ref('vals');

    ref.on('value', function(data) {
        users = data.val();
        //   console.log(users);

    }, errData);
}

// Initialize Firebase
initializeFirebase();