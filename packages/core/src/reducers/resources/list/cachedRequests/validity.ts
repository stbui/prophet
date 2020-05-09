import { Reducer } from 'redux';
import { GET_LIST } from '../../../../actions';

const validityReducer: Reducer<any> = (
    previousState = null,
    { meta, type, payload }
) => {
    switch (meta.fetchResponse) {
        case GET_LIST:
            return payload.validUntil ? payload.validUntil : null;
        default:
            return previousState;
    }
};

export default validityReducer;
