/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import {
    CRUD_GET_LIST_SUCCESS,
    CRUD_GET_ONE_SUCCESS,
} from '../../../actions/dataActions';

export default (previousState = 0, { type, payload }) => {
    switch (type) {
        case CRUD_GET_LIST_SUCCESS:
            return payload.total;
        case CRUD_GET_ONE_SUCCESS:
            return previousState === 0 ? 1 : previousState;

        default:
            return previousState;
    }
};
