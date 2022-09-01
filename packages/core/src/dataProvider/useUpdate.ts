/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useRef } from 'react';
import {
    useMutation,
    useQueryClient,
    UseMutationOptions,
    UseMutationResult,
    MutateOptions,
    QueryKey,
} from 'react-query';

import { useDataProvider } from './useDataProvider';

export type UseUpdateValue = [
    (query?: Partial<any>, options?: Partial<any>) => void,
    {
        data?: any;
        total?: number;
        error?: any;
        loading: boolean;
        loaded: boolean;
    }
];

/**
 * useUpdate
 *
 * @param {string} resource
 * @param {string} id
 * @param {Object} data
 * @param {Object} previousData
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns [update, { data, error, loading, loaded }]
 *
 * @example
 *
 * import { useUpdate } from '@stbui/prophet-core';
 *
 * const UserUpdate = ({ record }) => {
 *     const [update, { isLoading, error }] = useUpdate('user', { id: record.id, data: { sex: new Date() }, previousData: record });
 *
 *     if (error) { return error.message; }
 *
 *     return <button disabled={isLoading} onClick={update}>update</button>
 * };
 */
export const useUpdate = (
    resource: string,
    params: any = {},
    options: any = {}
): any => {
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();

    const update = () => {};

    const mutation = () => {
        return { isLoading: true };
    };

    return [update, mutation];
};
