/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import {
    CRUD_CREATE,
    CRUD_UPDATE,
    CRUD_CREATE_SUCCESS,
    CRUD_CREATE_FAILURE,
    CRUD_UPDATE_SUCCESS,
    CRUD_UPDATE_FAILURE,
} from '../actions';

export const saving = (previousState = false, { type, meta }) => {
    switch (type) {
        // case CRUD_CREATE:
        // case CRUD_UPDATE:
        //     return { redirect: meta.onSuccess && meta.onSuccess.redirectTo };

        case CRUD_CREATE_SUCCESS:
        case CRUD_CREATE_FAILURE:
        case CRUD_UPDATE_SUCCESS:
        case CRUD_UPDATE_FAILURE:
            return false;
        default:
            return previousState;
    }
};

export default saving;
