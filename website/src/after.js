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

        }
    }
});


function addTile(price, stock, percent) {
    var app = document.getElementById('app');
    var tile = document.createElement('tile');

    tile.setAttribute('v-bind:style', 'style');
    tile.setAttribute('price', price);
    tile.setAttribute('stock', stock);
    tile.setAttribute('percentage', percent);

    return tile;

}