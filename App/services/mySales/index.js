import config from '../../config'

export const my_sales = async (token, type, offsetNum) => {
    return await fetch(config.mysales,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
        body:JSON.stringify({
          type: type,
          offset: offsetNum
        })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
  }