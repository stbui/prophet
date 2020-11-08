/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useQueryWithStore from './useQueryWithStore';
import { GET_ONE, CRUD_GET_ONE } from '../actions';

export interface UseGetOneValue {
    data?: any;
    error?: any;
    loading?: boolean;
    loaded?: boolean;
}

/**
 * useGetOne
 *
 * @param {string} resource
 * @param {string} id
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns { data, error, loading, loaded }
 *
 * @example
 *
 * import { useGetOne } from '@stbui/prophet-core';
 *
 * cconst UserProfile = record => {
 *    const { data, loading, error } = useGetOne('users', record.id);
 *
 *    if (loading) {
 *        return 'loading';
 *    }
 *
 *    if (error) {
 *       return error.message;
 *   }
 *
 *   return <div>{data.username}</div>;
 * };
 */
export const useGetOne = (
    resource: string,
    id: string | number,
    options?: any
): UseGetOneValue =>
    useQueryWithStore(
        {
            type: GET_ONE,
            resource,
            payload: { id },
        },
        { ...options, action: CRUD_GET_ONE },
        state =>
            state.resources[resource]
                ? state.resources[resource].data[id]
                : null
    );

export default useGetOne;
