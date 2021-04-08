import config from '../../config'

export const my_reviews = async (token, offsetNum) => {
    return await fetch(config.myReviews,{
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
      return json;
    });
  }
  
  export const awarded_reviews = async (token, offsetNum) => {
    return await fetch(config.awardedReviews,{
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
      return json;
    });
  }

  export const pending_reviews = async (token, offsetNum) => {
    return await fetch(config.pendigReviews,{
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
      return json;
    });
  }