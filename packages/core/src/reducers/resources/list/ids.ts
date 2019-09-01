/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import {
    CRUD_GET_LIST_SUCCESS,
    CRUD_GET_ONE_SUCCESS,
    CRUD_CREATE_SUCCESS,
    CRUD_UPDATE_SUCCESS,
} from '../../../actions';

export const ids = (previousState = [], { type, payload }) => {
    switch (type) {
        case CRUD_GET_LIST_SUCCESS:
            return payload.data.map(({ id }) => id);
        case CRUD_GET_ONE_SUCCESS:
        case CRUD_CREATE_SUCCESS:
        case CRUD_UPDATE_SUCCESS:
            return [payload.data.id];
        default:
            return previousState;
    }
};

export default ids;
