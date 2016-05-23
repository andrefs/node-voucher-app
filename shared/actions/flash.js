import {createAction } from 'redux-actions';
import {push} from 'react-router-redux';

import {
    FLASH_SHOW_ERROR,
    FLASH_SHOW_SUCCESS,
    FLASH_SHOW_INFO,
    FLASH_SHOW_WARNING,
    FLASH_DISMISS
} from '../constants';

const showFlash = function(type, flash) {
    return (dispatch) => {
        switch(type){
            case 'error':
                dispatch(flashShowError(flash));
                break;

            case 'warning':
                dispatch(flashShowWarning(flash));
                break;

            case 'success':
                dispatch(flashShowSuccess(flash));
                break;

            case 'info':
                dispatch(flashShowInfo(flash));
                break;

        };

        setTimeout(function(){
            dispatch(flashDismiss());
        }, 5*1000);
    };
};

const flashDismiss     = createAction(FLASH_DISMISS);
const flashShowError   = createAction(FLASH_SHOW_ERROR);
const flashShowSuccess = createAction(FLASH_SHOW_SUCCESS);
const flashShowWarning = createAction(FLASH_SHOW_WARNING);
const flashShowInfo    = createAction(FLASH_SHOW_INFO);

export {showFlash};
