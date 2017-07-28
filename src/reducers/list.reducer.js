import * as actionTypes from 'actions/actionTypes';

const initialState = {
    lists: [],
    sharedLists: [],
    currentList: null,
    listError: null,
};

export default function list(state = initialState, action) {
    switch (action.type) {
    case actionTypes.CREATE_LIST_SUCCESS: {
        const newLists = state.lists.slice();
        newLists.unshift(action.response);
        return {
            ...state,
            lists: newLists,

        };
    }
    case actionTypes.FETCH_USERS_LISTS_SUCCESS: {
        return {
            ...state,
            lists: action.response.lists,
        };
    }
    case actionTypes.FETCH_USERS_SHARED_LISTS_SUCCESS: {
        return {
            ...state,
            sharedLists: action.response.lists,
        };
    }
    case actionTypes.FETCH_LIST_BY_ID_SUCCESS: {
        return {
            ...state,
            currentList: action.response.list,
        };
    }
    case actionTypes.CLEAR_CURRENT_LIST: {
        return {
            ...state,
            currentList: initialState.currentList,
        };
    }
    case actionTypes.UPDATE_LIST_SUCCESS: {
        return {
            ...state,
            currentList: action.response.list,
        };
    }
    case actionTypes.CLEAR_ALL_CURRENT_LISTS: {
        return {
            ...state,
            sharedLists: initialState.sharedLists,
            lists: initialState.lists,
        };
    }
    case actionTypes.CREATE_LIST_FAILURE: {
        return {
            ...state,
            listError: action.response.message,
        };
    }
    case actionTypes.UPDATE_LIST_FAILURE: {
        return {
            ...state,
            listError: action.response.message,
        };
    }
    case actionTypes.CLEAR_LIST_ERROR: {
        return {
            ...state,
            listError: initialState.listError,
        };
    }
    default: {
        return state;
    }
    }
}
