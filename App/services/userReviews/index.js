import config from '../../config'

export const user_reviews = async (token,data) => {
    return await fetch(config.userReviews,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
      body : data
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("My Reviews",json)
      return json;
    }).catch(err => console.log('errrrrrrrrrrrrrrrrrrrr',err));
  }
