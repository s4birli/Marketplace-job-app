import {call, put} from 'redux-saga/effects';
import * as types from '../actions';
import {profile_service, edit_profile, user_profile_service} from '../../../services/profile'




export function* profile(action) {
  try {
    const response = yield call(profile_service, action.payload);
    console.log('action',response)
     if (response.status == 1) {
      let profile = response.data;
      
      yield put({type: types.PROFILE_SUCCESS,profile});
    } else {
      yield put({type: types.PROFILE_FAILURE});
    }
  } catch (error) {
    yield put({type: types.PROFILE_FAILURE});
  }
}


export function* editProfile(action) {
  console.log('Worker edit', action)
  try {
    const response = yield call(profile_service, action.payload);
    console.log('response', response)
     if (response.status == 1) {
      let profile = response.data;
      yield put({type: types.EDIT_PROFILE_SUCCESS, profile});
      yield put({type: types.PROFILE_COMPLETE});
    } else {
      console.log('failure')
      yield put({type: types.EDIT_PROFILE_FAILURE});
    }
  } catch (error) {
    console.log('failure')
    yield put({type: types.EDIT_PROFILE_FAILURE});
  }
}
