import config from '../../config'

export const my_shopping = async (token, type, offsetNum) => {
  console.log("shoppinggggggg",type)
  return await fetch(config.myShopping, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({
      type: type,
      offset: offsetNum
    })
  })
    .then(response => {
      console.log("---------", response)
      return response.json();
    })
    .then(json => {
      console.log("---------", json)
      return json;
    }).catch((err)=>console.log(">>>>>.", err));
}