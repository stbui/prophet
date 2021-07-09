/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import { CRUD_GET_LIST_SUCCESS, DELETE } from '../../../actions';

const totalReducer: Reducer<any> = (
    previousState = 0,
    { meta, type, payload }
) => {
    if (meta && meta.optimistic) {
        if (meta.fetch === DELETE) {
            return previousState === null ? null : previousState - 1;
        }
    }

    switch (type) {
        case CRUD_GET_LIST_SUCCESS:
            return payload.total;

        default:
            return previousState;
    }
};

export default totalReducer;
