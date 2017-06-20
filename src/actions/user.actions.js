import * as actionTypes from './actionTypes';
import fetch from 'httpService';

export function fetchLogin (username, password) {
    const promise = fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    }, true);

    return {
        onRequest: actionTypes.FETCH_LOGIN_REQUEST_TRIGGERED,
        onSuccess: actionTypes.FETCH_LOGIN_REQUEST_SUCCESS,
        onFailure: actionTypes.FETCH_LOGIN_REQUEST_FAILURE,
        promise,
    };

}

export function createUser(username, password, firstName, lastName) {
    const promise = fetch('http://localhost:8080/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
            firstName,
            lastName
        })
    }, true);

    return {
        onRequest: actionTypes.CREATE_USER_REQUEST_TRIGGERED,
        onSuccess: actionTypes.CREATE_USER_REQUEST_SUCCESS,
        onFailure: actionTypes.CREATE_USER_REQUEST_FAILURE,
        promise,
    };
}
