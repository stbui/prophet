import { combineReducers } from 'redux';

import total from './total';
import params from './params';

export default combineReducers({ params, total });
