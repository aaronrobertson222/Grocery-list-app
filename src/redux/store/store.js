import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import mainReducer from '../../reducers/index.reducer';

const finalCreateStore = composeWithDevTools(
    applyMiddleware(
        thunk,
        promiseMiddleware
    )
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(mainReducer, initialState);
    return store;
}
