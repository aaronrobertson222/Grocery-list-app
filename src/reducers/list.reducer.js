import * as actionTypes from 'action/actionTypes';

const initialState = {
    lists: [],
};

export default function list(state = initialState, action) {
    switch (action.type) {
    case actionTypes.CREATE_LIST_SUCCESS: {
        const newLists = state.projects.slice();
        newLists.unshift(action.response);
        return {
            ...state,
            lists: newLists,

        };
    }
    }
}
