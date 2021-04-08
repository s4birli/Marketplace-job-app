import config from '../../config'

export const buyers_requests = async (token, offsetNum) => {
  console.log("buyerssssssssssss",token, offsetNum)
  return await fetch(config.buyersRequests, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({
      'offset': offsetNum
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("buyers request", json)
      return json;
    });
}

export const sendCustomOfferService = async (req_id, token, offer_details, selectedDays, r_id, offerPrice) => {
  return await fetch(config.send_offer, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({
      'request_id': req_id,
      'description': offer_details,
      'root_id': r_id,
      'delivery': selectedDays,
      'amount': offerPrice
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("buyers request", json)
      return json;
    });
}