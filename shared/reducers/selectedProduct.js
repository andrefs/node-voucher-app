import Immutable from 'immutable';
import {
    SET_SELECTED_PRODUCT,
} from '../constants';

const initialState = new Immutable.Map();

export default function messages(state = initialState, action) {
    switch (action.type) {
    case SET_SELECTED_PRODUCT:
        return state.merge(action.payload);

    default:
        return state;
    }
}


