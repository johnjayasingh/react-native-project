import { take, takeLatest, put, call, delay } from "redux-saga/effects";
import { AsyncStorage, Keyboard } from "react-native";
import { Toast } from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import NavigationService from "../navigation/NavigationService";

import Bitcoin from "bitcore-lib";
import BitcoinCash from "bitcore-lib-cash";
import Tx from "ethereumjs-tx";
import Axios from "axios";
import SocketIOClient from "socket.io-client";

import {
  SIGN_TRANSACTION,
  QR_LOGIN,
  QR_LOGOUT,
  QR_TRANSACTION,
  LOGOUT_ACCOUNT
} from "../constants/Action";
import { API, SOCKET, API_TIMEOUT } from "../constants/API";
import {
  signTransactionSuccess,
  signTransactionFailed
} from "../actions/wallet";
import { loading, loaded, logoutAccount } from "../actions/account";

let axiosAPI;

const socket = SocketIOClient(SOCKET);

socket.on("payment", payload => {
  const { session, data } = JSON.parse(payload);
  NavigationService.navigate("SendStack");
  NavigationService.navigate("Home", { payment: data });
});

socket.on("connected", payload => {
  console.log(payload)
  // const data = JSON.parse(payload);
  // NavigationService.navigate("RemoteSession", data);
  // Toast.show({
  //   text: `Connected to a Orichalcum Web Session`,
  //   type: "success",
  //   duration: 10000,
  //   onClose: (reason) => {
  //     if (reason === "user") {
  //       socket.disconnect();
  //       socket.connect();
  //       Toast.show({
  //         text: `Remote Session Disconnected`,
  //         type: "success",
  //       });
  //     }
  //   },
  //   buttonText: 'Disconnect'
  // })
});

socket.on("disconnected", () => {
  NavigationService.navigate("Home");
});

export function* watchTransactionSign() {
  yield takeLatest(SIGN_TRANSACTION, signTransactionSaga);
}

export function* qrLoginSagaWatch() {
  yield takeLatest(QR_LOGIN, qrLoginSaga);
}

export function* qrLogoutSagaWatch() {
  yield takeLatest(QR_LOGOUT, qrLogoutSaga);
}

export function* qrTransactionSagaWatch() {
  yield takeLatest(QR_TRANSACTION, qrTransactionSaga);
}

export function* syncTransactionToken() {
  while (true) {
    let token = yield AsyncStorage.getItem("token");
    axiosAPI = Axios.create({
      baseURL: API,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    yield delay(3000);
  }
}

function* qrLoginSaga(action) {
  try {
    let token = yield AsyncStorage.getItem("token");
    socket.emit("login", JSON.stringify({ token, session: action.data }));
  } catch (error) { }
}

function* qrLogoutSaga(action) { }

function* qrTransactionSaga(action) { }

/**
 * Make Sign Transaction
 */
function* signTransactionSaga(action) {
  let hash;
  try {
    yield put(loading);
    const { data } = action;
    let {
      receiver,
      amount,
      publicKey,
      privateKey,
      txrefs,
      coinCode,
      balanceActual,
      isToken,
      contractAddress
    } = data;

    const BTC = "BTC";
    const BCH = "BCH";
    amount = Boolean(coinCode === BTC || coinCode === BCH)
      ? amount * 100000000 // Satoshi 9 Zeros
      : isToken
        ? amount
        : amount * 1000000000000000000; // Wei 18 Zeros
    const remainingBalance = balanceActual - amount;
    if (balanceActual <= 0) {
      console.log("Balance");
      Toast.show({
        duration: 3000,
        text: "Insufficiant Balance",
        buttonText: "Okay",
        type: "danger",
        position: "top"
      });
    }
    if (remainingBalance < 0) {
      console.log("Low Balance");
      Toast.show({
        duration: 3000,
        text: "Balance Low. Unable to complete the transaction",
        buttonText: "Okay",
        type: "danger",
        position: "top"
      });
      yield put(signTransactionFailed("Balance Low"));
      return;
    }
    if (coinCode === "BTC" || coinCode == "BCH") {
      const func = coinCode === "BTC" ? Bitcoin : BitcoinCash;
      // Confirmation of Transaction
      // txrefs = txrefs.filter(obj => obj.confirmations > 6);
      if (!txrefs || txrefs.length == 0) {
        console.log(txrefs, "No Available");
        Toast.show({
          duration: 3000,
          text: "No confirmed balance available to complete this transaction.",
          buttonText: "Okay",
          type: "danger",
          position: "top"
        });
        yield put(signTransactionFailed("No Unspent Transactions"));
        return;
      }
      const privateKeyBuff = new func.PrivateKey(privateKey);
      const transaction = new func.Transaction()
        .from(txrefs)
        .to([
          {
            address: receiver,
            satoshis: amount
          }
        ])
        .change(publicKey)
        .sign(privateKeyBuff);
      hash = transaction.toString();
    } else if (coinCode === "ETH" || coinCode === "ETC") {
      const { data } = yield call(axiosAPI.post, `/api/config/web3`, {
        publicKey,
        receiver,
        amount,
        contractAddress
      });
      const rawParams = {
        ...data,
        chainid: coinCode == "ETH" ? "0*04" : "62"
      };
      // chainidClassic-62,test//61,main
      const transaction = new Tx(rawParams);
      transaction.sign(
        Buffer.from(privateKey.slice(2, privateKey.length), "hex")
      );
      hash = `0x${transaction.serialize().toString("hex")}`;
      // let txhash =	web3.eth.sendRawTransaction
    } else {
      const { data } = yield call(axiosAPI.post, `/api/config/web3`, {
        publicKey,
        receiver,
        amount,
        contractAddress
      });
      const rawParams = {
        ...data,
        chainid: "0*04"
      };
      // chainidClassic-62,test//61,main
      const transaction = new Tx(rawParams);
      transaction.sign(
        Buffer.from(privateKey.slice(2, privateKey.length), "hex")
      );
      hash = `0x${transaction.serialize().toString("hex")}`;
    }
    yield put(loaded);
    Toast.show({
      duration: 3000,
      text: "Transaction submitted.",
      buttonText: "Okay",
      type: "success",
      position: "top"
    });
  
    NavigationService.navigate("HomeStack");
    yield put(signTransactionSuccess(hash));

    const transactionResponse = yield call(axiosAPI.post, `/api/transaction`, {
      coinCode,
      hash
    });
    const { message } = transactionResponse.data;

    Toast.show({
      duration: 3000,
      text: message || "Transaction completed",
      buttonText: "Okay",
      type: "success",
      position: "top"
    });
    // yield put(gotTransactionHistory(transactionResponse.data));
  } catch (error) {
    console.log(error)
    yield put(loaded);
    Toast.show({
      duration: 3000,
      text:
        (error.response && error.response.data.message) ||
        "Transaction failed",
      buttonText: "Okay",
      type: "danger",
      position: "top"
    });
    NavigationService.navigate("HomeStack");
  } finally {
  }
}

function* logoutAccountSaga(action) {
  try {
    // yield AsyncStorage.clear();
    socket.disconnect();
    socket.connect();
  } catch (error) {
    console.log(error)
  }
}

export function* logoutAccountWatch() {
  yield takeLatest(LOGOUT_ACCOUNT, logoutAccountSaga);
}
