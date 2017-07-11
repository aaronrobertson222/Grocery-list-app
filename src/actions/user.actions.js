import * as actionTypes from './actionTypes';
import fetch from 'httpService';
import appConfig from '../config/appConfig';
//import history from '../history';

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
        onFailure: handleLoginError,
        promise,
    };
}

export function createUser(username, password, firstName, lastName) {
    const promise = fetch(appConfig.USER_SIGNUP_PATH, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
    }, true);

    return {
        onRequest: actionTypes.CREATE_USER_REQUEST_TRIGGERED,
        onSuccess: handleCreateUserResponse,
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

export function clearCurrentUser() {

    sessionStorage.removeItem(appConfig.TOKEN_CONTENT_KEY);
    sessionStorage.removeItem(appConfig.TOKEN_EXP);

    return {
        type: actionTypes.CLEAR_CURRENT_USER,
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

const handleCreateUserResponse = (response, dispatch) => {

    if (appConfig.ENV !== 'testing') {
        sessionStorage.removeItem(appConfig.TOKEN_CONTENT_KEY);
        sessionStorage.setItem(appConfig.TOKEN_CONTENT_KEY, response.token);

        sessionStorage.removeItem(appConfig.TOKEN_EXP);
        sessionStorage.setItem(appConfig.TOKEN_EXP, response.tokenExpiration);
    }

    dispatch({
        type: actionTypes.CREATE_USER_REQUEST_SUCCESS,
        response
    });

};

const handleLoginError = (response, dispatch) => {
    dispatch({
        type: actionTypes.FETCH_LOGIN_REQUEST_FAILURE,
        response
    });
};
