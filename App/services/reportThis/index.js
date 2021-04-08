import config from '../../config'

export const report_this = async (token, data) => {
    return await fetch(config.reportThis,{
      method: "POST",
      headers: {
          'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({
          r_id : data.r_id,
          message : data.message
        })
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("report this",json)
      return json;
    });
}