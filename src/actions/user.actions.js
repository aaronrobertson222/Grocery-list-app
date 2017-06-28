import * as actionTypes from './actionTypes';
import fetch from 'httpService';
import appConfig from '../config/appConfig';

export function fetchLogin (username, password) {
    const promise = fetch(appConfig.USER_LOGIN_PATH, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    }, true);

    return {
        onRequest: actionTypes.FETCH_LOGIN_REQUEST_TRIGGERED,
        onSuccess: handleLoginResponse,
        onFailure: actionTypes.FETCH_LOGIN_REQUEST_FAILURE,
        promise,
    };
}

export function createUser(username, password, firstName, lastName) {
    const promise = fetch(appConfig.USER_SIGNUP_PATH, {
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
        onSuccess: handleNewUserResponse,
        onFailure: actionTypes.CREATE_USER_REQUEST_FAILURE,
        promise,
    };
}

export function fetchUsersInfo() {
    const promise = fetch(appConfig.USER_INFO_PATH);

    return {
        onRequest: actionTypes.FETCH_USER_INFO_TRIGGERED,
        onSuccess: actionTypes.FETCH_USER_INFO_SUCCESS,
        onFailure: actionTypes.FETCH_USER_INFO_FAILURE,
        promise,
    };
}

const handleLoginResponse = (response, dispatch) => {
    if (appConfig.ENV !== 'testing') {
        sessionStorage.removeItem(appConfig.TOKEN_CONTENT_KEY);
        sessionStorage.setItem(appConfig.TOKEN_CONTENT_KEY, response.token);

        sessionStorage.removeItem(appConfig.TOKEN_EXP);
        sessionStorage.setItem(appConfig.TOKEN_EXP, response.tokenExpiration);
    }

    dispatch({
        type: actionTypes.FETCH_LOGIN_REQUEST_SUCCESS,
        response
    });
};

const handleNewUserResponse = (response) => {
    fetchLogin(response.username, response.password);
};
