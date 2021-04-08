import {call, put} from 'redux-saga/effects';
import {userLogin} from '../../../services/auth';
import * as types from '../actions';
import {
  dashbord,
  category_service,
  regex_service
} from '../../../services/home';

export function* getRoots(action) {
  try {
    const response = yield call( dashbord , action.payload );   
    if (response.status === 1) {
      let data = response.data;
      yield put({ type : types.ROOTS_SUCCESS , payload : { data : data }});
    } else {
      yield put({ type : types.ROOTS_FAILURE });
    }
  } catch (error) {
    yield put({ type : types.ROOTS_FAILURE });
  }
}


export function* getCategories(action) {
  try {
    const response = yield call( category_service , action.payload );   
    if (response.status === 1) {
      let categories = response.data;
      yield put({ type : types.CATEGORY_PICKER_SUCCESS , payload : { categories : categories }});
    } else {
      yield put({ type : types.CATEGORY_PICKER_FAILURE });
    }
  } catch (error) {
    yield put({ type : types.CATEGORY_PICKER_FAILURE });
  }
}

// export function* getRegex(action){
//   try {
//     const response = yield call( regex_service , action.payload );   
//     if (response.status === 1) {
//       let regex = response.data;
//       yield put({ type : types.REGEX_PICKER_SUCCESS , payload : { regex : regex }});
//     } else {
//       yield put({ type : types.REGEX_PICKER_FAILURE });
//     }
//   } catch (error) {
//     yield put({ type : types.REGEX_PICKER_FAILURE });
//   }
// }






// export function* recommendedRoots(payload) {
//   try {
//     const response = yield call( dashbord ,payload.payload);
//     console.log("Recommended",response)
//     if (response.status == 1) {
//       let data = response.data.popular;
//       yield put({type: types.RECOMMENDED_ROOTS_SUCCESS, data});
//     } else {
//       yield put({type: types.RECOMMENDED_ROOTS_FAILURE});
//     }
//   } catch (error) {
//     yield put({type: types.RECOMMENDED_ROOTS_FAILURE});
//   }
// }

// export function* latestRoots(payload) {
//   try {
//     const response = yield call(latest_roots,payload.payload);
//     console.log('response latest', response);
//     if (response.status == 1) {
//       let data = response.data.latest;

//       yield put({type: types.LATEST_ROOTS_SUCCESS, data});
//     } else {
//       yield put({type: types.LATEST_ROOTS_FAILURE});
//     }
//   } catch (error) {
//     yield put({type: types.LATEST_ROOTS_FAILURE});
//   }
// }

// export function* recentRoots(payload) {
//   try {
//     console.log("Recent view worker going to call")
//     const response = yield call(Recently_viewed,payload.payload);
//     console.log('response recent viewed worker', response);
//     if (response.status == 1) {
//       let data = response.data.recent_viewed;

//       yield put({type: types.RECENTLY_VIEWED_SUCCESS, data});
//     } else {
//       yield put({type: types.RECENTLY_VIEWED_FAILURE});
//     }
//   } catch (error) {
//     yield put({type: types.RECENTLY_VIEWED_FAILURE});
//   }
// }

// Top rated roots : yes
// popular roots : yes
// latest roots : yes 
// recently viewed 