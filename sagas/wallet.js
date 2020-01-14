import Axios from "axios";
import { Toast } from "native-base";
import { AsyncStorage, Platform } from "react-native";
import { NetInfo } from "react-native";
import { call, delay, put, take, takeLatest, select } from "redux-saga/effects";
import {
  gotCredentials,
  gotMneominc,
  gotProfile,
  loaded,
  loadedCredentials,
  loading,
  loginAccount,
  loginAccountFail
} from "../actions/account.js";
import {
  gotAccountProfile,
  gotBalance,
  gotTransactionHistory,
  getTransactionHistory,
  getBalance
} from "../actions/wallet";
import {
  GET_ACCOUNT,
  GET_CRYPTO_BALANCE,
  GET_TRANSACTION_HISTORY,
  LOGIN_ACCOUNT,
  REGISTER_ACCOUNT,
  SAVE_CHANGES,
  SAVE_CRYPTO_TEMPLATE_CHANGES,
  UPLOAD_PROFILE,
  LOAD_APPLICATION
} from "../constants/Action";
import { API, API_TIMEOUT } from "../constants/API";
import NavigationService from "../navigation/NavigationService";

let axiosAPI;
let noInternet = true;

let axiosAuth = Axios.create({
  baseURL: API,
  timeout: API_TIMEOUT
});

