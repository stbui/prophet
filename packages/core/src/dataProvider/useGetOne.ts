/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */
import {useEffect} from 'react'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useDataProvider } from './useDataProvider';
import {ProRecord} from '../types'


export interface GetOneResult<RecordType extends ProRecord = any> {
    data: RecordType;
}

export type UseGetOneOptions<RecordType extends ProRecord = any> = Omit<
    UseQueryOptions<GetOneResult<RecordType>['data']>,
    'queryKey' | 'queryFn'
> & {
    onSuccess?: (data: GetOneResult<RecordType>['data']) => void;
    onError?: (error: Error) => void;
};

export type UseGetOneHookValue<
    RecordType extends ProRecord = any
> = UseQueryResult<GetOneResult<RecordType>['data']>;


/**
 * useGetOne
 *
 * @param {string} resource
 *
 * @returns { data, error }
 *
 * @example
 *
 * import { useGetOne } from '@stbui/prophet-core';
 *
 * cconst UserProfile = record => {
 *    const { data, isLoading, error } = useGetOne('users', {id: record.id});
 *
 *    if (isLoading) {
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
export const useGetOne = <RecordType extends ProRecord = any>(
    resource: string,
    { id, meta }: any,
    options: UseGetOneOptions<RecordType> = {}
): UseGetOneHookValue<RecordType> => {
    const dataProvider = useDataProvider();
    const { onError, onSuccess, ...queryOptions } = options;

    const result = useQuery<any>({
        queryKey: [resource, 'getOne', { id: String(id), meta }],
        queryFn: () =>
            dataProvider
                .getOne(resource, { id, meta })
                .then(({ data }) => data),
        ...queryOptions,
    });

    useEffect(() => {
        if (result.data && onSuccess) {
            onSuccess(result.data);
        }
    }, [onSuccess, result.data]);

    useEffect(() => {
        if (result.error && onError) {
            onError(result.error);
        }
    }, [onError, result.error]);

    return result;
};
