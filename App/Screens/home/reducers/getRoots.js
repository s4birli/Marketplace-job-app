import * as types from "../actions";
const initialState = {
  all : {},
  error:false ,
  isLoading : false,
  type : 'all'
};

export default function getRoots(state = initialState , action ) {
  switch (action.type) {
    case types.ROOTS_REQUEST:
      return { ...state, isLoading : true, type : action.payload.type  , error: false,  all :{} };
    case types.ROOTS_SUCCESS:
      return {...state , all : action.payload.data ,isLoading:false  , error: false,}
    case types.ROOTS_FAILURE:
      return { ...state , isLoading : false, all:{} , error:true };
    default:
      return state;
  }
}
