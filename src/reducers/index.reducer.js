import { combineReducers } from 'redux';
import user from './user.reducer';
import modal from './modal.reducer';
import { reducer as reduxFormReducer } from 'redux-form';

const mainReducer = combineReducers({
    user,
    modal,
    form: reduxFormReducer
});

export default mainReducer;
