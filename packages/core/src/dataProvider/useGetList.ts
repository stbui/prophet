/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */
import { useMemo, useEffect } from 'react';
import {
    useQuery,
    UseQueryOptions,
    UseQueryResult,
    useQueryClient,
} from '@tanstack/react-query';
import { useDataProvider } from './useDataProvider';

import { Pagination, Sort, ProRecord } from '../types';

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

export interface GetListResult<RecordType extends ProRecord = any> {
    data: RecordType[];
    total?: number;
    pageInfo?: {
        hasNextPage?: boolean;
        hasPreviousPage?: boolean;
    };
}

export type UseGetListOptions<RecordType extends ProRecord = any> = Omit<
    UseQueryOptions<GetListResult<RecordType>, Error>,
    'queryKey' | 'queryFn'
> & {
    onSuccess?: (value: GetListResult<RecordType>) => void;
    onError?: (error: Error) => void;
};

export type UseGetListHookValue<RecordType extends ProRecord = any> =
    UseQueryResult<RecordType[], Error> & {
        total?: number;
        pageInfo?: {
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        };
    };

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
export const useGetList = <RecordType extends ProRecord = any>(
    resource: string,
    params: Partial<GetListParams> = {},
    options: UseGetListOptions<RecordType> = {}
): any => {
    const {
        pagination = { page: 1, perPage: 25 },
        sort = { field: 'id', order: 'DESC' },
        filter = {},
        meta,
    } = params;

    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();
    const { onError, onSuccess, ...queryOptions } = options;

    const result = useQuery<
        GetListResult<RecordType>,
        Error,
        GetListResult<RecordType>
    >({
        queryKey: [resource, 'getList', { pagination, sort, filter, meta }],
        queryFn: () =>
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
        ...queryOptions,
    });

    useEffect(() => {
        // optimistically populate the getOne cache
        if (
            result.data &&
            result.data?.data &&
            result.data.data.length <= 100
        ) {
            result.data.data.forEach(record => {
                queryClient.setQueryData(
                    [resource, 'getOne', { id: String(record.id), meta }],
                    oldRecord => oldRecord ?? record
                );
            });
        }
        // execute call-time onSuccess if provided
        if (result.data && onSuccess) {
            onSuccess(result.data);
        }
    }, [meta, onSuccess, queryClient, resource, result.data]);

    useEffect(() => {
        if (result.error && onError) {
            onError(result.error);
        }
    }, [onError, result.error]);

    return useMemo(
        () =>
            result.data
                ? {
                      ...result,
                      data: result.data?.data,
                      total: result.data?.total,
                      pageInfo: result.data?.pageInfo,
                  }
                : result,
        [result]
    ) as UseQueryResult<RecordType[], Error> & {
        total?: number;
        pageInfo?: {
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        };
    };
};
