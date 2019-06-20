/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { combineReducers } from 'redux';
import resources, { getResources as GetResources } from './resources';
import saving from './saving';
import loading from './loading';
import notifications from './notifications';
import refresh from './refresh';

export const getResources = state => GetResources(state.resources);
export default combineReducers({
  resources,
  saving,
  loading,
  notifications,
  refresh
});
