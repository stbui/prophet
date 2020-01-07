/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DataProviderContext from './DataProviderContext';
import { FETCH_START, FETCH_END, FETCH_ERROR } from '../actions';

/* 
import React, { useState } from 'react';
import { useDataProvider } from '@stbui/prophet-core';

const UserList = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const dataProvider = useDataProvider();

    useEffect(() => {
        dataProvider('GET_ONE', 'user', { filter: { id: 1 } })
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return 'loading';
    if (error) return error.message;
    if (!user) return null;

    return (
        <React.Fragment>
            { user.name }
            { user.id }
        </React.Fragment>
    );
};
 */

const defaultDataProvider = (type: string, resource: string, payload: any) =>
    Promise.resolve();

export const useDataProvider = () => {
    const dispatch = useDispatch();
    const dataProvider = useContext(DataProviderContext) || defaultDataProvider;

    return useCallback(
        (type, resource, payload, options) => {
            const {
                action = 'CUSTOM_FETCH',
                onSuccess,
                onFailure,
                ...other
            } = options || {};

            dispatch({
                type: action,
                payload,
                meta: { resource, ...other },
            });

            dispatch({
                type: `${action}_LOADING`,
                payload,
                meta: { resource, ...other },
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
                            ...other,
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
                            ...other,
                            resource,
                            fetchResponse: type,
                            fetchStatus: FETCH_ERROR,
                        },
                    });
                    dispatch({ type: FETCH_ERROR, error });

                    onFailure && onFailure(error);

                    throw error;
                });
        },
        [dataProvider, dispatch]
    );
};

export default useDataProvider;
