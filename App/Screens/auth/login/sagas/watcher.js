import { takeLatest, call, put } from "redux-saga/effects";
import * as types from '../actions'
import {Login, FbLogin, GoogleLogin} from './worker'

// watcher saga
export function* LoginRequest() {
  yield takeLatest(types.LOGIN_REQUEST, Login);
  yield takeLatest(types.FB_LOGIN_REQUEST, FbLogin);
  yield takeLatest(types.GOOGLE_LOGIN_REQUEST, GoogleLogin);
}


