import {
  REGISTER_ACCOUNT,
  LOGIN_ACCOUNT,
  AUTHENTICATE,
  LOGIN_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_FAIL,
  LOGIN_ACCOUNT_FAIL,
  BALANCE_SYNC_START,
  GOT_PROFILE,
  GOT_CREDENTIALS,
  GOT_MNEMONIC,
  LOADED_CREDENTIALS,
  TRANSACTION_HISTORY_SYNC_START,
  LOGOUT_ACCOUNT,
  LOADING,
  LOADED,
  UPLOAD_PROFILE,
  UPLOADED_PROFILE,
  QR_LOGIN,
  QR_LOGOUT,
  QR_TRANSACTION,
  GOT_FILES,
  GET_FILES,
  UPLOAD_FILE,
  UPLOADING,
  UPLOADED,
  LOAD_APPLICATION
} from "../constants/Action";

export const loadApplication = {
  type: LOAD_APPLICATION,
};


export const registerAccount = data => ({
  type: REGISTER_ACCOUNT,
  data
});
export const loginAccount = data => ({
  type: LOGIN_ACCOUNT,
  data
});

export const logoutAccount = data => ({
  type: LOGOUT_ACCOUNT,
  data
});

export const loginAccountSuccess = token => ({
  type: LOGIN_ACCOUNT_SUCCESS,
  token
});

export const loginAccountFail = {
  type: LOGIN_ACCOUNT_FAIL
};

export const balanceSyncStart = token => ({
  type: BALANCE_SYNC_START,
  token
});

export const registerAccountSuccess = {
  type: REGISTER_ACCOUNT_SUCCESS
};

export const registerAccountFail = {
  type: REGISTER_ACCOUNT_FAIL
};

export const gotProfile = data => ({
  type: GOT_PROFILE,
  data
});

export const getFiles = {
  type: GET_FILES
};

export const gotFiles = data => ({
  type: GOT_FILES,
  data
});

export const gotCredentials = data => ({
  type: GOT_CREDENTIALS,
  data
});

export const gotMneominc = data => ({
  type: GOT_MNEMONIC,
  data
});

export const loadedCredentials = data => ({
  type: LOADED_CREDENTIALS,
  data
});

export const loading = {
  type: LOADING
};

export const uploading = {
  type: UPLOADING
};

export const loaded = {
  type: LOADED
};

export const uploadCompleted = {
  type: UPLOADED
};

export const uploadImage = data => ({
  type: UPLOAD_PROFILE,
  data
});

export const uploadFile = data => ({
  type: UPLOAD_FILE,
  data
});

export const uploaded = data => ({
  type: UPLOADED_PROFILE,
  data
});

export const qrLogin = data => ({
  type: QR_LOGIN,
  data
});

export const qrLogout = data => ({
  type: QR_LOGOUT,
  data
});

export const qrTransaction = data => ({
  type: QR_TRANSACTION,
  data
});
