import React   from 'react';
import {Route, IndexRoute} from 'react-router';
import App     from './containers/App';
import Start   from './components/Start';
import ProductsListContainer from './containers/ProductsListContainer';
import ProductContainer      from './containers/ProductContainer';
import CampaignsListContainer from './containers/CampaignsListContainer';
import VouchersListContainer from './containers/VouchersListContainer';

export default function routes(store) {

    const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState);

    return (
        <Route path='/' component={App} >
            <IndexRoute component={Start} />
            <Route path='/products'  component={ProductsListContainer}  />
            <Route path='/buy/:id'   component={ProductContainer}       />
            <Route path='/campaigns' component={CampaignsListContainer} />
            <Route path='/vouchers'  component={VouchersListContainer}  />
        </Route>
    );
};

