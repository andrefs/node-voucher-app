import Immutable from 'immutable';
import {
    VOUCHER_FETCH_REQUEST,
    VOUCHER_FETCH_SUCCESS,
    VOUCHER_FETCH_FAILURE,
    VOUCHER_USE_REQUEST,
    VOUCHER_USE_SUCCESS,
    VOUCHER_USE_FAILURE
} from '../constants';

const initialState = new Immutable.Map();

export default function voucher(state = initialState, action) {
    switch (action.type) {
    case VOUCHER_FETCH_SUCCESS:
        return Immutable.fromJS(action.payload);
    case VOUCHER_USE_SUCCESS:
        return Immutable.fromJS(action.payload);

    default:
        return state;
    }
}


