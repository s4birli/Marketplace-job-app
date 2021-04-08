import * as types from './index'

export const rootsRequest = ( token , type ) =>{
    return{
        type: types.ROOTS_REQUEST,
        payload:{
            token,
            type
        }
    }
}

export const getLatestRequest = ( token , type , offset ) =>{
    return{
        type: types.LATEST_ROOTS_REQUEST,
        payload:{
            token,
            type,
            offset
        }
    }
}

export const getCategories = ( token  ) =>{
    return{
        type: types.CATEGORY_PICKER_REQUEST,
        payload:{
            token
        }
    }
}

export const getRegex = (token) => {
    return{
        type: types.REGEX_PICKER_REQUEST,
        payload: {
            token
        }
    }
}
