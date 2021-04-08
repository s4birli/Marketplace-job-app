import * as types from "../actions"

const initialState = {
    fetching:false,
    reviews:null,
    error:false,
    userProfile:null
}

export default function rootReviews(state=initialState,action){
    switch(action.type){
        case types.REVIEW_REQUEST:
            return {...state,fetching:true,error:false,}
        case types.REVIEW_SUCCESS:
            return {...state,fetching:false,reviews:action.review,error:false}
        case types.REVIEW_FAILURE:
            return {...state,fetching:false,review:null,error:true}
        case types.user_profile:
            return {...state,userProfile:null}
        case types.user_profile_success:
            return {...state,userProfile:action.data}
        case types.user_profile_failed:
            return {...state,userProfile:null}
        default:
            return state;
    }
}