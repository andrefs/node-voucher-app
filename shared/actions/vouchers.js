import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    VOUCHERS_FETCH_REQUEST,
    VOUCHERS_FETCH_SUCCESS,
    VOUCHERS_FETCH_FAILURE
} from '../constants';

const fetchVouchers = function(baseURL, token){
    return (dispatch) => {
        dispatch(vouchersRequest());

        return fetch(baseURL+'/api/vouchers/', token)
        .then(response => response.json())
        .then(vouchers => {
            dispatch(vouchersSuccess(vouchers));
        })
        .catch(error => {throw error});
    };
};

const vouchersSuccess = createAction(VOUCHERS_FETCH_SUCCESS);
const vouchersRequest = createAction(VOUCHERS_FETCH_REQUEST);

export {fetchVouchers};
