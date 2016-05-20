import React   from 'react';
import {Route} from 'react-router';
import App     from './containers/App';

export default function routes(store) {

    const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

    return (
        <Route path='/' component={App} />
    );
};

