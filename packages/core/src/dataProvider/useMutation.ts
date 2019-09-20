import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import useDataProvider from './useDataProvider';

/*
import { useMutation } from 'prophet-core';

const UserProfile = record => {
    const [update, { data, loading, error }] = useMutation({
        type: 'UPDATE',
        resource: 'users',
        payload: { id: record.id, data: { username: 'stbui' } },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return <div onClick={update}>{data.username}</div>;
};

const UserProfile = record => {
    const [update, { data, loading, error }] = useMutation({
        type: 'UPDATE',
        resource: 'users',
        payload: { id: record.id, data: { username: 'stbui' } },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <div onClick={() => update(null, { data: { updateAt: new Date() } })}>
            {data.username}
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
    meta?: any;
    action?: any;
}

const useMutation = (query: Query, options: QueryOptions) => {
    const { type, resource, payload } = query;
    const [state, setState]: any = useState({
        data: null,
        total: null,
        error: null,
        loading: false,
        loaded: false,
    });

    const dataProvider = useDataProvider();

    const mutate = useCallback(
        (callTimeQuery, callTimeOptions = {}) => {
            setState(prevState => ({ ...prevState, loading: true }));

            dataProvider(
                type,
                resource,
                { ...payload, ...callTimeQuery },
                {
                    ...options,
                    ...callTimeOptions,
                }
            )
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
        },
        [dataProvider, JSON.stringify({ query, options })]
    );

    return [mutate, state];
};

export default useMutation;
