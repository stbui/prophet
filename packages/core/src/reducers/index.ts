import { combineReducers } from 'redux';
import resources, { getResources as GetResources } from './resources';
import saving from './saving';

export const getResources = state => GetResources(state.resources);
export default combineReducers({ resources, saving });
