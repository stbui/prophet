/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import {
    useQuery,
    UseQueryOptions,
    UseQueryResult,
    useQueryClient,
} from 'react-query';
import { useDataProvider } from './useDataProvider';

import { Pagination, Sort } from '../types';

export interface UseGetListValue {
    data?: any;
    total?: number;
}

export interface GetListParams {
    pagination?: Pagination;
    sort?: Sort;
    filter?: any;
    meta?: any;
}

/**
 * useGetList
 *
 * @param {string} resource
 * @param {Object} params.pagination
 * @param {Object} params.filter
 * @param {Object} params.sort
 * @param {Function} options.onSuccess
 * @param {Function} options.onError
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
    params: Partial<GetListParams> = {},
    options?: UseQueryOptions
): UseQueryResult => {
    const {
        pagination = { page: 1, perPage: 25 },
        sort = { field: 'id', order: 'DESC' },
        filter = {},
        meta,
    } = params;

    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();

    const result = useQuery(
        [resource, 'getList', { pagination, sort, filter, meta }],
        () =>
            dataProvider
                .getList(resource, {
                    pagination,
                    sort,
                    filter,
                    meta,
                })
                .then(({ data, total, pageInfo }) => ({
                    data,
                    total,
                    pageInfo,
                })),
        {
            ...options,
            onSuccess: value => {
                const { data } = value;
                data.forEach(record => {
                    queryClient.setQueryData(
                        [resource, 'getOne', { id: String(record.id), meta }],
                        oldRecord => oldRecord ?? record
                    );
                });

                if (options?.onSuccess) {
                    options.onSuccess(value);
                }
            },
        }
    );
    return result.data
        ? {
              ...result,
              data: result.data?.data,
              total: result.data?.total,
              pageInfo: result.data?.pageInfo,
          }
        : result;
};
