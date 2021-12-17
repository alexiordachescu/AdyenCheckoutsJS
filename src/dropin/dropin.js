// 0. Get clientKey
getClientKey().then((clientKey) => {
  getPaymentMethods().then(async (paymentMethodsResponse) => {
    const configuration = {
      environment: "test",
      clientKey: clientKey, // Mandatory. clientKey from Customer Area
      paymentMethodsResponse,
      removePaymentMethods: ["paysafecard", "c_cash"],
      onChange: (state) => {
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
            } else if (response.resultCode !== "Authorised") {
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
    };

    // 1. Create an instance of AdyenCheckout
    const checkout = await AdyenCheckout(configuration);

    // 2. Create and mount the Component
    const dropin = checkout
      .create("dropin", {
        // Events
        onSelect: (activeComponent) => {
          if (activeComponent.state && activeComponent.state.data)
            updateStateContainer(activeComponent.data); // Demo purposes only
        },
      })
      .mount("#dropin-container");
  });
});
