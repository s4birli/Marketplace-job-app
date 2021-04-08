import config from '../../config'

export const payments = async (token) => {
  return await fetch(config.payments_withdrawl, {
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
      console.log("Payments Withdrawl", json)
      return json;
    });
}

export const getFinalPriceService = async (token, finalPrice) => {
  return await fetch(config.checkout, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({
      'price': finalPrice
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("checkout res", json)
      return json;
    });
}

export const paymentClearance = async (token) => {
  return await fetch(config.payment_clearance, {
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
      console.log("checkout res", json)
      return json;
    });
}

export const applyCoupon = async (token, data) => {
  return await fetch(config.apply_coupon, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("coupon", json)
      return json
    })
}
// this.props.token,
//       passedRootDetails.r_user_id,
//       passedRootDetails.delivery_days,
//       passedRootDetails.final_price,
//       passedRootDetails.used_balance,
//       passedRootDetails.processing_fees,
//       passedRootDetails.r_id,

export const getPaymentHTML = async (token, user_id, days, finalPrice, usedBalance, processingFees, r_id, o_id, packagePrice) => {
  console.log(`https://www.talentsroot.com/api_v1/order/hyperpay?api-key="B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5"&auth-token=${token}&Content-Type=application/x-www-form-urlencoded&user_id=${user_id}&deliveryDay=${days}&finalprice=${finalPrice}&usedBalance=${usedBalance}&processingPrice=${processingFees}&r_id=${r_id}&price=${finalPrice}`)
  return await fetch(
    `https://www.talentsroot.com/api_v1/order/hyperpay?api-key="B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5"&auth-token=${token}&Content-Type=application/x-www-form-urlencoded&user_id=${user_id}&packagePrice=${packagePrice}&deliveryDay=${days}&orderID=${o_id}&finalprice=${finalPrice}&usedBalance=${usedBalance}&processingPrice=${processingFees}&r_id=${r_id}&price=${finalPrice}`, {
    method: "GET",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/x-www-form-urlencoded",
      "auth-token": token
    }
  })
    .then(response => {
      return response.text()
    }).then(html => {
      return html;
    });
}

export const withdrawMoney = async (token, gateway, email, amount) => {
  let data;
  if (gateway == 1) {
    data = {
      'gateway': gateway,
      'paypalid': email,
      'amount': amount
    }
  } 
  else if (gateway == 2) {
    data = {
      'gateway': gateway,
      'cashuid': email,
      'amount': amount
    }
  }
  else if (gateway == 3){
    data = {
      'gateway': gateway,
      'payoneerid': email,
      'amount': amount
    }
  }
  console.log(data)

  return await fetch(config.withdraw_money, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("checkout res", json)
      return json;
    });
}
