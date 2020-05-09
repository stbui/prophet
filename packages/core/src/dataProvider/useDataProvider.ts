/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext, useCallback } from 'react';
import { useDispatch, useStore } from 'react-redux';

import DataProviderContext from './DataProviderContext';
import { FETCH_START, FETCH_END, FETCH_ERROR } from '../actions';
import { canReplyWithCache, answerWithCache } from './replyWithCache';

const performQuery = ({
    type,
    dataProvider,
    resource,
    payload,
    action,
    onSuccess,
    onFailure,
    dispatch,
    rest,
}) => {
    dispatch({
        type: action,
        payload,
        meta: { resource, ...rest },
    });

    dispatch({
        type: `${action}_LOADING`,
        payload,
        meta: { resource, ...rest },
    });

    dispatch({
        type: FETCH_START,
    });

    return dataProvider(type, resource, payload)
        .then(response => {
            dispatch({
                type: `${action}_SUCCESS`,
                payload: response,
                requestPayload: payload,
                meta: {
                    ...rest,
                    resource,
                    fetchResponse: type,
                    fetchStatus: FETCH_END,
                },
            });

            dispatch({
                type: FETCH_END,
            });

            onSuccess && onSuccess(response);
            return response;
        })
        .catch(error => {
            dispatch({
                type: `${action}_FAILURE`,
                error: error.message ? error.message : error,
                payload: error.body ? error.body : null,
                requestPayload: payload,
                meta: {
                    ...rest,
                    resource,
                    fetchResponse: type,
                    fetchStatus: FETCH_ERROR,
                },
            });
            dispatch({ type: FETCH_ERROR, error });

            onFailure && onFailure(error);

            throw error;
        });
};

const query = ({
    type,
    dataProvider,
    resource,
    payload,
    action,
    onSuccess,
    onFailure,
    dispatch,
    store,
    rest,
}) => {
    const resourceState = store.getState().resources[resource];

    if (canReplyWithCache(type, payload, resourceState)) {
        return answerWithCache({
            type,
            payload,
            resource,
            action,
            rest,
            onSuccess,
            resourceState,
            dispatch,
        });
    }

    return performQuery({
        type,
        dataProvider,
        resource,
        payload,
        action,
        onSuccess,
        onFailure,
        dispatch,
        rest,
    });
};

const defaultDataProvider = (type: string, resource: string, payload: any) =>
    Promise.resolve();

/**
 *
 *
 * @return
 *
 * @example
 *
 * import { useDataProvider } from '@stbui/prophet-core';
 *
 * const UserList = () => {
 *     const [user, setUser] = useState([]);
 *     const [loading, setLoading] = useState(true);
 *     const [error, setError] = useState();
 *     const dataProvider = useDataProvider();
 *
 *     useEffect(() => {
 *         dataProvider('GET_ONE', 'user', { filter: { id: 1 } })
 *             .then(({ data }) => {
 *                 setUser(data);
 *                 setLoading(false);
 *             })
 *             .catch(error => {
 *                 setError(error);
 *                 setLoading(false);
 *             });
 *     }, []);
 *
 *     if (loading) return loading;
 *     if (error) return error.message;
 *
 *     return (
 *         <React.Fragment>
 *             { user.name }
 *             { user.id }
 *         </React.Fragment>
 */
export const useDataProvider = () => {
    const dispatch = useDispatch();
    const dataProvider = useContext(DataProviderContext) || defaultDataProvider;

    const store = useStore();

    return useCallback(
        (type, resource, payload, options) => {
            const { action = 'CUSTOM_FETCH', onSuccess, onFailure, ...rest } =
                options || {};

            const params = {
                type,
                dataProvider,
                resource,
                payload,
                action,
                onSuccess,
                onFailure,
                dispatch,
                store,
                rest,
            };

            return query(params);
        },
        [dataProvider, dispatch]
    );
};

export default useDataProvider;
