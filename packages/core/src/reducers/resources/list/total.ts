/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import {
    CRUD_GET_LIST_SUCCESS,
    CRUD_GET_ONE_SUCCESS,
} from '../../../actions/dataActions';

const totalReducer: Reducer<any> = (
    previousState = 0,
    { meta, type, payload }
) => {
    if (meta) {
    }

    switch (type) {
        case CRUD_GET_LIST_SUCCESS:
            return payload.total;

        default:
            return previousState;
    }
};

export default totalReducer;
