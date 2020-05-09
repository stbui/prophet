import { Reducer } from 'redux';
import {
    GET_LIST,
    UPDATE,
    CREATE,
    GET_ONE,
    DELETE,
    REFRESH_VIEW,
    FETCH_END,
} from '../../actions';

const addIds = (
    ids: any[] = [],
    validUntil: Date,
    oldValidityRegistry: any
): any => {
    const validityRegistry = { ...oldValidityRegistry };
    ids.forEach(id => {
        validityRegistry[id] = validUntil;
    });
    return validityRegistry;
};

const removeIds = (ids: any[] = [], oldValidityRegistry: any): any => {
    const validityRegistry = { ...oldValidityRegistry };
    ids.forEach(id => {
        delete validityRegistry[id];
    });
    return validityRegistry;
};

const validityReducer: Reducer<any> = (
    previousState = {},
    { meta, type, payload, requestPayload }
) => {
    if (type === REFRESH_VIEW) {
        return {};
    }

    if (
        !meta ||
        !meta.fetchResponse ||
        meta.fetchStatus !== FETCH_END ||
        meta.fromCache === true
    ) {
        return previousState;
    }

    if (payload.validUntil) {
        switch (meta.fetchResponse) {
            case GET_LIST:
                return addIds(
                    payload.data.map(record => record.id),
                    payload.validUntil,
                    previousState
                );
            case UPDATE:
            case CREATE:
            case GET_ONE:
                return addIds(
                    [payload.data.id],
                    payload.validUntil,
                    previousState
                );
            case DELETE:
                throw new Error(
                    'DELETE: should not contain a validUntil param'
                );
            default:
                return previousState;
        }
    } else {
        switch (meta.fetchResponse) {
            case GET_LIST:
                return removeIds(
                    payload.data.map(record => record.id),
                    previousState
                );
            case UPDATE:
            case CREATE:
            case GET_ONE:
                return removeIds([payload.data.id], previousState);
            case DELETE:
                return removeIds([requestPayload.id], previousState);
            default:
                return previousState;
        }
    }
};

export default validityReducer;
