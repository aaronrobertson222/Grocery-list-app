import { combineReducers } from 'redux';
import user from './user.reducer';
import { reducer as reduxFormReducer } from 'redux-form';

const mainReducer = combineReducers({
    user,
    form: reduxFormReducer
});

export default mainReducer;
