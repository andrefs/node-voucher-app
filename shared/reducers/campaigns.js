import Immutable from 'immutable';
import {
    CAMPAIGNS_FETCH_REQUEST,
    CAMPAIGNS_FETCH_SUCCESS,
    CAMPAIGNS_FETCH_FAILURE
} from '../constants';

const initialState = new Immutable.List();

export default function messages(state = initialState, action) {
    switch (action.type) {
    case CAMPAIGNS_FETCH_SUCCESS:
        return Immutable.fromJS(action.payload);

    default:
        return state;
    }
}


