/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */
import { useRef, useMemo } from 'react';
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
    MutateOptions,
} from '@tanstack/react-query';
import { useDataProvider } from './useDataProvider';

export type UseCreateResult = [
    (query?: any, params?: any, options?: any) => void,
    { isPending: boolean },
];

interface CreateParams<T = any> {
    data: T;
    meta?: any;
}

/**
 *
 * @param {string} resource
 * @param {Object} data
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns [create, { data, error, loading, loaded }]
 * 
 * initial: [create, { isPending: false }]
 * start:   [create, { isPending: true }]
 * success: [create, { data: [data from response], isPending: false, isSuccess: true }]
 * error:   [create, { error: [error from response], isPending: false, isError: true }]
 *
 * @example
 * import { useCreate } from '@stbui/prophet-core';
 *
 * const UserProfile = ({ record }) => {
 *    const [create, { isPending, error }] = useCreate('users', {
 *        data: 'stbui',
 *    });
 *
 *   if (error) {
 *       return error.message;
 *   }
 *
 *   return <div loading={isLoading} onClick={create}>create</div>
 * };
 */

export const useCreate = (
    resource: string,
    params: Partial<CreateParams> = {},
    options: {
        onSuccess?: any;
        [key: string]: any;
    } = {}
): UseCreateResult => {
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();
    const paramsRef = useRef<Partial<CreateParams>>(params);

    const mutation = useMutation<any, any, any>({
        mutationFn: ({
            resource: callTimeResource = resource,
            data: callTimeData = paramsRef.current.data,
            meta: callTimeMeta = paramsRef.current.meta,
        } = {}) =>
            dataProvider
                .create(callTimeResource, {
                    data: callTimeData,
                    meta: callTimeMeta,
                })
                .then(({ data }) => data),
        ...options,
        onSuccess: (data, variables, context) => {
            const { resource: callTimeResource = resource } = variables;
            queryClient.setQueryData(
                [callTimeResource, 'getOne', { id: String(data.id) }],
                data
            );
            queryClient.invalidateQueries({
                queryKey: [callTimeResource, 'getList'],
            });
            if (options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
    });

    const create = (
        callTimeResource: string = resource,
        callTimeParams = {},
        createOptions: any = {}
    ) => {
        const { returnPromise, ...reactCreateOptions } = createOptions;

        if (returnPromise) {
            return mutation.mutateAsync(
                { resource: callTimeResource, ...callTimeParams },
                createOptions
            );
        }

        return mutation.mutate(
            { resource: callTimeResource, ...callTimeParams },
            reactCreateOptions
        );
    };

    const mutationResult = useMemo(
        () => ({
            isLoading: mutation.isPending,
            ...mutation,
        }),
        [mutation]
    );

    return [create, mutationResult];
};
