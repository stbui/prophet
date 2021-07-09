/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import { CRUD_CHANGE_LIST_PARAMS } from '../../../actions/listActions';

export interface ParamsState {
    sort: string;
    order: string;
    page: number;
    perPage: number;
    filter: any;
}

const initialState = {
    sort: 'DESC',
    order: 'id',
    page: 1,
    perPage: 10,
    filter: {},
};

const paramsReducer: Reducer<ParamsState> = (
    previousState = initialState,
    { type, payload }
) => {
    switch (type) {
        case CRUD_CHANGE_LIST_PARAMS:
            return payload;
        default:
            return previousState;
    }
};

export default paramsReducer;
