import { Reducer } from 'redux';
import { GET_LIST } from '../../../../actions';

const totalReducer: Reducer<any> = (
    previousState = null,
    { meta, type, payload }
) => {
    switch (meta.fetchResponse) {
        case GET_LIST:
            return payload.total;
        default:
            return previousState;
    }
};

export default totalReducer;
