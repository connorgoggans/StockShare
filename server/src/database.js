// database.js
// Handles Firebase configuration 

// Include require() calls
var config = require("./config.js");
var firebase = require("firebase");

var users;

// initializeFirebase()
// Handles Firebase initialization in a single function
function initializeFirebase() {
    firebase.initializeApp(config.firebase);

    var database = firebase.database();
    var ref = database.ref('vals');

    ref.on('value', function(data) {
        users = data.val();
        //console.log(users);
    }, errData);
}

// Initialize Firebase
initializeFirebase();

// // Google authentication
// // Create an instance of the Google provider object
// var provider = new firebase.auth.GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/plus.login');

// firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
// }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
// });