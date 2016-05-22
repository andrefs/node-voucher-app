import {createAction } from 'redux-actions';

import {
    SET_SELECTED_PRODUCT
} from '../constants';

const setSelectedProduct = createAction(SET_SELECTED_PRODUCT);
export {setSelectedProduct};
