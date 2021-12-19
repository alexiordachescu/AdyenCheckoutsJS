function setReturnUrl() {
  if (window.location.pathname === "/sessions/" || "/dropin/") {
    return window.location.href;
  } else {
    return "https://your-company.com/";
  }
}

const paymentMethodsConfig = {
  reference: Math.random(),
  countryCode: "BE",
  shopperLocale: "en-GB",
  shopperReference: "alex",
  amount: {
    value: 7834,
    currency: "EUR",
  },
};

const paymentsDefaultConfig = {
  shopperReference: "Checkout Components sample code test",
  reference: "Checkout Components sample code test",
  countryCode: "NL",
  channel: "Web",
  returnUrl: setReturnUrl(),
  amount: {
    value: 1000,
    currency: "EUR",
  },
  lineItems: [
    {
      id: "1",
      description: "Test Item 1",
      amountExcludingTax: 10000,
      amountIncludingTax: 11800,
      taxAmount: 1800,
      taxPercentage: 1800,
      quantity: 1,
      taxCategory: "High",
    },
  ],
};

// Generic POST Helper
const httpPost = (endpoint, data) =>
  fetch(`/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

// Get all available payment methods from the local server
const getPaymentMethods = () =>
  httpPost("paymentMethods", paymentMethodsConfig)
    .then((response) => {
      if (response.error) throw "No paymentMethods available";
      return response;
    })
    .catch(console.error);

// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}) => {
  const paymentsConfig = { ...paymentsDefaultConfig, ...config };
  const paymentRequest = { ...paymentsConfig, ...paymentMethod };

  return httpPost("payments", paymentRequest)
    .then((response) => {
      if (response.error) throw "Payment initiation failed";
      return response;
    })
    .catch(console.error);
};

// Make payments/details call
const submitDetails = (details) => {
  return httpPost("payments/details", details)
    .then((response) => {
      return response;
    })
    .catch(console.error);
};

// Fetches an originKey from the local server
const getOriginKey = () =>
  httpPost("originKeys")
    .then((response) => {
      if (response.error || !response.originKeys)
        throw "No originKey available";

      return response.originKeys[Object.keys(response.originKeys)[0]];
    })
    .catch(console.error);

// Fetches a clientKey from the
const getClientKey = () =>
  httpPost("clientKeys")
    .then((response) => {
      if (response.error || !response.clientKey) throw "No clientKey available";

      return response.clientKey;
    })
    .catch(console.error);

// Make the /sessions call (for CHECKOUT SDK)
const makeSessionsCall = () => {
  return httpPost("webSdk")
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(console.error);
};

// ------------------------------------------------SESSIONS FUNCTIONS START HERE ------------------------------------------------

// Makes the /session call (for Drop-in)

const sessionsDropin = (paymentMethod, config = {}) => {
  const paymentsConfig = { ...paymentsDefaultConfig, ...config };
  const sessionRequest = { ...paymentsConfig, ...paymentMethod };

  return httpPost("sessions", sessionRequest)
    .then((response) => {
      if (response.error) throw "Payment initiation failed";
      return response;
    })
    .catch(console.error);
};

// Makes the optional /payments call for sessions

const makePayments = (paymentMethod, config = {}) => {
  const paymentsConfig = { ...paymentsDefaultConfigForSession, ...config };
  const paymentRequest = { ...paymentsConfig, ...paymentMethod };

  return httpPost("makePayment", paymentRequest)
    .then((response) => {
      console.log(response);
      if (response.error) throw "Payment initiation failed";
      return response;
    })
    .catch(console.error);
};

const paymentsDefaultConfigForSession = {
  merchantAccount: "AlexIordachescu",
  reference: Math.random(),
  countryCode: paymentMethodsConfig.countryCode,
  channel: "Web",
  shopperEmail: "adyen@adyen.com",
  dateOfBirth: "1985-07-30",
  shopperName: {
    firstName: "Alex",
    lastName: "Iordachescu",
  },
  paymentMethod: "ideal",
  shopperReference: Math.random(),
  shopperLocale: "fr_FR",
  billingAddress: {
    city: "Lupoaica",
    country: "GB",
    houseNumberOrName: "N/A",
    postalCode: "N/A",
    street: "461 Rue du Centenaire",
  },
  deliveryAddress: {
    city: "UGINE",
    country: "FR",
    houseNumberOrName: "0",
    postalCode: "73400",
    street: "461 Rue du Centenaire",
  },
  origin: "http://localhost:3000",
  telephoneNumber: "+33 1 76 35 07 90",
  amount: {
    value: 30000,
    currency: "EUR",
  },
  storePaymentMethod: true,
  lineItems: [
    {
      id: "1",
      description: "Test Item 1",
      amountExcludingTax: 10000,
      amountIncludingTax: 11800,
      taxAmount: 1800,
      taxPercentage: 1800,
      quantity: 1,
      taxCategory: "High",
    },
  ],
  additionalData: {
    allow3DS2: true,
  },
};