// To Keep token in sync
export function* syncToken() {
  do {
    try {
      let storedCredentials = yield AsyncStorage.getItem("storedCredentials");
      if (storedCredentials) {
        storedCredentials = JSON.parse(storedCredentials);
        if (storedCredentials.id) {
          const { data: { token } } = yield call(axiosAuth.post, `/auth/login`, storedCredentials);
          yield AsyncStorage.setItem("token", token);
          axiosAPI = Axios.create({
            baseURL: API,
            timeout: API_TIMEOUT,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        yield delay(30000);
      }
    } catch (error) {
      console.log(error)
      yield delay(30000);
    }
  } while (true);
}



function* loadApplication() {
  try {
    let storedCredentials = yield AsyncStorage.getItem("storedCredentials");
    let profile = yield AsyncStorage.getItem("profile");
    let credentials = yield AsyncStorage.getItem("credentials");
    let mnemonic = yield AsyncStorage.getItem("mnemonic");
    console.log(storedCredentials)
    let axiosCheck = Axios.create({
      baseURL: API,
      timeout: 10000
    });

    const apiStatus = yield call(
      axiosCheck.get,
      `/`
    );

    if (apiStatus.data.success) {
      console.log(`Connected To API `, apiStatus.data)

      if (storedCredentials) {
        storedCredentials = JSON.parse(storedCredentials);
        // console.log(`Stored Credentials `, storedCredentials)
        yield put(loadedCredentials(storedCredentials));
      }
      if (credentials) {
        credentials = JSON.parse(credentials);
        // console.log(`Stored Keys `, credentials)
        yield put(gotCredentials(credentials));
      }
      if (profile) {
        profile = JSON.parse(profile);
        // console.log(`Stored Keys `, credentials)
        yield put(gotProfile(profile));
      }
      if (mnemonic) {
        mnemonic = JSON.parse(mnemonic);
        // console.log(`Stored Seed `, mnemonic)
        yield put(gotMneominc(mnemonic));
      }
      NavigationService.navigate('Auth')
    }
    else {
      console.log(`Unable To Connect to API `, apiStatus.data)
      NavigationService.navigate('NoInternet', { message: 'Unable to reach the Server' })
    }
  } catch (err) {
    console.log(err);
    NavigationService.navigate('NoInternet', { message: err.message === 'ECONNABORTED' ? 'Connection Aborted. Unable to reach the Server' : 'Unable to reach the Server' })
  } finally {
    yield put(loaded);
    do {
      const networkData = yield call(NetInfo.getConnectionInfo);

      noInternet = networkData.type === 'none'
      if (noInternet) {
        NavigationService.navigate('NoInternet', { message: 'Unable to access the internet' })
      }
      yield delay(500)
    }
    while (true)
  }
}
export function* loadApplicationSaga() {
  yield takeLatest(LOAD_APPLICATION, loadApplication);
}
export function* loginAccountWatch() {
  yield takeLatest(LOGIN_ACCOUNT, loginAccountSaga);
}
export function* registerAccountWatch() {
  yield takeLatest(REGISTER_ACCOUNT, registerAccountSaga);
}
export function* getBalanceWatch() {
  yield takeLatest(GET_CRYPTO_BALANCE, getBalanceSaga);
}
export function* getTransactionHistroyWatch() {
  yield takeLatest(GET_TRANSACTION_HISTORY, transactionHistorySaga);
}
export function* getAccountWatch() {
  yield takeLatest(GET_ACCOUNT, getAccountSaga);
}

export function* saveAccountChangesWatch() {
  yield takeLatest(SAVE_CHANGES, saveAccountChanges);
}

export function* saveCryptoTemplateChangesWatch() {
  yield takeLatest(SAVE_CRYPTO_TEMPLATE_CHANGES, saveCryptoTemplateChanges);
}

export function* uploadProfileSagaWatch() {
  yield takeLatest(UPLOAD_PROFILE, uploadProfileSaga);
}

function* uploadProfileSaga(action) {
  try {
    yield put(loading);
    const response = yield call(axiosAPI.post, `/api/picture`, action.data);
    console.log(response.data)
    yield put(gotProfile(response.data));
    yield put(loaded);
    yield put(getTransactionHistory);
    yield put(getBalance);
  } catch (error) {
    Toast.show({
      duration: 5000,
      text:
        (error.response && error.response.data.message) ||
        error.message ||
        "API Failed",
      buttonText: "Okay",
      type: "danger",
      position: "top"
    });
  } finally {
  }
}

/**
 * Update Crypto coins template
 */
function* saveCryptoTemplateChanges(action) {
  yield put(loading);
  const { data } = action;
  try {
    let response = yield call(
      axiosAPI.put,
      `/api/cryptocurrencies-template`,
      data
    );
    yield put(gotProfile(response.data));
    NavigationService.navigate("Profile");
  } catch (error) {
    Toast.show({
      duration: 5000,
      text:
        (error.response && error.response.data.message) ||
        error.message ||
        "API Failed",
      buttonText: "Okay",
      type: "danger",
      position: "top"
    });
  } finally {
    yield put(loaded);
  }
}

/**
 * Restore Existing seed key
 */
function* saveAccountChanges(action) {
  yield put(loading);
  const { data } = action;
  try {
    let response = yield call(axiosAPI.put, `/api/profile`, data);
    console.log(response.data)
    let {
      mnemonic,
      profile,
      credentials,
      cryptoCurrencies,
      transactionHistory
    } = response.data;
    yield AsyncStorage.setItem("profile", JSON.stringify(profile));
    yield put(gotProfile(profile));
    yield put(gotBalance(cryptoCurrencies));
    yield put(gotMneominc(mnemonic));
    yield put(gotCredentials(credentials));

    if (mnemonic && credentials) {
      // Update the credentials
      yield AsyncStorage.setItem("mnemonic", JSON.stringify(mnemonic));
      yield AsyncStorage.setItem("credentials", JSON.stringify(credentials));
      yield put(gotTransactionHistory(transactionHistory));
    }

    Toast.show({
      duration: 5000,
      text: "Profile Updated",
      type: "success",
      position: "top",
      buttonText: "Okay",
    });

    yield put(loaded);
  } catch (error) {
    Toast.show({
      duration: 5000,
      text:
        (error.response && error.response.data.message) ||
        error.message ||
        "Profile Update Failed",
      buttonText: "Okay",
      type: "danger",
      position: "top"
    });
  } finally {
    yield put(loaded);
  }
}

/**
 * Login Account
 */
function* loginAccountSaga(action) {
  yield put(loading);
  try {
    let { data } = action;
    if (data.noEmail) {
      let profile = yield AsyncStorage.getItem("profile");
      try {
        if (profile) {
          profile = JSON.parse(profile)
          data = { ...data, ...profile }
        }
      } catch (error) {
        console.log(error)
      }
    }
    const response = yield call(axiosAuth.post, `/auth/login`, data);

    // TODO CRYPTO TEMPLATE Response
    const {
      token,
      profile,
      cryptoCurrencies,
      transactionHistory
    } = response.data;

    axiosAPI = Axios.create({
      baseURL: API,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    yield AsyncStorage.setItem("token", token);
    yield put(gotProfile(profile));
    yield put(gotBalance(cryptoCurrencies));
    yield put(gotTransactionHistory(transactionHistory));
    yield put(loadedCredentials(data));
    if (data.loginAfterSuccess) {
      NavigationService.navigate("PlayIntro");
    }
    yield put(loaded);
  } catch (error) {
    Toast.show({
      duration: 5000,
      text:
        (error.response && error.response.data.message) ||
        error.message ||
        "API Failed",
      buttonText: "Okay",
      type: "danger",
      position: "top"
    });
    yield put(loaded);
    NavigationService.navigate("Auth");
  } finally {
    yield put(loaded);
  }
}

/**
 * Register Account
 */
function* registerAccountSaga(action) {
  try {
    let { data } = action;
    let existingMnemonic = false
    console.log("registerAccountSaga");
    let mnemonic = yield AsyncStorage.getItem("mnemonic");
    if (mnemonic) {
      data.mnemonic = JSON.parse(mnemonic);
      existingMnemonic = true
    }
    const response = yield call(axiosAuth.post, `/auth/register`, data);
    const { profile, credentials } = response.data;
    mnemonic = response.data.mnemonic;
    // TODO CRYPTO TEMPLATE Response
    const { id, password } = profile;
    // yield AsyncStorage.clear();
    const store = { id, password };
    yield AsyncStorage.setItem("storedCredentials", JSON.stringify(store));
    yield AsyncStorage.setItem("mnemonic", JSON.stringify(mnemonic));
    yield AsyncStorage.setItem("profile", JSON.stringify(profile));
    yield AsyncStorage.setItem("credentials", JSON.stringify(credentials));

    yield put(gotMneominc(mnemonic));
    yield put(gotProfile(profile));
    yield put(gotCredentials(credentials));
    if (data.noEmail) {
      NavigationService.navigate("PlayIntro");
    }
    else if (data.loginAfterSuccess) {
      Toast.show({
        duration: 5000,
        text: "Registration Successful. Please Login now",
        buttonText: "Okay",
        type: "success",
        position: "top"
      });
      NavigationService.navigate("Login");
    } else {
      Toast.show({
        duration: 5000,
        text: "Registration Successful. ",
        type: "success",
        position: "top"
      });
    }

    yield put(loginAccount(store));
  } catch (error) {
    Toast.show({
      duration: 5000,
      text:
        (error.response && error.response.data.message) ||
        error.message ||
        "API Failed",
      buttonText: "Okay",
      type: "danger",
      position: "top"
    });
  } finally {
    yield put(loaded);
  }
}

/**
 * Function will be started
 * and the Transaction History API calls are made every 15 seconds
 */
function* transactionHistorySaga(action) {
  try {
    const response = yield call(axiosAPI.get, `/api/transactions`);
    const { data } = response;
    yield put(gotTransactionHistory(data));
  } catch (err) {
    if (err.response && err.response.status === 401) {
      yield put(loginAccountFail);
    }
  } finally {
    yield put(loaded);
  }
}

/**
 * Make API call for balance on GET_CRYPTO_BALANCE action
 */
function* getBalanceSaga(action) {
  yield put(loading);
  try {
    const response = yield call(axiosAPI.get, `/api/balance`);
    const { data } = response;
    console.log(data)
    yield put(gotBalance(data));
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loaded);
  }
}

/**
 * Make API call for profile on GET_ACCOUNT action
 */
function* getAccountSaga() {
  try {
    const action = yield take(GET_ACCOUNT);
    const response = yield call(axiosAPI.get, `/api/profile`);
    const { data } = response;
    yield put(gotAccountProfile(data));
  } catch (err) {
    console.log(err);
  } finally {
    yield put(loaded);
  }
}
