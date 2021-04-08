import config from '../../config';

export const getPreviousChats = (token, type) => {
  // console.log("in service function......", token);
  return fetch(config.conversation_list, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'type': type,
      'offset': 0,
      'limit': 15
    })
  }).then(response => {
    return response.json();
  })
  .then(json => {
    // console.log("response.......", json)
      return json;
    });
}

export const loadMorePreviousChats = (token, type) => {
  console.log("in service function......", token);
  return fetch(config.conversation_list, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'type': type,
      'offset': 15,
      'limit': 15
    })
  }).then(response => {
    return response.json();
  })
  .then(json => {
    console.log("response.......", json)
      return json;
    });
}


export const sendMessage = (con_id, message, token) => {
  console.log("in send message.........", con_id, message, token);
  return fetch(config.send_message, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'conversation_id': con_id,
      'message': message
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      // console.log("positive res", responseJson)
      return responseJson;
    })
    .catch((error) => {
      // console.error("in send message",error);
    });
}
export const eventRead = (con_id, token) => {
  return fetch(config.chat_eventread, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'conversation_id': con_id
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      // console.log("positive res", responseJson)
      return responseJson;
    })
    .catch((error) => {
      // console.error("in send messageeeeeeeeeeeeeee",error);
    });
}
export const eventTyping = (con_id, token) => {
  console.log("conversationId=============", con_id)
  return fetch(config.chat_eventtyping, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'conversation_id': con_id
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("eventreading res", responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error("in send message",error);
    });
}
export const getChats = (con_id, token) => {
  console.log("token---------", token)
  console.log("in get chat", con_id, token);
  return fetch(config.chat_list, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'conversation_id': con_id,
      'offset': 0,
      'limit': 15
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("resposejson",responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.log("ffffffffffffffffffffff", error)
      console.error(error);
    });
}

export const loadMoreChat = (con_id, token, offsetNum) => {
  return fetch(config.chat_list, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'conversation_id': con_id,
      'offset': offsetNum
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const uploadFile = (fileOptions, con_id, waterMark, token, isvoice) => {
    let fileName;  
    if (isvoice){
      fileName = fileOptions.split('/')
      console.log("recording==============", fileOptions, fileName[fileName.length-1])
    }
    const formData = new FormData();
    if (isvoice){
      formData.append('files', {
        'uri':  `file://${fileOptions}`,
        'type': 'audio/wav',
        'name': `${fileName[fileName.length-1]}`
      });
    }
    else {
      formData.append('files', {
        'uri':  fileOptions.uri,
        'type': fileOptions.type,
        'name': fileOptions.fileName
      });
    }
    formData.append('conversation_id', con_id);
    formData.append('watermark', waterMark);
    console.log("form data", formData);
    return fetch(config.upload_file, {
      method: 'POST',
      headers: {
        'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
        'Content-Type': 'multipart/form-data',
        'auth-token': token
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("response +++",responseJson)
        return responseJson;
      })
      .catch((error) => {
        console.error("--------",error);
      });  
}

export const blockUserService = (id, type, token) => {
  console.log(id, token, type)
  return fetch(config.block_user, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'id': id,
      'type': type
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const favUserService = (id, token) => {
  return fetch(config.favourite_chat, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'id': id
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
    // console.log(responseJson)
    return responseJson;
  })
  // .catch((error) => {
  //   console.error(error);
  // });
}

export const getRoots = (token) => {
  return fetch(config.get_roots, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'status': 1
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson)
      return responseJson;
    })
    .catch((error) => { 
      console.error(error);
    });
}

export const sendCustomOfferService = (con_id, token, offer_details, selectedDays, r_id, offerPrice) => {
  console.log("con_id, token, offer_details, selectedDays, r_id, offerPrice", con_id, token, offer_details, selectedDays, r_id, offerPrice)
  return fetch(config.custom_offer, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'conversation_id': con_id,
      'description': offer_details,
      'delivery': selectedDays,
      'root_id': r_id,
      'amount': offerPrice
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson)
      return responseJson;
    })
    .catch((error) => { 
      console.error(error);
    });
}

export const rejectCustomOffer = (con_id, token, status) => {
  return fetch(config.customOfferReject, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'offer_id': con_id,
      'type': status
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => { 
      console.error(error);
    });
}

export const withdrawOffer = (con_id, token, status) => {
  return fetch(config.customOfferReject, {
    method: 'POST',
    headers: {
      'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
      'Content-Type': 'application/json',
      'auth-token': token
    },
    body: JSON.stringify({
      'offer_id': con_id,
      'type': status
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      console.log("withdraw=========",responseJson)
      return responseJson;
    })
    .catch((error) => { 
      console.error(error);
    });
}