/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useSelector, shallowEqual } from 'react-redux';
import get from 'lodash/get';
import useQueryWithStore from './useQueryWithStore';
import { GET_LIST, CRUD_GET_LIST } from '../actions';
import { Pagination, Sort } from '../types';

export interface UseGetListValue {
    data?: any;
    total?: number;
    error?: any;
    loading?: boolean;
    loaded?: boolean;
    ids?: any;
}

const defautlPagination = { page: 1, perPage: 10 };
const defaultSort = { field: 'id', order: 'DESC' };
const defaultFilter = {};
const defaultIds = [];

/**
 * useGetList
 *
 * @param {string} resource
 * @param {Object} pagination
 * @param {Object} filter
 * @param {Object} sort
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns { data, ids, total, loading, loaded, error }
 *
 * @example
 *
 * import { useGetList } from '@stbui/prophet-core';
 *
 * const UserList = () => {
 *     const { data, ids, loading, error } = useGetList(
 *         'users',
 *         { page: 1, perPage: 10 },
 *         { username: 'stbui' },
 *         { field: 'id', order: 'DESC' }
 *     );
 *
 *     if (loading) { return 'loading'; }
 *     if (error) { return error.message; }
 *
 *     return <div>{ids.map(id => data[id].username)}</div>;
 * };
 */
export const useGetList = (
    resource: string,
    pagination: Pagination = defautlPagination,
    filter: Object = defaultFilter,
    sort: Sort = defaultSort,
    options?: object
): UseGetListValue => {
    const requestSignature = JSON.stringify({ pagination, sort, filter });

    const { data: ids, total, loading, loaded, error } = useQueryWithStore(
        {
            type: GET_LIST,
            resource,
            payload: { pagination, filter, sort },
        },
        { ...options, action: CRUD_GET_LIST },
        state =>
            get(
                state.resources,
                [resource, 'list', 'cachedRequests', requestSignature, 'ids'],
                null
            ),
        state =>
            get(state.resources, [
                resource,
                'list',
                'cachedRequests',
                requestSignature,
                'total',
            ])
    );

    const data = useSelector(
        (state: any) =>
            get(
                state.resources,
                [resource, 'list', 'cachedRequests', requestSignature, 'data'],
                null
            ),
        shallowEqual
    );

    return {
        data,
        ids: ids === null ? defaultIds : ids,
        total,
        loading,
        loaded,
        error,
    };
};

export default useGetList;
