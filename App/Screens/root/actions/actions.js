import * as types from './index'

export const saveRootTitleData = (payload) => {
    return{
        type:types.ROOT_TITLE_SAVE,
        payload
    }
}

export const saveRootPricingData = (payload) => {
    return{
        type:types.ROOT_PRICING_SAVE,
        payload
    }
}

export const saveRootDetailsData = (payload) => {
    return{
        type:types.ROOT_DETAILS_SAVE,
        payload
    }
}

export const clearRootData = (payload) => {
    return{
        type:types.CLEAR_ROOT,
    }
}

export const saveRootData = (payload) => {
    console.log('payload data',payload)
    return{
        type:types.SAVE_ROOT,
        payload
    }
}



