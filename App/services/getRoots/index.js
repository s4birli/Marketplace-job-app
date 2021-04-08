import config from '../../config';

export const get_roots = async (token,data) => {
  console.log('data',data)
    return await fetch(config.home,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(data)
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err=>{
      console.log(err.response)
    })
  }