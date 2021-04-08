import config from '../../config'
import { bindActionCreators } from 'redux';

export const orderSuccess = (
  seller_id,
  buyer_id,
  root_id,
  amount,
  used_balance,
  processing_fees,
  day,
  delivery_days,
  delivery_price,
  revision_days,
  revision_price,
  token) => {
  return fetch(config.success_order, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'seller_id': seller_id,
      'buyer_id': buyer_id,
      'root_id': root_id,
      'amount': amount,
      'used_balance': used_balance,
      'processing_fees': processing_fees,
      'day': day,
      'payment_method': 0,
      'extra[extra_fast_delivery][days]': delivery_days,
      'extra[extra_fast_delivery][price]': delivery_price,
      'extra[extra_revision][days]': revision_days,
      'extra[extra_revision][price]': revision_price
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>>>>>>>>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const orderCancel = (token, seller_id, buyer_id, message, orderID) => {
  console.log(token, seller_id, buyer_id, message, orderID)
  return fetch(config.cancelOrder, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'sellerID': seller_id,
      'buyerID': buyer_id,
      'message': message,
      'orderid': orderID
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error("in catch...",error);
    });
}

export const orderActionCancel = (token, o_id, type) => {
  return fetch(config.cancelActionOrder, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'order_id': o_id,
      'type':type
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error("in catch...",error);
    });
}

export const orderAccept = (token, orderID) => {
  return fetch(config.acceptOrder, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'order_id': orderID
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error("in catch...",error);
    });
}

export const submitRating = (token, s_id, b_id, reviewMeg, o_id, comR, quaR, recR) => {
  console.log(token, s_id, b_id, reviewMeg, o_id, comR, quaR, recR)
  const formData = new FormData();
  formData.append('message', reviewMeg);
  formData.append('sellerID', s_id);
  formData.append('buyerID', b_id);
  formData.append('orderid', o_id);
  formData.append('communication_level', comR);
  formData.append('quality_of_delivered_work', quaR);
  formData.append('recommended_for_others', recR);
  return fetch(config.submitRating, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    body: formData
  }).then((response) => response.json())
  .then((responseJson) => {
    console.log("=====>", responseJson)
    return responseJson;
  })
  .catch((error) => {
    console.error("in catch...",error);
  });
}

export const extendDeliverTimeService = (token, message, days, s_id, b_id, o_id) => {
  const formData = new FormData();
  formData.append('message', message);
  formData.append('days', days);
  formData.append('sellerID', s_id);
  formData.append('buyerID', b_id);
  formData.append('orderid', o_id);

  return fetch(config.extendDeliverTime, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    body: formData
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const extendService = () => {

}

export const addCustomExtraService = (token, message, days, s_id, b_id, o_id, price) => {

  const formData = new FormData();
  formData.append('message', message);
  formData.append('days', days);
  formData.append('sellerID', s_id);
  formData.append('buyerID', b_id);
  formData.append('orderid', o_id);
  formData.append('price', price);

  return fetch(config.addCustomExtra, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    body: formData
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}


export const deliverOrderService = (token, message, o_id, s_id, b_id, waterMark, fileOptions) => {
  const formData = new FormData();
  formData.append('message', message);
  formData.append('orderid', o_id);
  formData.append('sellerID', s_id);
  formData.append('buyerID', b_id);
  formData.append('watermark', waterMark);
  fileOptions.forEach((item, i) => {
    formData.append('files[]', {
      'uri': item.uri,
      'type': item.type,
      'name': item.fileName
    });
  })

  return fetch(config.deliverOrder, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    body: formData
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const orderHistory = (token, o_id) => {
  return fetch(config.orderHistory, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'order_id': o_id
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error("in catch...",error);
    });
}

export const cancelExtendService = (token, o_id) => {
  console.log(token, o_id)
  const formData = new FormData();
  
  formData.append('orderid', o_id);
  formData.append('type', 1);
  
  return fetch(config.cancelExtendDelivery, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    body: formData
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>>>>>>>>>>>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const cancelCustomExtraService = (token, o_id) => {
  const formData = new FormData();
  
  formData.append('orderid', o_id);
  formData.append('type', 1);
  
  return fetch(config.cancelCustomExtra, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'multipart/form-data',
      'auth-token': token
    },
    body: formData
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("=====>>>>>>>>>>>", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}