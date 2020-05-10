import { GLOBAL } from "../general/global";
import {AsyncStorage} from 'react-native';



async function allProducts() {

    const token = await AsyncStorage.getItem('token');

    return fetch(`${GLOBAL.url}productos`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        })
        .then ( (res) => res.json() )
        .then( (data) => {
            return data.productos
        })
        .catch( (err) => {
            console.log(err)
        });
}

async function products() {
    const token = await AsyncStorage.getItem('token');

    return fetch(`${GLOBAL.url}productos/my`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
            return data.productos
        })
        .catch((err) => {
            console.log(err)
        });
}

async function addProducto(data) {
    const token = await AsyncStorage.getItem('token');

    return fetch(GLOBAL.url + 'productos', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }),
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then ( (res) => res.json() )
        .then( (data) => {
            return data
        })
        .catch( (err) => {
            console.log(err)
        });
}

async function searchProduct(term) {
    const token = await AsyncStorage.getItem('token');
    return fetch(GLOBAL.url + 'productos/search', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }),
        method: 'POST',
        body: JSON.stringify({
            term
        })
    })
        .then ( (res) => res.json() )
        .then( (data) => {
            return data.productos
        })
        .catch( (err) => {
            console.log(err)
        });
}

export {allProducts, products, addProducto, searchProduct}