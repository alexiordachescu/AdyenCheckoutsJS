sessionsDropin().then((session) => {
  initSession();
  async function initSession() {
    const checkout = await AdyenCheckout({
      clientKey: "test_M35ZRWIW6JHMPOLIAJELF2OYEYIKZQEP",
      environment: "test",
      session,

      onPaymentCompleted: (result, component) => {
        console.info(result);
        const paymentResult = result.resultCode;

        if (paymentResult === "Authorised" || paymentResult === "Received") {
          document.getElementById("result-container").innerHTML =
            '<img alt="Success" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/success.svg">';
        } else {
          document.getElementById("result-container").innerHTML =
            '<img alt="Error" src="https://checkoutshopper-test.adyen.com/checkoutshopper/images/components/error.svg">';
        }
        updateResponseContainer(result);
      },
      onChange: (state, component) => {
        updateStateContainer(state); // Demo purposes only
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
    });

    const googlePayComponent = checkout.create("paywithgoogle");

    googlePayComponent
      .isAvailable()
      .then(() => {
        googlePayComponent.mount("#googlepay-container");
      })
      .catch((e) => {
        console.log(e);
      });
  }
});
