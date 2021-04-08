import { takeLatest, call, put } from "redux-saga/effects";
import * as types from '../actions'
 import {root_review,user_profile} from './worker'

// watcher saga
export function* ReviewRequest() {
  yield takeLatest(types.REVIEW_REQUEST, root_review);
  yield takeLatest(types.user_profile,user_profile)
}
