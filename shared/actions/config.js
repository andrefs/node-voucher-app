import {createAction } from 'redux-actions';
import {
  LOAD_CONFIG,
} from '../constants';

const loadConfig = createAction(LOAD_CONFIG);

export {loadConfig};

