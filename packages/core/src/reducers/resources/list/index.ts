import { combineReducers } from 'redux';

import total from './total';
import params from './params';
import ids from './ids';

export default combineReducers({ ids, params, total });
