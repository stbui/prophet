/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import { GET_LIST } from '../../../../actions';

const totalReducer: Reducer<any> = (
    previousState = null,
    { meta, payload }
) => {
    switch (meta.fetchResponse) {
        case GET_LIST:
            return payload.total;
        default:
            return previousState;
    }
};

export default totalReducer;
