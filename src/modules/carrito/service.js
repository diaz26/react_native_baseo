import { GLOBAL } from "../general/global";
import {AsyncStorage} from 'react-native';

async function paramsOrder() {
    const token = await AsyncStorage.getItem('token')
    return fetch(`${GLOBAL.url}orders`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
        });
}

async function insertOrder(data) {

    const token = await AsyncStorage.getItem('token')
    
    return fetch(GLOBAL.url + 'orders', {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(async (data) => {
            return data
        })
        .catch((err) => {
            console.log(err)
        });
}

export {
    paramsOrder,
    insertOrder
}