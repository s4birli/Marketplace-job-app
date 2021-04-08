import config from '../../config';

export const edit_request = async (token, data) => {
  console.log('data',data)
    return await fetch(config.editRequest,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          'Content-Type': 'multipart/form-data',
          "auth-token": token,
        },
        body: data
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log('edit request',json)
      return json;
    })
    .catch(err=>{
      console.log('err.response',err)
    })
  }

  export const delte_request_file = async (token, id) => {
      return await fetch(config.deleteFileInRequest,{
        method: "POST",
        headers: {
            'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
            'Content-Type': 'application/json',
            "auth-token": token,
          },
          body: JSON.stringify({
            id 
          })
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log('edit request',json)
        return json;
      })
      .catch(err=>{
        console.log('err.response',err)
      })
    }
  