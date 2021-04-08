import config from '../../config'

export const get_conversation = async (token,name) => {
  console.log('token',token)
  console.log('name',name)
    return await fetch(config.conversation,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({
            'opponent' : name 
        })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    }).catch(err=>console.log('err',err))
  }