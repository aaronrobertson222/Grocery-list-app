import * as actionTypes from './actionTypes';
import fetch from 'httpService';
import appConfig from '../config/appConfig';

export function createList() {
    const promise = fetch(appConfig.NEW_LIST_PATH, {
        method: 'POST',
        body: JSON.stringify({
          
        })
    });

    return {
        onRequest: actionTypes.CREATE_LIST_TRIGGERED,
        onSuccess: actionTypes.CREATE_LIST_SUCCESS,
        onFailure: actionTypes.CREATE_LIST_FAILURE,
        promise,
    };
}
