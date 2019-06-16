import { combineReducers } from 'redux';
import resources, { getResources as GetResources } from './resources';
import saving from './saving';
import loading from './loading';
import notifications from './notifications';

export const getResources = state => GetResources(state.resources);
export default combineReducers({
  resources,
  saving,
  loading,
  notifications
});
