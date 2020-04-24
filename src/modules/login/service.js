import { GLOBAL } from "../general/global";

const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GLOBAL.token}`
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

async function updateGlobalToken(token) {
    GLOBAL.token = token
}

export {registerCreate, agregarUsuario, login}