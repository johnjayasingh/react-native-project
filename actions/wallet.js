import {
  CREATE_WALLET,
  GET_WALLET,
  SAVE_CHANGES,
  SEND_CRYPTO,
  RECEIVE_CRYPTO,
  COPY_ADDRESS,
  SET_AMOUNT_TO_SEND,
  SET_RECIPIENT,
  SIGN_TRANSACTION,
  SET_CRYPTO_BALANCE,
  GET_CRYPTO_BALANCE,
  TRANSACTION_SIGNING_SUCCESS,
  TRANSACTION_SIGNING_FAILED,
  GET_ACCOUNT,
  GOT_ACCOUNT,
  GOT_TRANSACTION_HISTORY,
  GET_TRANSACTION_HISTORY,
  SAVE_CRYPTO_TEMPLATE_CHANGES
} from "../constants/Action";

export const createWallet = { type: CREATE_WALLET };
export const saveChanges = data => ({ type: SAVE_CHANGES, data });
export const saveCryptoTemplateChanges = data => ({
  type: SAVE_CRYPTO_TEMPLATE_CHANGES,
  data
});

export const getCryptoWallets = { type: GET_WALLET };

export const getAccountProfile = { type: GET_ACCOUNT };
export const gotAccountProfile = data => ({ type: GOT_ACCOUNT, data });

export const sendCrypto = { type: SEND_CRYPTO };

export const signTransaction = data => ({
  type: SIGN_TRANSACTION,
  data
});

export const signTransactionSuccess = data => ({
  type: TRANSACTION_SIGNING_SUCCESS,
  data
});

export const signTransactionFailed = data => ({
  type: TRANSACTION_SIGNING_FAILED,
  data
});

export const getTransactionHistory = { type: GET_TRANSACTION_HISTORY };
export const getBalance = {
  type: GET_CRYPTO_BALANCE
};

export const setRecipient = data => ({
  type: SET_RECIPIENT,
  data
});

export const setAmountToSend = data => ({
  type: SET_AMOUNT_TO_SEND,
  data
});

export const receiveCrypto = { type: RECEIVE_CRYPTO };

export const gotBalance = data => ({
  type: SET_CRYPTO_BALANCE,
  data
});

export const getCryptoBalance = {
  type: GET_CRYPTO_BALANCE
};

export const copyAddress = { type: COPY_ADDRESS };

export const gotTransactionHistory = data => ({
  type: GOT_TRANSACTION_HISTORY,
  data
});
