import { takeLatest, call, put } from "redux-saga/effects";
import * as types from '../actions'
import {profile, editProfile} from './worker';

// watcher saga
export function* ProfileRequest() {
  yield takeLatest(types.PROFILE_REQUEST, profile);
  yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfile);
}
