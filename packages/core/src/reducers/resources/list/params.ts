/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import { CRUD_CHANGE_LIST_PARAMS } from '../../../actions/listActions';

const initialState = {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {},
};

const paramsReducer: Reducer<any> = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case CRUD_CHANGE_LIST_PARAMS:
            return payload;
        default:
            return previousState;
    }
};

export default paramsReducer