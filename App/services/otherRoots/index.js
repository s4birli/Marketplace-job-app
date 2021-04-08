import config from '../../config'

  export const other_roots = async (token,root_id, user_id, offsetNum) => {
      console.log('other root of id',user_id)
    return await fetch(config.otherRootsDetail,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
      body : JSON.stringify({
        root_id: root_id,
        user_id : user_id,
        offset: offsetNum
      })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("other roots",json)
      return json;
    });
  }
  
  export const user_roots = async (token,user_id, offsetNum) => {
    return await fetch(config.userRootsDetail,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
      body : JSON.stringify({
        user_id: user_id,
        offset: offsetNum
      })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("other roots",json)
      return json;
    });
  }
