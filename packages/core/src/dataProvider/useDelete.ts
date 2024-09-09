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
} from '@tanstack/react-query';

import { useDataProvider } from './useDataProvider';

export type UseDeleteValue = [
    (query?: Partial<any>, options?: Partial<any>) => void,
    {
        data?: any;
        total?: number;
        error?: any;
        loading?: boolean;
        loaded?: boolean;
    },
];

/**
 *
 * @param {string} resource
 * @param {string} id
 * @param {Object} previousData
 * @param {Object} options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns
 *
 * @example
 *
 * import { useDelete } from '@stbui/props-core';
 *
 * const UserProfile = ({ record }) => {
 *    const [delete, { loading, error }] = useDelete('users', record.id);
 *
 *    if (error) {
 *        return error.message;
 *    }
 *
 *    return (
 *        <div loading={loading} onClick={delete}>
 *            delete
 *        </div>
 *    );
 * };
 */
export const useDelete = (
    resource: string,
    params: any = {},
    options: object = {}
): any => {
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();

    const { id, previousData } = params;

    const paramsRef = useRef<any>(params);

    const mutation = useMutation({});

    const mutate = (
        callTimeResource: string = resource,
        callTimeParams: any = {},
        updateOptions: any = {}
    ) => {
        const { mutationMode, onSuccess, onSettled, onError } = updateOptions;
        paramsRef.current = params;

        const {
            id: callTimeId = id,
            previousData: callTimePreviousData = previousData,
        } = callTimeParams;

        const queryKeys = [[callTimeResource, 'getList']];
        // 取消所有请求
        // queryClient.cancelQueries();

        return mutation.mutate(
            { resource: callTimeResource, ...callTimeParams },
            { onSettled, onError }
        );
    };

    return [mutate, mutation];
};
