/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */
import { useRef } from 'react';
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
    MutateOptions,
} from 'react-query';
import { useDataProvider } from './useDataProvider';

export type UseCreateValue = [
    (query?: Partial<any>, params?: any, options?: Partial<any>) => void,
    {
        data?: any;
        total?: number;
        error?: any;
        loading: boolean;
        loaded: boolean;
    }
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
 * @example
 * import { useCreate } from '@stbui/prophet-core';
 *
 * const UserProfile = ({ record }) => {
 *    const [create, { isLoading, error }] = useCreate('users', {
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
) => {
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();
    const paramsRef = useRef<Partial<CreateParams>>(params);

    const mutation = useMutation(
        ({
            resource: callTimeResource = resource,
            data: callTimeData = paramsRef.current.data,
            meta: callTimeMeta = paramsRef.current.meta,
        } = {}) => {
            dataProvider
                .create(callTimeResource, {
                    data: callTimeData,
                    meta: callTimeMeta,
                })
                .then(({ data }) => data);
        },
        {
            ...options,
            onSuccess: (data, variables, context) => {
                const { resource: callTimeResource = resource } = variables;
                queryClient.setQueryData(
                    [callTimeResource, 'getOne', { id: String(data.id) }],
                    data
                );
                if (options.onSuccess) {
                    options.onSuccess(data, variables, context);
                }
            },
        }
    );

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

        mutation.mutate(
            { resource: callTimeResource, ...callTimeParams },
            reactCreateOptions
        );
    };

    return [create, mutation];
};

