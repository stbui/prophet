/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect, useState } from 'react';
import useDataProvider from './useDataProvider';

/* 
import { useQuery } from '@stbui/prophet-core';

const UserProfile = record => {
    const { data, loading, error } = useQuery({
        type: 'GET_ONE',
        resource: 'users',
        payload: { id: record.id },
    });

    if (loading) {
        return 'loading';
    }

    if (error) {
        return error.message;
    }

    return <div>{data.username}</div>;
};

const UserList = () => {
    const { data, loading, error } = useQuery({
        type: 'GET_ONE',
        resource: 'users',
        payload: {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'username', order: 'ASC' },
        },
    });
    
    if (loading) {
        return 'loading';
    }
    if (error) {
        return error.message;
    }

    return (
        <div>
            total:{total},{data.map(user => user.username)}
        </div>
    );
};
 */

export interface Query {
    type: string;
    resource: string;
    payload: object;
}

export interface QueryOptions {
    action?: string;
    onSuccess?: (response: any) => any | Object;
    onError?: (error?: any) => any | Object;
}

export interface UseQueryValue {
    data?: any;
    total?: number;
    error?: any;
    loading?: boolean;
    loaded?: boolean;
}

/**
 *
 * @param {Object} query
 * @param {string} query.type
 * @param {string} query.resource
 * @param {Object} query.payload
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns { data, total, error, loading, loaded }
 *
 * @example
 */
const useQuery = (query: Query, options: QueryOptions = {}): UseQueryValue => {
    const { type, resource, payload } = query;
    const [state, setState]: any = useState({
        data: undefined,
        error: null,
        total: null,
        loading: true,
        loaded: false,
    });

    const dataProvider = useDataProvider();

    useEffect(() => {
        setState(prevState => ({ ...prevState, loading: true }));

        dataProvider(type, resource, payload, options)
            .then(({ data, total }: any) => {
                setState({
                    data,
                    total,
                    loading: false,
                    loaded: true,
                });
            })
            .catch(error => {
                setState({
                    error,
                    loading: false,
                    loaded: false,
                });
            });
    }, [dataProvider, JSON.stringify({ query, options })]);

    return state;
};

export default useQuery;
