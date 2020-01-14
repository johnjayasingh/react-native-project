import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import { INITIAL_STATE } from "../constants/State";
import { initSagas } from "./initSagas";
import * as storage from "redux-storage";
import createEngine from "redux-storage-engine-localstorage";

const sagaMiddleware = createSagaMiddleware();
const engine = createEngine("my-save-key");
const storageMiddleware = storage.createMiddleware(engine);

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(storageMiddleware, sagaMiddleware)
);

initSagas(sagaMiddleware);

export default store;
