import Immutable from 'immutable';
import {
    LOAD_CONFIG
} from '../constants';

const initialState = new Immutable.Map();

export default function messages(state = initialState, action) {
    switch (action.type) {
    case LOAD_CONFIG:
        return Immutable.fromJS(action.payload);

    default:
        return state;
    }
}


