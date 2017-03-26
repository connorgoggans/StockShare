Vue.component('tile', {
    props: ['stock', 'price', 'percentage'],
    template: `
    <div> 
        <h3> {{stock}} </h3> 
        <h4 class="price"> {{price}} </h4>
        <h4 class="percent">{{percentage}}</h4>
    </div>
    `,

});