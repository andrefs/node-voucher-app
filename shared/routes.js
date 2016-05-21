import React   from 'react';
import {Route, IndexRoute} from 'react-router';
import App     from './containers/App';
import Start   from './components/Start';
import ProductsListContainer from './containers/ProductsListContainer';

export default function routes(store) {

    const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

    return (
        <Route path='/' component={App} >
            <IndexRoute component={Start} />
            <Route path='/products'  component={ProductsListContainer}  />
        </Route>
    );
};

