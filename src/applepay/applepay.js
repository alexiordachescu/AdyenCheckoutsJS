sessionsDropin().then((session) => {
  console.log(session);
  function initialize() {
    initSession();
  }

  async function initSession() {
    const checkout = await AdyenCheckout({
      clientKey: "test_M35ZRWIW6JHMPOLIAJELF2OYEYIKZQEP",
      environment: "test",
      session,

      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
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
