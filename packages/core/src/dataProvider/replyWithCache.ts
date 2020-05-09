import get from 'lodash/get';
import { GET_LIST, GET_ONE, FETCH_END } from '../actions';

/**
 *
 * @param type
 * @param payload
 * @param resourceState
 * @return {boolean}
 */
export const canReplyWithCache = (
    type: string,
    payload: any,
    resourceState: any
): boolean => {
    const now = new Date();

    switch (type) {
        case GET_LIST:
            return (
                get(resourceState, [
                    'list',
                    'cachedRequests',
                    JSON.stringify(payload),
                    'validity',
                ]) > now
            );
        case GET_ONE:
            return (
                resourceState &&
                resourceState.validity &&
                resourceState.validity[payload.id] > now
            );
        default:
            return false;
    }
};

/**
 *
 * @param type
 * @param payload
 * @param resourceState
 */
export const getResultFromCache = (
    type: string,
    payload: any,
    resourceState: any
) => {
    switch (type) {
        case GET_LIST:
            const data = resourceState.data;
            const requestSignature = JSON.stringify(payload);
            const cachedRequests =
                resourceState.list.cachedRequests[requestSignature];

            return {
                data: cachedRequests.ids.map(id => data[id]),
                total: cachedRequests.total,
            };
        case GET_ONE:
            return { data: resourceState.data[payload.id] };

        default:
            throw new Error('getResultFromCache error');
    }
};

/**
 *
 * @param param0
 */
export const answerWithCache = ({
    type,
    payload,
    resource,
    action,
    rest,
    onSuccess,
    resourceState,
    dispatch,
}) => {
    dispatch({
        type: action,
        payload,
        meta: { resource, ...rest },
    });

    const response = getResultFromCache(type, payload, resourceState);

    dispatch({
        type: `${action}_SUCCESS`,
        payload: response,
        requestPayload: payload,
        meta: {
            ...rest,
            resource,
            fetchResponse: type,
            fetchStatus: FETCH_END,
            fromCache: true,
        },
    });
    onSuccess && onSuccess(response);

    return Promise.resolve(response);
};
