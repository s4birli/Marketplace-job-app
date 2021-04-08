import * as types from './index'

export const profilerequest = (token,id) => {
    console.log("profile request ",token,id)
    return{
        type:types.user_profile,
        payload:{token,id}
    }
}