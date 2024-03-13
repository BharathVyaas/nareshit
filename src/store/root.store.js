import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

import reducers from "./root.reducer";
import { all } from "redux-saga/effects";
import adminWatcher from "./root.saga";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([adminWatcher()]);
}

sagaMiddleware.run(rootSaga);

export default store;