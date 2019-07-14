/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import resources, { getResources as GetResources } from './resources';
import saving from './saving';
import loading from './loading';
import notifications from './notifications';
import refresh from './refresh';
import auth from './auth';

export const getResources = state => GetResources(state.resources);
export default history =>
    combineReducers({
        resources,
        saving,
        loading,
        notifications,
        refresh,
        auth,
        router: connectRouter(history),
    });
