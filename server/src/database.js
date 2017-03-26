var firebase = require('firebase');
var config = require('./config.js');
var users;

initializeFirebase();

function initializeFirebase() {
    firebase.initializeApp(config.firebase);
    //database = firebase.database();
}


// Return the pending transactions
function get_pending(callback) {
    var ref = firebase.database().ref('stocks');
    var sum_weight = 0;
    var result = [];

    ref.orderByKey().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            data.forEach(function(users) {
                users.forEach(function(weights) {
                    sum_weight += weights.val();
                });
            });
            if (sum_weight !== 100) {
                result.push(snapshot.val());
            }
            sum_weight = 0;
            callback(result);
        });
    });
}

// Return the complete transactions
function get_complete(callback) {
    var ref = firebase.database().ref('stocks');
    var sum_weight = 0;
    var result = [];

    ref.orderByKey().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            data.forEach(function(users) {
                users.forEach(function(weights) {
                    sum_weight += weights.val();
                });
            });
            if (sum_weight === 100) {
                result.push(snapshot.val());
            }
            sum_weight = 0;
            callback(result);
        });
    });
}

// Return the transactions to be sold
function get_sales(callback) {
    var ref = firebase.database().ref('stocks');
    var result = [];

    ref.orderByKey().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            data.forEach(function(vote) {
                if (vote.val() > 50) {
                    result.push(snapshot.val());
                }
            });
            callback(result);
        });
    });
}

// Tabulate the vote
function tabulate_vote(stock, user, callback) {
    var newkey = firebase.database().ref("stocks/" + stock + "/users/" + user);
    var oldkey = firebase.database().ref("stocks/" + stock + "/vote/");

    var newpercent;
    var oldpercent;

    newkey.on("value", function(snapshot) {
        newpercent = snapshot.val();
        callback(newpercent);
        //var vote = firebase.database().ref("stocks/" + stock + "/users/");
    });

    oldkey.on("value", function(snapshot) {
        oldpercent = snapshot.val();
        var update = { vote: oldpercent + newpercent };
        firebase.database().ref().update(update);
        callback(update);
    });


    //firebase.database().ref().update(update);

}

// Test calls
// get_pending(function(data) {
//     console.log(JSON.stringify(data));
// });

// get_complete(function(data) {
//     console.log(JSON.stringify(data));
// });
// get_sales(function(data) {
//     console.log(JSON.stringify(data));
// });

tabulate_vote("F", "user1", function(data) {
    console.log(JSON.stringify(data));
});

// Conclude
exports.init = initializeFirebase;
module.exports = firebase;