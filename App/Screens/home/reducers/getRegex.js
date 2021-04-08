import * as types from "../actions";
const initialState = {
  all : {},
  error:false ,
  isLoading : false,
  type : 'all'
};

export default function getRegex(state = initialState , action ) {
  switch (action.type) {
    case types.REGEX_PICKER_REQUEST:
      return { ...state, isLoading : true, type : action.payload.type  , error: false,  all :{} };
    case types.REGEX_PICKER_SUCCESS:
      return {...state , regex : action.payload.data ,isLoading:false  , error: false,}
    case types.REGEX_PICKER_FAILURE:
      return { ...state , isLoading : false, all:{} , error:true };
    default:
      return state;
  }
}