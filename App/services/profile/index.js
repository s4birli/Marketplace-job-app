import {ToastAndroid, Alert} from 'react-native';
import config from '../../config';

export const profile_service = request => {
  return fetch(config.profile, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': request.token,
    },
    body : JSON.stringify({
      'user_id' : request.user_id
    })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log('profile response data', json);
      return json;
    })
};

export const root_details = (token, id) => {
  return fetch(config.rootDetails, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      root_id: id,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log('profile response data', json);
      return json;
    });
};

export const edit_profile = (request, token) => {
  console.log('edit_profile',request, token);
  let prefferedLang = request.LanguageList.find(cat => cat.name == request.preferredLang);
  let additionalLang = request.LanguageList.find(cat => cat.name == request.additionalLang);
  let country = request.countryList.find(cat => cat.cnt_name == request.country);
  let photo = {
    uri: request.profileImage,
    type: 'image/jpeg',
    name: 'photo.jpg',
  };
  let bodyData = new FormData();
  bodyData.append('first_name', request.firstname);
  bodyData.append('last_name', request.lastname);
  bodyData.append('email', request.email);
  bodyData.append('preffered_language', request.prefferedLanguageId?request.prefferedLanguageId:prefferedLang.id);
  bodyData.append('additional_language', request.additionalLanguageId?request.additionalLanguageId:additionalLang.id);
  bodyData.append('type', request.type);
  bodyData.append('description', request.profileDesc ? request.profileDesc : '');
  bodyData.append('gender', 1);
  bodyData.append('phone', request.phone?request.phone:'');
  bodyData.append('country', country.cnt_code);
  bodyData.append('timezone', request.timezone);
  bodyData.append('email_notifications', 0);
  bodyData.append('mobile_notifications', 0);
  bodyData.append('category_notifications', 0);
  bodyData.append('profile', photo);
  bodyData.append('skills', request.tags.tagsArray.join());
  return fetch(config.editProfile, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      // 'Content-Type': 'application/json',
      'Content-type': 'multipart/form-data',
      'auth-token': token,
    },
    body: bodyData
  })
    .then(response => {
      console.log('profile updatesss', response);
      return response.json();
    })
    .then(json => {
      Alert.alert(json.message)
      // ToastAndroid.show(json.message, ToastAndroid.SHORT);
      console.log('profile update', json);
      return json;
    });
};

export const editEmail = (token, paypal, cashu) => {
  return fetch(config.editProfile, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      'paypal_id': paypal,
      'cashu': cashu
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      ToastAndroid.show("updated successfully", ToastAndroid.SHORT);
      return json;
    });
};

export const user_profile_service = request => {
  console.log(
    'user profile service',
    config.userProfile + `?id=${request.payload.id}`,
  );
  return fetch(config.userProfile + `?id=${request.payload.id}`, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'auth-token': request.payload.token,
    },
    body: {
      id: request.payload.id,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log('profile response data of the other', json);
      return json;
    });
};

export const review_detail = (token, id, offsetNum) => {
  return fetch(config.reviewDetail, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      root_id: id,
      offset: offsetNum
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log('reviewDetail', json);
      return json;
    });
};

export const other_roots_detail = (token, id) => {
  return fetch(config.otherRootsDetail, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      id : id,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log('otherRootsDetail', json);
      return json;
    });
};

