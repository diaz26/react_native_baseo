import { GLOBAL } from "../general/global";
import {AsyncStorage} from 'react-native';

const headers = new Headers({
    'Content-Type': 'application/json',
});

async function registerCreate() {
    return fetch(`${GLOBAL.url}register`)
        .then ( (res) => res.json() )
        .then( (listas) => {
            return listas
        })
        .catch( (err) => {
            console.log(err)
        });
}

async function agregarUsuario(data) {
    return fetch(GLOBAL.url + 'register', { headers: headers, method: 'POST', body: JSON.stringify(data) })
        .then ( (res) => res.json() )
        .then( async(data) => {
            if (data.status == 'success') {
                await updateGlobalToken(data.token)
            }
            return data
        })
        .catch( (err) => {
            console.log(err)
        });
}



async function login(data) {
    return fetch(GLOBAL.url + 'login', { headers: headers, method: 'POST', body: JSON.stringify(data) })
        .then ( (res) => res.json() )
        .then( async(res) => {
            
            if (res.status == 'success') {
                await AsyncStorage.setItem('token', res.access_token);
                await AsyncStorage.setItem('tiempoExpiracion', res.expires_in);
            }
            return res
        })
        .catch( (err) => {
            console.log(err)
        });
}

async function logout() {
    return fetch(GLOBAL.url + 'logout')
        .then((res) => res.json())
        .then(async (res) => {
            await AsyncStorage.removeItem('token')
            return res
        })
        .catch((err) => {
            console.log(err)
        });
}

export {registerCreate, agregarUsuario, login, logout}