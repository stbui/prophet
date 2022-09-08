/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useDataProvider } from './useDataProvider';

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
export const useGetOne = (
    resource: string,
    { id, meta }: any,
    options?: UseQueryOptions
): UseQueryResult => {
    const dataProvider = useDataProvider();

    return useQuery(
        [resource, 'getOne', { id: String(id), meta }],
        () =>
            dataProvider
                .getOne(resource, { id, meta })
                .then(({ data }) => data),
        options
    );
};
