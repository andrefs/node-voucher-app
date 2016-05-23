import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAILURE
} from '../constants';

const fetchProducts = function(baseURL, token){
    return (dispatch) => {
        dispatch(productsRequest());

        return fetch(baseURL+'/api/products/', token)
        .then(response => response.json())
        .then(products => {
            dispatch(productsSuccess(products));
        })
        .catch(error => {throw error});
    };
};

const productsSuccess = createAction(PRODUCTS_FETCH_SUCCESS);
const productsRequest = createAction(PRODUCTS_FETCH_REQUEST);

export {fetchProducts};
