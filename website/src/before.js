Vue.component('tile', {
    props: ['info'],
    template: `
    <div v-on:click = "startBraintree"> 
        <h3> {{info.stock}} </h3> 
        <h4 class="price"> {{info.price}} </h4>
        <h4 class="percent">{{info.percentage}}</h4>
        <h4 class="percent">Buy 10%</h4>
    </div>
    `,
    methods: {

        startBraintree: function() {
            app.amount = this.info.price;
            app.plainPercentage = parseFloat(this.info.percentage) / 100.0;
            app.plainTextAmount = "$" + (Number((app.amount).replace(/[^0-9\.]+/g, "")) *
                app.plainPercentage).toFixed(2);

            initializeBraintree();

        },

    }
});




Vue.component('braintree', {
    template: `
    <div>
        
        <div id="dropin-container"></div>
        <button id="submit-button">Purchase</button>
    </div>

    `
})

Vue.component('test', {
    props: ['thing'],
    template: `
    <p> {{thing}} </p>
    `,

});