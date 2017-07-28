import * as actionTypes from './actionTypes';
import fetch from 'httpService';
import appConfig from '../config/appConfig';
import history from '../history';

const handleListCreation = (response, dispatch) => {
    history.push(`/app/list/${response.list.id}`);

    dispatch({
        type: actionTypes.CREATE_LIST_SUCCESS,
        response
    });
};

const handleListError = (response, dispatch) => {
    dispatch({
        type: actionTypes.CREATE_LIST_FAILURE,
        response,
    });
};

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
        onSuccess: handleListCreation,
        onFailure: handleListError,
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
            id
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

export function clearAllCurrentLists() {
    return {
        type: actionTypes.CLEAR_ALL_CURRENT_LISTS,
    };
}

const handleListDelete = (response, dispatch) => {

    history.push('/app');

    dispatch({
        type: actionTypes.DELETE_LIST_SUCCESS,
        response
    });
};

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

export const handleUpdateListError = (response, dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_LIST_FAILURE,
        response,
    });
};

export function updateList(id, list) {
    const promise = fetch(`${appConfig.LIST_ID_PATH}${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            list,
        }),
    });

    return {
        onRequest: actionTypes.UPDATE_LIST_TRIGGERED,
        onSuccess: actionTypes.UPDATE_LIST_SUCCESS,
        onFailure: handleUpdateListError,
        promise,
    };
}

export function clearListError() {
    return {
        type: actionTypes.CLEAR_LIST_ERROR,
    };
}
