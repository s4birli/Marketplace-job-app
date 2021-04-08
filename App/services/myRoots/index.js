import config from '../../config'

export const my_roots = async (token, status) => {
  console.log('status',status)
    return await fetch(config.get_roots,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({
          'status' : status 
        })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(" myRequests",json)
      return json;
    }).catch(err => console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr',err))
}

export const root_list_action = async (token,data) => {
  return await fetch(config.rootAction,{
    method: "POST",
    headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({
        'action' : data.action,
        'root_id' : data.root_id  
      })
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(" root_list_action",json)
    return json;
  });
}
