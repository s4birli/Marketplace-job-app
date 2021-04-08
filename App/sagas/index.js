import {fork} from 'redux-saga/effects';
import {LoginRequest} from '../Screens/auth/login/sagas/watcher';
import {
  rootRequest ,
  categoriesRequest,
  getRegex
} from '../Screens/home/sagas/watcher'
import {ProfileRequest} from '../Screens/profile/sagas/watcher';
import {ReviewRequest} from '../Screens/rootPage/sagas/watcher'

export default function* rootSaga() {
  yield fork(LoginRequest);
  yield fork(rootRequest);
  yield fork(ProfileRequest);
  yield fork(ReviewRequest);
  yield fork(categoriesRequest);
  // yield fork(getRegex);
}
