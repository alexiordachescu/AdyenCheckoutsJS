sessionsDropin().then((session) => {
  initSession();
  async function initSession() {
    const checkout = await AdyenCheckout({
      clientKey: "test_M35ZRWIW6JHMPOLIAJELF2OYEYIKZQEP",
      environment: "test",
      session,

      onChange: (state, component) => {
        updateStateContainer(state); // Demo purposes only
      },

      onSubmit: (state, dropin) => {
        makePayment(state.data)
          .then((response) => {
            dropin.setStatus("loading");
            if (response.action) {
              dropin.handleAction(response.action);
            } else if (response.resultCode === "Authorised") {
              dropin.setStatus("success", { message: "Payment successful!" });
              setTimeout(function () {
                dropin.setStatus("ready");
              }, 2000);
            } else if (
              response.resultCode !== "Authorised" ||
              !response.resultCode
            ) {
              dropin.setStatus("error", { message: "Oops, try again please!" });
              setTimeout(function () {
                dropin.setStatus("ready");
              }, 2000);
            }
          })
          .catch((error) => {
            throw Error(error);
          });
      },

      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
    });

    const applePayComponent = checkout
      .create("applepay", {
        amount: {
          value: 100,
          currency: "EUR",
        },
        countryCode: "NL",
        // Events
        onSelect: (activeComponent) => {
          if (activeComponent.state && activeComponent.state.data)
            updateStateContainer(activeComponent.data); // Demo purposes only
        },
      })
      .mount("#applepay-container");

    applePayComponent
      .isAvailable()
      .then(() => {
        applePayComponent.mount("#applepay-container");
      })
      .catch((e) => {
        console.log(e);
      });
  }
});
