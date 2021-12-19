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
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
        updateResponseContainer(result);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
        updateResponseContainer(response.message);
      },
    });
    const applePayComponent = checkout.create("applepay");

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
