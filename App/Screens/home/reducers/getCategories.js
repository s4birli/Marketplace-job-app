import * as types from "../actions";
const initialState = {
  categories : [],
  error:false ,
  isLoading : false,
};

export default function getCategories(state = initialState , action ) {
  switch (action.type) {
    case types.CATEGORY_PICKER_REQUEST:
      return { ...state, isLoading : true, error: false,  categories : [] };
    case types.CATEGORY_PICKER_SUCCESS:
      return {...state , categories : action.payload.categories ,isLoading:false  , error: false,}
    case types.CATEGORY_PICKER_FAILURE:
      return { ...state , isLoading : false, categories : [] , error:true };
    default:
      return state;
  }
}
