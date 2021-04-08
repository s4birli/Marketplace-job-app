import config from '../../config'

export const get_list_by_category = async (token, c_id) => {
    return await fetch(config.rootList, {
        method: "POST",
        headers: {
            'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
            "Content-Type": "application/json",
            "auth-token": token
        },
        body: JSON.stringify({
            category_id: c_id,
        }),
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        return json;
    });
}

export const get_countries = async (token) => {
    return await fetch(config.country, {
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
        return json;
    });
}

export const get_languages = async (token) => {
    return await fetch(config.language, {
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
        return json;
    });
}

export const filter_record = async ( token, data ) => {
    return await fetch(config.advancedSearch, {
        method: "POST",
        headers: {
            'api-key': 'B3vWg8qq4k2!9qePMh*U&Cu&tbPJ$Fywnk^5LYFUprx9BAetDk5',
            'Content-Type': 'multipart/form-data',
            "auth-token": token
        },
        body: data,
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        return json;
    })
    .catch(err=>console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrr',err))
}

