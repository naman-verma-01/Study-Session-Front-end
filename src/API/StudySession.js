import { serverApiUrl } from "../index"

// using create Session api
export const createSession = (sessionInfo,callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "studysession/createSession",
        {
            method: 'POST',
            headers,
            body: JSON.stringify(sessionInfo)


        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

// using get session api
export const getSession = (callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "studysession/getSession",
        {
            method: 'GET',
            headers,


        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

// using get Sessions sorted by start date api 
export const getSortedSession = (order, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "studysession/getSortedSession?order=" + order,
        {
            method: 'GET',
            headers,


        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

// using register to session api
export const registerForSession = (id, email, userName, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "studysession/registerForSession",
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({ id, email, userName })


        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

// using api to get sessions posted by a perticular user
export const getSessionsOfUser = (email, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "studysession/getSessionsOfUser?email=" + email,
        {
            method: 'GET',
            headers,

        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}