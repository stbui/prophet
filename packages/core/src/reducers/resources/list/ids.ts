/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import uniq from 'lodash/uniq';

import {
    CRUD_GET_LIST_SUCCESS,
    CRUD_CREATE_SUCCESS,
    DELETE,
} from '../../../actions';

/**
 * 数据字典，将id作为键值
 * @param previousState
 * @param param1
 */
const idsReducer: Reducer<any> = (
    previousState = [],
    { meta, type, payload }
) => {
    if (meta && meta.optimistic) {
        // 删除id
        if (meta.fetch === DELETE) {
            const index = previousState
                .map(el => el === payload.id)
                .indexOf(true);
            if (index === -1) {
                return previousState;
            }
            return [
                ...previousState.slice(0, index),
                ...previousState.slice(index + 1),
            ];
        }
    }

    switch (type) {
        case CRUD_GET_LIST_SUCCESS:
            return payload.data.map(({ id }) => id);
        case CRUD_CREATE_SUCCESS:
            return uniq([payload.data.id, ...previousState]);
        default:
            return previousState;
    }
};

export default idsReducer;

export const getIds = state => state;
