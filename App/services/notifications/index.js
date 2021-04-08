import config from '../../config'

export const notifications = async (token, type) => {
  return await fetch(config.notifications, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({
      'n_reference_type': type
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("My Notifications", json)
      return json;
    });
}

export const rootNotifications = async (token) => {
  return await fetch(config.root_notification, {
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
      console.log("My Notifications", json)
      return json;
    });
}

export const markAsReadNotification = async(token, n_id) => {
  return await fetch(config.notificationRead, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({
      'type': 0,
      'n_id': n_id,
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("My Notifications", json)
      return json;
    });
}

export const markAllAsReadNotification = async(token, n_id) => {
  return await fetch(config.notificationRead, {
    method: "POST",
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      "Content-Type": "application/json",
      "auth-token": token
    },
    body: JSON.stringify({
      'n_id': n_id,
      'type': 1
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("My Notifications", json)
      return json;
    });
}