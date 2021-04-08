import config from '../../config'

export const my_favorites = async (token) => {
    return await fetch(config.myFavorites,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("my_favorites",json)
      return json;
    });
  }

export const remove_favorites = async (token,root_id) => {
    return await fetch(config.removeFavorites,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
      body:JSON.stringify({
        root_id
      })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("my_favorites",json)
      return json;
    });
  }

export const  add_to_favorite = async (token,root_id) => {
  console.log('root_id',root_id)
    return await fetch(config.addFavorites,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
      body:JSON.stringify({
        root_id
      })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("add to favorite",json)
      return json;
    });
  }


export const  check_favorite = async (token,root_id) => {
  return await fetch(config.checkFavorite,{
    method: "POST",
    headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        "Content-Type": "application/json",
        "auth-token": token
      },
    body:JSON.stringify({
      root_id
    })
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log("checkFavorite",json)
    return json;
  });
}