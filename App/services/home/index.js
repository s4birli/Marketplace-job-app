import config from '../../config';


export const registerDevice = (token, fcmToken, deviceId) => {
  return fetch(config.registerFCM, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body:JSON.stringify({
      'push_token': fcmToken,
      'device_id': deviceId,
      'device_type': 1
    })
  })
  .then( response => {
    return response.json();
  })
  .then( json => {
    return json;
  })
  .catch( err => {
    console.log('error',err)
  })
};


export const dashbord = (payload) => {
  console.log("recommended",payload)
  return fetch(config.home, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token':payload.token
    },
    body:JSON.stringify({
      type: payload.type
    })
  })
  .then( response => {
    return response.json();
  })
  .then( json => {
    console.log('get roots',json)
    return json;
  })
  .catch( err => {
    console.log('error',err)
  })
};

export const category_service = (payload) => {
  return fetch(config.categories, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token':payload.token
    }
  })
  .then( response => {
    return response.json();
  })
  .then( json => {
    console.log('categories',json)
    return json;
  })
  .catch( err => {
    console.log('error',err)
  })
};

export const start_vacation = (token, reason, date) => {
  console.log("===============", token, reason, date)
  return fetch(config.vacation, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token':token
    },
    body:  JSON.stringify({
      'reason': reason,
      // 'end_date': date.getTime()
      'end_date': date
    })
  })
  .then( response => {
    return response.json();
  })
  .then( json => {
    console.log('categories',json)
    return json;
  })
  .catch( err => {
    console.log('error',err)
  })
}

export const getUserBalance = (token) => {
  return fetch(config.userBalance, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token':token
    },
  })
  .then( response => {
    return response.json();
  })
  .then( json => {
    return json;
  })
  .catch( err => {
    console.log('error',err)
  })
}

export const regex_service = (token) => {
  return fetch(config.getRegex, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    }
  })
  .then( response => {
    return response.json();
  })
  .then( json => {
    return json;
  })
  .catch( err => {
    console.log('error',err)
  })
}
