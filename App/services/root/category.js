import config from '../../config';
import {all} from 'redux-saga/effects';
export const category_service =(payload) => {
  return fetch(config.categories, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'tz':payload.tz,
      'auth-token':payload.token
    },
    body: JSON.stringify({
      type: all,
      offset: 0,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
        console.log("REsopo",json)
      return json;
    });
};

export const sub_category_service =(payload) => {
    console.log(" sub ttttttt",payload)
  return fetch(config.subcategories+payload.id, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'tz':payload.tz,
      'auth-token':payload.token
    },
    body: JSON.stringify({
      type: all,
      offset: 0,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
        console.log("REsopo",json)
      return json;
    });
};
