/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { REFRESH_VIEW } from '../actions';

export const refreshView = (previousState = 0, { type, payload }) => {
    switch (type) {
        case REFRESH_VIEW:
            return previousState + 1;
        default:
            return previousState;
    }
};

export default refreshView;
