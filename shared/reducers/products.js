import Immutable from 'immutable';
import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAILURE
} from '../constants';

const initialState = new Immutable.List();

export default function messages(state = initialState, action) {
    switch (action.type) {
    case PRODUCTS_FETCH_SUCCESS:
        return state.merge(action.payload);

    default:
        return state;
    }
}


