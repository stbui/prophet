/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions';

const notificationReducer: Reducer<any> = (previousState = [], { type, payload }) => {
    switch (type) {
        case SHOW_NOTIFICATION:
            return previousState.concat(payload);
        case HIDE_NOTIFICATION:
            return previousState.slice(1);
        default:
            return previousState;
    }
};

export default notificationReducer;
