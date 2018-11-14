import { combineReducers } from 'redux';
import resources, { getResources as GetResources } from './resources';

export const getResources = state => GetResources(state.resources);
export default combineReducers({ resources });
