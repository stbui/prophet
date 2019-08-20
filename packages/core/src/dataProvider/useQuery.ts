/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useEffect, useState } from 'react';
import useDataProvider from './useDataProvider';

/* 
import { useQuery } from 'prophet-core';

const UserProfile = record => {
    const { data, loading, error } = useQuery({
        type: 'GET_ONE',
        resource: 'users',
        payload: { id: record.id },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
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
        return <Loading />;
    }
    if (error) {
        return <Error />;
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

const useQuery = (query: Query, options = {}) => {
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
        dataProvider(type, resource, payload, options)
            .then(({ data, total }) => {
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
