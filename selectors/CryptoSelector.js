import { createSelector } from "reselect";

const selectedCrypto = state => {
  return state.tempDefaults.cryptoIndex;
};

const cryptoAddress = state => {
  return state.credentials;
};

const cryptoCurrencies = state => {
  return state.cryptoCurrencies;
};

export const selectedCryptoSelector = createSelector(
  [cryptoCurrencies, cryptoAddress, selectedCrypto],
  (data, credentials, index) => {
    return {
      ...data[index]
    };
  }
);

export const extractFiatValue = createSelector(
  [cryptoCurrencies],
  data => {
    const response = {};
    data.forEach(obj => {
      if (!response[obj.coinCode]) {
        response[obj.coinCode] = obj.fiatValue;
      }
    });
    return response;
  }
);

export const extractCoinValue = createSelector(
  [cryptoCurrencies],
  data => {
    const response = {};
    data.forEach(obj => {
      if (!response[obj.coinCode]) {
        response[obj.coinCode] = obj.coinValue;
      }
    });
    return response;
  }
);
