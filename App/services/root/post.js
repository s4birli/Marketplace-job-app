import config from '../../config'

export const postRoot = async (token,data) => {
  console.log('data in fetch',data)
    return fetch(config.postRoot, {
      method: 'POST',
      headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        'Content-Type': 'multipart/form-data',
        'auth-token':token,
      },
      body: data,
      
    })
      .then(response => {
        console.log("root response",response)
        return response.json();
      })
      .then(json => {
        console.log("post root")
        return json;
      })
      .catch(err=>console.log('error is',err))
};