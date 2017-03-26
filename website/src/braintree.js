var form = document.querySelector('#checkout-form');
var submit = document.querySelector('input[type="submit"]');


function initializeBraintree() {


    $.get("http://localhost:3000/client_token", function(data) {
        console.log(data);
        createBraintreeUI(data);
    })

}



function createBraintreeUI(auth) {
    var submitButton = document.querySelector('#submit-button');

    braintree.dropin.create({
        authorization: auth,
        selector: '#dropin-container'
    }, function(err, dropinInstance) {
        if (err) {
            // Handle any errors that might've occurred when creating Drop-in
            console.error(err);
            return;
        }
        submitButton.addEventListener('click', function() {
            var amount = app.amount;
            submitButton.innerHTML = "Confirm $" + amount;
            dropinInstance.requestPaymentMethod(function(err, payload) {
                if (err) {
                    // Handle errors in requesting payment method
                }

                var noncePayload = {
                    "nonce": payload.nonce,
                    "symbol": app.buyingStock
                };

                $.post("http://localhost:3000/buy", noncePayload);
                // Send payload.nonce to your server
            });
        });
    });
}




function createBraintreeClient(auth) {

    braintree.client.create({
        // Replace this with your own authorization.
        authorization: auth
    }, function(clientErr, clientInstance) {
        if (clientErr) {
            // Handle error in client creation
            return;
        }

        braintree.hostedFields.create({
            client: clientInstance,
            styles: {
                'input': {
                    'font-size': '14pt'
                },
                'input.invalid': {
                    'color': 'red'
                },
                'input.valid': {
                    'color': 'green'
                }
            },
            fields: {
                number: {
                    selector: '#card-number',
                    placeholder: '4111 1111 1111 1111'
                },
                cvv: {
                    selector: '#cvv',
                    placeholder: '123'
                },
                expirationDate: {
                    selector: '#expiration-date',
                    placeholder: '10/2019'
                }
            }
        }, function(hostedFieldsErr, hostedFieldsInstance) {
            if (hostedFieldsErr) {
                // Handle error in Hosted Fields creation
                return;
            }

            submit.removeAttribute('disabled');

            form.addEventListener('submit', function(event) {
                event.preventDefault();

                hostedFieldsInstance.tokenize(function(tokenizeErr, payload) {
                    if (tokenizeErr) {
                        // Handle error in Hosted Fields tokenization
                        return;
                    }

                    // Put `payload.nonce` into the `payment_method_nonce` input, and then
                    // submit the form. Alternatively, you could send the nonce to your server
                    // with AJAX.
                    console.log(payload.nonce);
                    document.querySelector('input[name="payment_method_nonce"]').value = payload.nonce;
                    form.submit();
                });
            }, false);
        });
    });
}