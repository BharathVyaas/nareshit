import { put, call, takeLatest } from "redux-saga/effects";
import { technologiesListSlice } from "./root.slice";
import axios from "axios";
import { types } from "./root.actions";

function* technologySaga() {
  try {
    yield put(technologiesListSlice.actions.fetchStart());
    const response = yield call(
      axios.get,
      "https://www.nareshit.net/fetchTechnologies"
    );
    console.log(response);
    yield put(
      technologiesListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    console.error(error);
    yield put(
      technologiesListSlice.actions.fetchFailure({
        error,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* adminWatcher() {
  yield takeLatest(`fetch/${types.TECHNOLOGY_LIST}`, technologySaga);
}

export default adminWatcher;
