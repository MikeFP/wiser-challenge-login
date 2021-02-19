import {
  applyMiddleware,
  createAction,
  createSlice,
  createStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import authSaga from "./auth-saga";
import { AUTHENTICATE, AuthState, Credentials, LOGOUT, User } from "./types";

const initialState: AuthState = {
  user: null,
  loading: false,
  attempts: 0,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    nextAttempt: (state) => {
      state.attempts++;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    emitError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    reset: (state) => {
      state.error = null;
      state.user = null;
    },
    logout: (state) => {
      state.error = null;
      state.user = null;
    },
  },
});

export const {
  setLoading,
  nextAttempt,
  setUser,
  emitError,
  reset,
  logout,
} = authSlice.actions;

export const authenticate = createAction<Credentials>(AUTHENTICATE);

const sagaMw = createSagaMiddleware();

const makeStore = () => {
  const store = createStore(authSlice.reducer, applyMiddleware(sagaMw));
  sagaMw.run(authSaga);
  return store;
};

export const storeWrapper = createWrapper(makeStore, { debug: false });
