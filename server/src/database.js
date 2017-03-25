var firebase = require('firebase');

var users;

function initializeFirebase() {
    firebase.initializeApp(config.firebase);
    var database = firebase.database();
    var ref = database.ref('vals');

    ref.on('value', function(data) {
        users = data.val();
        //   console.log(users);
    }, errData);
}

// Initialize Firebase
initializeFirebase();