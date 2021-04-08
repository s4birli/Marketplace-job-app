import * as types from './index'

export const Login = (username,password,device_id) => {
    return{
        type:types.LOGIN_REQUEST,
        payload:{username,password,device_id}
    }
}

export const LoginWithFacebook = (facebook_id, name, email, first_name, last_name, device_id) => {
    console.log(last_name)
    return{
        type:types.FB_LOGIN_REQUEST,
        payload:{facebook_id, name, email, first_name, last_name, device_id, tz}
    }
}

export const LoginWithGoogle = (google_id, deviceId, tz, email) => {
    return{
        type: types.GOOGLE_LOGIN_REQUEST,
        payload: {google_id, deviceId, tz, email}
    }
}

