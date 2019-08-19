/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import useQueryWithStore from './useQueryWithStore';
import { GET_ONE, CRUD_GET_ONE } from '../actions';

/* 
import { useGetOne } from 'prophet-core';

cconst UserProfile = record => {
    const { data, loading, error } = useGetOne('users', record.id);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return <div>{data.username}</div>;
};
 */

export const useGetOne = (
    resource: string,
    id: string | number,
    options?: any
) =>
    useQueryWithStore(
        {
            type: GET_ONE,
            resource,
            payload: { id },
        },
        { ...options, action: CRUD_GET_ONE },
        state =>
            state.resource[resource] ? state.resource[resource].data[id] : null
    );
export default useGetOne;
