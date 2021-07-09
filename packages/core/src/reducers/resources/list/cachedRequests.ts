/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { Reducer } from 'redux';
import {
    REFRESH_VIEW,
    FETCH_END,
    CREATE,
    DELETE,
    UPDATE,
    GET_LIST,
} from '../../../actions';
import ids from './cachedRequests/ids';
import total from './cachedRequests/total';
import validity from './cachedRequests/validity';

const cachedRequestsReducer: Reducer<any> = (
    previousState = {},
    { meta, type, payload, requestPayload }
) => {
    if (type === REFRESH_VIEW) {
        return {};
    }

    if (!meta || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }

    if (
        meta.fetchResponse === CREATE ||
        meta.fetchResponse === DELETE ||
        meta.fetchResponse === UPDATE
    ) {
        return {};
    }

    if (meta.fetchResponse !== GET_LIST || meta.fromCache) {
        return previousState;
    }

    const requestKey = JSON.stringify(requestPayload);
    const previousSubState = previousState[requestKey] || {
        ids: [],
        total: null,
        validity: null,
    };

    return {
        ...previousState,
        [requestKey]: {
            ids: ids(previousSubState.ids, { meta, type, payload }),
            total: total(previousSubState.total, { meta, type, payload }),
            validity: validity(previousSubState.validity, {
                meta,
                type,
                payload,
            }),
        },
    };
};

export default cachedRequestsReducer;
