import * as actionTypes from './actionTypes';

export function showModal() {
    return {
        type: actionTypes.SHOW_MODAL
    };
}

export function hideModal() {
    return {
        type: actionTypes.HIDE_MODAL
    };
}
