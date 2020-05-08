/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import uniq from 'lodash/uniq';

import { CRUD_GET_LIST_SUCCESS, CRUD_CREATE_SUCCESS } from '../../../actions';

/**
 * id列表
 * @param previousState
 * @param param1
 */
const idsReducer: Reducer<any> = (
    previousState = [],
    { meta, type, payload }
) => {
    if (meta) {
        // 删除id
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
