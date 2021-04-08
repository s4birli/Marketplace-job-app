import config from '../../config'

export const transaction = async (token, offsetNum) => {

    return await fetch(config.transaction,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
      body: JSON.stringify({
        "offset": offsetNum
      })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("Transactions",json)
      return json;
    });
  }