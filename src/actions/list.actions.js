import * as actionTypes from './actionTypes';
import fetch from 'httpService';
import appConfig from '../config/appConfig';

export function createList(listName, items, listUsers) {
    const promise = fetch(appConfig.NEW_LIST_PATH, {
        method: 'POST',
        body: JSON.stringify({
            listName,
            items,
            listUsers,
        })
    });

    return {
        onRequest: actionTypes.CREATE_LIST_TRIGGERED,
        onSuccess: actionTypes.CREATE_LIST_SUCCESS,
        onFailure: actionTypes.CREATE_LIST_FAILURE,
        promise,
    };
}

export function fetchLists() {
    const promise = fetch(appConfig.USERS_LISTS_PATH);

    return {
        onRequest: actionTypes.FETCH_USERS_LISTS_TRIGGERED,
        onSuccess: actionTypes.FETCH_USERS_LISTS_SUCCESS,
        onFailure: actionTypes.FETCH_USERS_LISTS_FAILURE,
        promise,
    };
}

export function fetchSharedLists() {
    const promise = fetch(appConfig.USERS_SHARED_LISTS_PATH);

    return {
        onRequest: actionTypes.FETCH_USERS_SHARED_LISTS_TRIGGERED,
        onSuccess: actionTypes.FETCH_USERS_SHARED_LISTS_SUCCESS,
        onFailure: actionTypes.FETCH_USERS_SHARED_LISTS_FAILURE,
        promise,
    };
}

export function fetchListById(id) {
    const promise = fetch(`${appConfig.LIST_ID_PATH}${id}`, {
        method: 'POST',
        body: JSON.stringify({
            id: id
        })
    });

    return {
        onRequest: actionTypes.FETCH_LIST_BY_ID_TRIGGERED,
        onSuccess: actionTypes.FETCH_LIST_BY_ID_SUCCESS,
        onFailure: actionTypes.FETCH_LIST_BY_ID_FAILURE,
        promise,
    };
}

export function clearCurrentList() {
    return {
        type: actionTypes.CLEAR_CURRENT_LIST,
    };
}

export function deleteList(id) {
    const promise = fetch(`${appConfig.LIST_ID_PATH}${id}`, {
        method: 'DELETE'
    });

    return {
        onRequest: actionTypes.DELETE_LIST_TRIGGERED,
        onSuccess: handleListDelete,
        onFailure: actionTypes.DELETE_LIST_FAILURE,
        promise,
    };
}

const handleListDelete = (response, dispatch) => {
    

    dispatch({
        type: actionTypes.DELETE_LIST_SUCCESS,
        response
    });
};
