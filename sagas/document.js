import Axios from "axios";
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  gotFiles,
  loaded,
  loading,
  uploading,
  uploaded,
  uploadCompleted,
  getFiles
} from "../actions/account.js";
import { UPLOAD_FILE, GET_FILES } from "../constants/Action";
import { API, API_TIMEOUT } from "../constants/API";
import RNFS from "react-native-fs";

let axiosAPI;

export function* uploadFileSagaWatch() {
  yield takeLatest(UPLOAD_FILE, uploadFileSaga);
}

export function* getFilesSagaWatch() {
  yield takeLatest(GET_FILES, getFilesSaga);
}

function* uploadFileSaga(action) {
  try {
    yield put(uploading);
    const data = yield call(RNFS.readFile, action.data.uri, "base64");
    const uploadData = yield call(axiosAPI.post, `/api/upload`, {
      ...action.data,
      data
    });
    yield put(gotFiles(uploadData.data))
    Toast.show({
      duration: 3000,
      text: "File got uploaded successfully",
      buttonText: "Okay",
      type: "success",
      position: "top"
    });
    yield put(getFiles);
    yield put(uploadCompleted);
  } catch (error) {
    Toast.show({
      duration: 3000,
      text:
        (error.response && error.response.data.message) ||
        error.message ||
        "API Failed",
      buttonText: "Okay",
      type: "danger",
      position: "top"
    });
  } finally {
    yield put(uploadCompleted);
    yield put(loaded);
  }
}

function* getFilesSaga(action) {
  try {
    yield put(loading);
    const response = yield call(axiosAPI.get, `/api/files`);
    yield put(gotFiles(response.data));
    yield put(loaded);
  } catch (error) {
    // console.log(error)

    Toast.show({
      duration: 3000,
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

export function* syncFilesToken() {
  do {
    let token = yield AsyncStorage.getItem("token");
    axiosAPI = Axios.create({
      baseURL: API,
      timeout: API_TIMEOUT,
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    yield delay(13000);
  } while (true);
}
