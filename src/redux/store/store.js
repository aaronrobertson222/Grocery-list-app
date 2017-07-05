import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';

import mainReducer from '../../reducers/index.reducer';

const finalCreateStore = compose(
    applyMiddleware(
        thunk,
        promiseMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(mainReducer, initialState);
    return store;
}
