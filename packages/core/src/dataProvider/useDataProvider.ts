/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DataProviderContext from './dataProviderContext';
import { FETCH_START, FETCH_END, FETCH_ERROR } from '../actions';

/* 
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDataProvider, showNotification } from 'prophet-core';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const dataProvider = useDataProvider();

    useEffect(() => {
        dataProvider('GET_LIST', 'posts', { filter: { status: 1 } })
            .then(({ data }) => setUsers(data))
            .catch(error => dispatch(showNotification('error', error.message)));
    }, []);

    return (
        <React.Fragment>
            {users.map((user, key) => (
                <UserDetail user={user} key={key} />
            ))}
        </React.Fragment>
    );
};
 */

const defaultDataProvider = (type, resource, payload) => Promise.resolve();

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
            } = options;

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

                    throw new Error(error.message ? error.message : error);
                });
        },
        [dataProvider, dispatch]
    );
};

export default useDataProvider;
