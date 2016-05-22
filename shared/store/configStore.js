import {createStore, compose, applyMiddleware} from 'redux';
import createLogger       from 'redux-logger';
import {routerMiddleware} from 'react-router-redux'
import routerReducer      from '../reducers/routerReducer';
import Immutable          from 'immutable';
import thunk from 'redux-thunk';

import {combineReducers} from 'redux-immutable';
import products          from '../reducers/products';
import selectedProduct   from '../reducers/selectedProduct';

const defaultInitialState = new Immutable.Map();

export default function configStore(history, initialState = defaultInitialState){
    const reducer = combineReducers({
        routing : routerReducer,
        products,
        selectedProduct
    });

    let logger = createLogger({
        //actionTransformer: state => JSON.stringify(state, null, 4),
        stateTransformer:  state => JSON.stringify(state.toJS(), null, 4)
    });

    let middlewares = [
        thunk,
        routerMiddleware(history),
        logger
    ];

    const store = createStore(
        reducer,
        initialState,
        compose(applyMiddleware(...middlewares))
    )

    return store;
}
