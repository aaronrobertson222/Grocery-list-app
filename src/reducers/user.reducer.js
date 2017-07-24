import * as actionTypes from 'actions/actionTypes';

const initialState = {
    user: null,
    error: null,
};

export default function user(state = initialState, action) {
    switch (action.type) {
    case actionTypes.FETCH_LOGIN_REQUEST_SUCCESS: {
        return {
            ...state,
            user: action.response.user,
        };
    }
    case actionTypes.FETCH_LOGIN_REQUEST_FAILURE: {
        return {
            ...state,
            error: action.response.message,
        };
    }
    case actionTypes.CREATE_USER_REQUEST_SUCCESS: {
        return {
            ...state,
            user: action.response.user,
        };
    }
    case actionTypes.CREATE_USER_REQUEST_FAILURE: {
        return {
            ...state,
            error: action.response.message,
        };
    }
    case actionTypes.FETCH_USER_INFO_SUCCESS: {
        return {
            ...state,
            user: action.response.user,
        };
    }
    case actionTypes.CLEAR_CURRENT_USER: {
        return {
            ...state,
            user: initialState.user,
        };
    }
    default: {
        return state;
    }
    }
}
