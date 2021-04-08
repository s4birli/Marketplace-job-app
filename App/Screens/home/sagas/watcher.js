import { takeLatest, call, put } from "redux-saga/effects";
import * as types from '../actions'
import {
  getRoots,
  getCategories,
  getRegex
} from './worker'

// watcher saga
export function* rootRequest() {
  yield takeLatest( types.ROOTS_REQUEST , getRoots);
}

// watcher saga
export function* categoriesRequest() {
  yield takeLatest( types.CATEGORY_PICKER_REQUEST , getCategories);
}

// watcher saga
// export function* getRegexValue() {
//   yield takeLatest( types.REGEX_PICKER_REQUEST , getRegex);
// }