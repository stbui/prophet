/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import { GET_LIST } from '../../../../actions';

const idsReducer: Reducer<any> = (previousState = [], { meta, payload }) => {
    switch (meta.fetchResponse) {
        case GET_LIST:
            return payload.data.map(({ id }) => id);
        default:
            return previousState;
    }
};

export default idsReducer;
