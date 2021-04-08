import config from '../../config';

export const userLogin = async request => {
  console.log('login request', request);
  return fetch(config.login, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: request.username,
      password: request.password,
      device_id: request.device_id,
      device_type: 1
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch((err)=>{
      console.log("Login err======", err)
    })
};

export const FbAuthLogin = async request => {
  console.log('login request', request);
  return fetch(config.facebookLogin, {
    method: 'POST',
    headers: {
      // 'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'api-key': 'AIzaSyDxo00YV2vegDxQjGmbOKWukqDKtXAMOwY',
      'Content-Type': 'application/json',
      'auth-token': 'L6g1tajZuQvD6BK93n2mL4pRl84JCsbf',
      'tz': request.tz
    },
    body: JSON.stringify({
      facebook_id: request.facebook_id,
      device_type:1,
      email: request.email,
      device_id:request.device_id,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("response",json)
      return json;
    });
};

export const GoogleAuthLogin = async request => {
  console.log('login request', request);
  return fetch(config.googleLogin, {
    method: 'POST', 
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': 'L6g1tajZuQvD6BK93n2mL4pRl84JCsbf',
      'tz': request.tz
    },
    body: JSON.stringify({
      google_id: request.google_id,
      device_type:1,
      device_id:request.deviceId,
      email:request.email
    }),
  })
    .then(response => {
      console.log('response', response)
      return response.json();
    })
    .then(json => {
      console.log("response",json)
      return json;
    });
};

export const userRegister = async (username, email, password, type) => {
  return fetch(config.register, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'tz': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
      type: type
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("json registration", json)
      return json;
    });
};

export const userFacebookRegister = async (request, device_id, type) => {
  return fetch(config.register, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': 'L6g1tajZuQvD6BK93n2mL4pRl84JCsbf',
      'tz': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    body: JSON.stringify({
        facebook_id: request.facebook_id,
        name: request.first_name,
        email: request.email,
        username:request.name,
        type: type,
        password: 123,
        device_type:1,
        device_id:device_id,
        first_name: request.first_name,
        last_name: request.last_name,
        profile: `http://graph.facebook.com/${request.facebook_id}/picture?width=500&height=500`
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("json registration", json)
      return json;
    });
};
export const userGoogleRegister = async (request, googleusername, googlepassword, device_id, type) => {
  let formData = new FormData();
  formData.append('google_id', request.id);
  formData.append('name', googleusername);
  formData.append('email', request.email);
  formData.append('first_name', googleusername);
  formData.append('last_name', googleusername);
  formData.append('type', type);
  formData.append('password', googlepassword);
  formData.append('profile', 'https://www.googleapis.com/auth/userinfo.profile');

  return fetch(config.googleRegister, {
    method: 'POST',
    headers: {
      // 'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'api-key': 'AIzaSyDxo00YV2vegDxQjGmbOKWukqDKtXAMOwY',
      'Content-Type': 'multipart/form-data',
      'auth-token': 'L6g1tajZuQvD6BK93n2mL4pRl84JCsbf',
      'tz': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    body: formData
  })
    .then(response => {
      console.log(response)
      return response.json();
    })
    .then(json => {
      console.log("json registration", json)
      return json;
    });
};
userGoogleRegister

export const forgetPwEmail = (email) => {
  return fetch(config.forgetPassword, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
}

export const log_out = async (token, device_id) => {
  console.log('logout request', device_id);
  return fetch(config.logout, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      device_id: device_id,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch((err)=>{
      console.log("Login err======", err)
    })
};
