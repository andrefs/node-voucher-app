import {createStore, compose, applyMiddleware} from 'redux';
import createLogger       from 'redux-logger';
import {routerMiddleware} from 'react-router-redux'
import routerReducer      from '../reducers/routerReducer';
import Immutable          from 'immutable';
import {combineReducers}  from 'redux-immutable';

const defaultInitialState = new Immutable.Map();

export default function configStore(history, initialState = defaultInitialState){
    const reducer = combineReducers({
        routing : routerReducer
    });

    let middlewares = [
        routerMiddleware(history)
    ];

    if(process.env.NODE_ENV === 'development'){
        let logger = createLogger({
            //actionTransformer: state => JSON.stringify(state, null, 4),
            stateTransformer:  state => JSON.stringify(state.toJS(), null, 4)
        });
        middlewares.push(logger);
    }

    const store = createStore(
        reducer,
        initialState,
        compose(applyMiddleware(...middlewares))
    )

    return store;
}
