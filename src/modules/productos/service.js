import { GLOBAL } from "../general/global";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GLOBAL.token}`
};

async function allProducts() {
    return fetch(`${GLOBAL.url}productos`, { headers: headers })
        .then ( (res) => res.json() )
        .then( (data) => {
            return data.productos
        })
        .catch( (err) => {
            console.log(err)
        });
}

async function products() {
    return fetch(`${GLOBAL.url}productos/my`, { headers: headers })
        .then ( (res) => res.json() )
        .then( (data) => {
            return data.productos
        })
        .catch( (err) => {
            console.log(err)
        });
}

async function addProducto(data) {
    return fetch(GLOBAL.url + 'productos', { headers: headers, method: 'POST', body: JSON.stringify(data) })
        .then ( (res) => res.json() )
        .then( (data) => {
            return data
        })
        .catch( (err) => {
            console.log(err)
        });
}

async function searchProduct(term) {
    return fetch(GLOBAL.url + 'productos/search', { headers: headers, method: 'POST', body: JSON.stringify({term}) })
        .then ( (res) => res.json() )
        .then( (data) => {
            return data.productos
        })
        .catch( (err) => {
            console.log(err)
        });
}

export {allProducts, products, addProducto, searchProduct}