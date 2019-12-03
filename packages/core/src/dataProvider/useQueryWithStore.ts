/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDataProvider from './useDataProvider';
import { isEqual } from '../util';

/* 
import { useQueryWithStore } from '@stbui/prophet-core';

const UserProfile = record => {
    const { data, loading, error } = useQueryWithStore(
        {
            type: 'GET_ONE',
            resource: 'users',
            payload: { id: record.id },
        },
        {},
        state => state.resource.user.data[record.id]
    );

    if (loading) {
        return 'loading';
    }

    if (error) {
        return error.message;
    }

    return <div>{data.username}</div>;
};
 */

export interface Query {
    type: string;
    resource: string;
    payload: object;
}

export interface QueryOptions {
    meta?: any;
    action?: any;
}

const isEmptyList = data =>
    Array.isArray(data)
        ? data.length === 0
        : data &&
          Object.keys(data).length === 0 &&
          data.hasOwnProperty('fetchedAt');

const defaultDataSelector = query => (state: any) => {
    return undefined;
};

const defaultTotalSelector = () => null;

const useQueryWithStore = (
    query: Query,
    options: QueryOptions = { action: 'CUSTOM_QUERY' },
    dataSelector: (state: any) => any = defaultDataSelector(query),
    totalSelector?: (state: any) => number
) => {
    const { type, resource, payload } = query;
    const data = useSelector(dataSelector);
    const total = useSelector(totalSelector || defaultTotalSelector);

    const [state, setState]: any = useState({
        data,
        total,
        error: null,
        loading: true,
        loaded: data !== undefined && !isEmptyList(data),
    });

    if (!isEqual(state.data, data) || state.total !== total) {
        setState({
            ...state,
            data,
            total,
            loaded: true,
        });
    }

    const dataProvider = useDataProvider();
    useEffect(() => {
        setState(prevState => ({ ...prevState, loading: true }));

        dataProvider(type, resource, payload, options)
            .then(() => {
                setState(prevState => ({
                    ...prevState,
                    error: null,
                    loading: false,
                    loaded: true,
                }));
            })
            .catch(error => {
                setState({
                    error,
                    loading: false,
                    loaded: false,
                });
            });
    }, [JSON.stringify({ query, options })]);

    return state;
};

export default useQueryWithStore;
