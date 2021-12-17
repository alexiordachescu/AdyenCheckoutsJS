// Create a config object for SDK.
var sdkConfigObj = {
  context: "test",
};

makeSessionsCall().then((response) => {
  var paymentSession = response.paymentSession;
  console.log(response.paymentSession);
  var checkout = chckt.checkout(
    paymentSession,
    "#your-payment-div",
    sdkConfigObj
  );
});

// Initiate the Checkout form.
