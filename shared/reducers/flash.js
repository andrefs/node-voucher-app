import Immutable from 'immutable';
import {
    FLASH_SHOW_ERROR,
    FLASH_SHOW_SUCCESS,
    FLASH_SHOW_INFO,
    FLASH_SHOW_WARNING,
    FLASH_DISMISS
} from '../constants';

const initialState = new Immutable.fromJS({
    success : null,
    error   : null,
    warning : null,
    info    : null
});

export default function messages(state = initialState, action) {
    switch (action.type) {
    case FLASH_SHOW_ERROR:
        return state.merge({error: action.payload});

    case FLASH_SHOW_SUCCESS:
        return state.merge({success: action.payload});

    case FLASH_SHOW_INFO:
        return state.merge({info: action.payload});

    case FLASH_SHOW_WARNING:
        return state.merge({warning: action.payload});

    case FLASH_DISMISS:
        return Immutable.fromJS({...initialState.toJS()});

    default:
        return state;
    }
}


