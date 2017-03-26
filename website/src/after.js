var app = new Vue({
    el: '#app',
    data: {
        style: {
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'black',
            width: '220px',
            height: '220px',
            display: 'block',
            margin: '10px',
            float: 'left'

        },
        info: [],
        amount: 0,
        a: true,
        plainTextAmount: {},
        buyingStock: {}



    },

});


function addTile(price, stock, percent) {

    app.info.push({ "stock": stock, "price": price, "percentage": percent });

    /* var app = document.getElementById('left');
     var tile = document.createElement('tile');

     tile.setAttribute('v-bind:style', 'style');
     tile.setAttribute('price', price);
     tile.setAttribute('stock', stock);
     tile.setAttribute('percentage', percent);


     app.appendChild(tile);
     return tile;
     */

}

function addTiles() {
    $.get("http://localhost:3000/pending_transactions", function(data) {
        var keys = Object.keys(data[0]);
        console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            getPrice(keys[i], sumKeys(data[0][keys[i]]["users"]));
            // console.log("b");
        }
    })
}
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function sumKeys(json) {
    console.log(JSON.stringify(json));
    var keys = Object.keys(json);
    console.log(JSON.stringify(keys) + " " + keys.length);
    var sum = 0;
    for (var i = 0; i < keys.length; i++) {
        sum = sum + json[keys[i]];
        // console.log("a");

    }
    console.log(sum);
    return sum;

}

function getPrice(stock, percent) {
    $.get('http://localhost:3000/stock_info', { "symbol": stock }, function(data) {
        addTile("$" + Number(data.results[0].open).toFixed(2), stock, percent + "%");
    })
}


addTiles();