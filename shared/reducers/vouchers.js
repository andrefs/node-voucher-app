import Immutable from 'immutable';
import {
    VOUCHERS_FETCH_REQUEST,
    VOUCHERS_FETCH_SUCCESS,
    VOUCHERS_FETCH_FAILURE
} from '../constants';

const initialState = new Immutable.List();

export default function messages(state = initialState, action) {
    switch (action.type) {
    case VOUCHERS_FETCH_SUCCESS:
        return Immutable.fromJS(action.payload);

    default:
        return state;
    }
}


