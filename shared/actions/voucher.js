import '../utils/fetch';
import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    VOUCHER_FETCH_REQUEST,
    VOUCHER_FETCH_SUCCESS,
    VOUCHER_FETCH_FAILURE,

    VOUCHER_USE_REQUEST,
    VOUCHER_USE_SUCCESS,
    VOUCHER_USE_FAILURE
} from '../constants';


const fetchVoucher = function(code) {
    return (dispatch) => {
        dispatch(voucherFetchRequest());

        return fetch(`http://localhost:9667/api/vouchers/${code}`)
        .then(response => response.json())
        .then(voucher => {
            dispatch(voucherFetchSuccess(voucher));
        })
        .catch(error => {throw error});
    };
};

const voucherFetchSuccess = createAction(VOUCHER_USE_SUCCESS);
const voucherFetchRequest = createAction(VOUCHER_USE_REQUEST);

const useVoucher = function(code) {
    return (dispatch) => {
        dispatch(voucherUseRequest());
        const opts = {
            method:'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: 'use'})
        };

        return fetch(`http://localhost:9667/api/vouchers/${code}`, null, opts)
        .then(response => {
            if(response.status === 204){
                return {ok: true, message: 'Voucher used successfully'};
            }
            return response.json();
         })
        .then(voucher => {
            dispatch(voucherUseSuccess(voucher));
        })
        .catch(error => {throw error});
    };
};

const voucherUseSuccess = createAction(VOUCHER_USE_SUCCESS);
const voucherUseRequest = createAction(VOUCHER_USE_REQUEST);

export {fetchVoucher, useVoucher};
