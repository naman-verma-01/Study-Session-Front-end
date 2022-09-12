import { serverApiUrl } from "../index"

// using post api to sign up new user
export const signup = (email, password, userName, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');
    headers.append("password", password)

    fetch(serverApiUrl + "auth/signup",
        {
            method: 'POST',
            headers,
            body: JSON.stringify({ email, userName })


        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

// using get api to login user
export const login = (email, password, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');
    headers.append("password", password)

    fetch(serverApiUrl + "auth/login?email="+email,
        {
            method: 'GET',
            headers,
            


        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

// using decryptJWT POST type api to decrypt accessToken
export const decryptJWT = (token, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "auth/decryptJWT",
        {
            method: 'POST',
            headers,
            body: JSON.stringify({ accessToken:token })


        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}