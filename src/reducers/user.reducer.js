import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: ''
};

export default function user(state = initialState, action) {
    switch (action.type) {
        // Fetch Basic Info about User
    case actionTypes.FETCH_LOGIN_REQUEST_SUCCESS: {
        return {
            ...state,
            username: action.response.username,
        };
    }
    case actionTypes.CREATE_USER_REQUEST_SUCCESS: {
        return {
            ...state,
            username: action.response.username,
            firstName: action.response.firstName,
            lastName: action.response.lastName,
        };
    }
    default: {
        return state;
    }
    }
}
