import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isVisible: false
};

export default function modal(state = initialState, action) {
    switch(action.type) {
    case actionTypes.SHOW_MODAL: {
        return {
            ...state,
            isVisible: true
        };
    }

    case actionTypes.HIDE_MODAL: {
        return initialState;
    }
    default:
        return state;
    }
}
