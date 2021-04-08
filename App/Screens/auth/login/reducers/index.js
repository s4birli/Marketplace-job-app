// import {LOGIN_CALL_REQUEST,LOGIN_CALL_SUCCESS,LOGIN_CALL_FAILURE} from '../actions'
import * as types from "../actions";
const initialState = {
  fetching: false,
  loggedin:false,
  userToken:null,
  error:false,
  name:null,
  email:null,
  profile:'',
  fbfetching:false,
  googlefetching: false,
  user_id: null
};

export default function LoginUser(state = initialState, action) {
  switch (action.type) {
    case types.FB_LOGIN_REQUEST:
      return { ...state, fbfetching: true, fetching: false, error: false, loggedin:false,profile:''}
    case types.GOOGLE_LOGIN_REQUEST:
      return { ...state, googlefetching:true, error: false, loggedin:false, profile:''}
    case types.LOGIN_REQUEST:
      return { ...state, fetching: true, error: false,loggedin:false,profile:'' };
    case types.LOGIN_SUCCESS:
      return {...state,loggedin:true,fetching:false, googlefetching:false, fbfetching:false, userToken:action.userToken,name:action.name,email:action.email,profile:action.profile, user_id: action.user_id, type: action.user_type}
    case types.LOGIN_FAILURE:
      return { ...state, fetching: false,googlefetching: false,fbfetching:false, loggedin:false,error:true,userToken:null,name:null,email:null,profile:'' };
    case types.LOGOUT_REQUEST:
      return {...state,loggedin:false,error:false, name:null, email:null, profile:'',userToken:null, user_id: null}
    default:
      return state;
  }
}
