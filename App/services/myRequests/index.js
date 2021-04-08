import config from '../../config'

export const my_requests = async (token, type) => {
    return await fetch(config.myRequests,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
        body:JSON.stringify({
          type: type
        })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(" myRequests",json)
      return json;
    });
  }