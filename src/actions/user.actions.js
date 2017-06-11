import * as actionTypes from './actionTypes';

export function fetchLogin (username, password) {
    const promise = fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    return {
        onRequest: actionTypes.FETCH_LOGIN_REQUEST_TRIGGERED,
        onSuccess: actionTypes.FETCH_LOGIN_REQUEST_SUCCESS,
        onFailure: actionTypes.FETCH_LOGIN_REQUEST_FAILURE,
        promise,
    };

}

export function createUser(username, password, firstName, lastName) {
    const promise = fetch('htttp://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            firstName,
            lastName
        })
    });

    return {
        onRequest: actionTypes.CREATE_USER_REQUEST_TRIGGERED,
        onSuccess: actionTypes.CREATE_USER_REQUEST_SUCCESS,
        onFailure: actionTypes.CREATE_USER_REQUEST_FAILURE,
        promise,
    };
}
