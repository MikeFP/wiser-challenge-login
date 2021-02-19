import { Action } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { emitError, nextAttempt, setLoading, setUser, authenticate } from "./auth-store";

function* validateCredentials(action: Action) {
  const { loading, attempts } = yield select();

  if (!loading && authenticate.match(action)) {
    yield put(setLoading(true));
    const URL =
      attempts % 2 == 0
        ? "https://run.mocky.io/v3/8c177baa-3894-4ac1-8156-24c2e36dc88e"
        : "https://run.mocky.io/v3/26078f17-0ae4-4e26-9e80-4d17efa5572a";

    try {
      const res = yield call(axios.post, URL, {
        email: action.payload.email,
        password: action.payload.password,
      });

      yield put(setUser(res.data));
    } catch (err) {
      switch (err.response.status) {
        case 400:
          if (err.response.data.error === "INVALID_CREDENTIALS") {
            yield put(emitError(err.response.data));
          }
      }
    }
    yield put(nextAttempt());
    yield put(setLoading(false));
  }
}

function* authSaga() {
  yield takeLatest(authenticate.type, validateCredentials);
}

export default authSaga;
