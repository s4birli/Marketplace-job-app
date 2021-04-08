import {call, put} from 'redux-saga/effects';
import * as types from '../actions';
import {user_profile_service} from '../../../services/profile'




export function* root_review(token) {
//   try {
    
//     const response = yield call(profile_service, token);
    
//      if (response.status == 1) {
//       let profile = response.data;
      
//       yield put({type: types.PROFILE_SUCCESS,profile});
//     } else {
//       yield put({type: types.PROFILE_FAILURE});
//     }
//   } catch (error) {
//     yield put({type: types.PROFILE_FAILURE});
//   }
}

export function* user_profile(payload) {
    console.log('user_profile', payload)
    try {
      
      const response = yield call(user_profile_service, payload);
      console.log("response of the user profile response",response)
      if(response.status == 1){
          let data = response.data
          yield put({type:types.user_profile_success,data})
      }
      else{
          yield put({type:types.user_profile_failed})
      }
     
    } catch (error) {
      console.log('failure',error)
      yield put({type: types.user_profile_failed});
    }
  }
