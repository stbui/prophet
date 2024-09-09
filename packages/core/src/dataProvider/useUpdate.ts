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

/**
 *
 * @param {string} resource
 * @param {Params} params
 * @param {Object} options
 *
 * @typedef Params
 * @prop params.id
 * @prop params.data
 * @prop params.previousData
 * @prop params.meta
 *
 * @returns [update, { data, error, isLoading }].
 *
 * - initial: [update, { isLoading: false, isIdle: true }]
 * - start:   [update, { isLoading: true }]
 * - success: [update, { data: [data from response], isLoading: false, isSuccess: true }]
 * - error:   [update, { error: [error from response], isLoading: false, isError: true }]
 *
 * @example
 *
 * import { useUpdate } from '@stbui/prophet-core';
 *
 * const IncreaseLikeButton = ({ record }) => {
 *     const diff = { likes: record.likes + 1 };
 *     const [update, { isLoading, error }] = useUpdate();
 *     const handleClick = () => {
 *         update('likes', { id: record.id, data: diff, previousData: record })
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={handleClick}>Like</div>;
 * };
 *
 * @example
 *
 * import { useUpdate } from '@stbui/prophet-core';
 *
 * const IncreaseLikeButton = ({ record }) => {
 *     const diff = { likes: record.likes + 1 };
 *     const [update, { isLoading, error }] = useUpdate('likes', { id: record.id, data: diff, previousData: record });
 *     if (error) { return <p>ERROR</p>; }
 *     return <button disabled={isLoading} onClick={() => update()}>Like</button>;
 * };
 *
 */
export const useUpdate = <
    RecordType extends unknown = any,
    MutationError = unknown,
>(
    resource?: string,
    params: Partial<any> = {},
    options: UseUpdateOptions<RecordType, MutationError> = {}
): UseUpdateResult<RecordType, boolean, MutationError> => {
    const dataProvider = useDataProvider();
    const queryClient = useQueryClient();
    const { id, data, meta } = params;
    const { mutationMode = 'pessimistic', ...reactMutationOptions } = options;
    const mode = useRef<unknown>(mutationMode);
    const paramsRef = useRef<any>(params);
    const snapshot = useRef<Snapshot>([]);

    const updateCache = ({ resource, id, data }) => {
        const now = Date.now();
        const updatedAt = mode.current === 'undoable' ? now + 5 * 1000 : now;

        const updateColl = (old: any[]) => {
            if (!old) return;
            const index = old.findIndex(record => record.id == id);
            if (index === -1) {
                return old;
            }
            return [
                ...old.slice(0, index),
                { ...old[index], ...data },
                ...old.slice(index + 1),
            ];
        };

        type GetListResult = Omit<any, 'data'> & {
            data?: RecordType[];
        };

        queryClient.setQueryData(
            [resource, 'getOne', { id: String(id), meta }],
            (record: any) => ({ ...record, ...data }),
            { updatedAt }
        );
        queryClient.setQueriesData(
            { queryKey: [resource, 'getList'] },
            (res: GetListResult) =>
                res && res.data ? { ...res, data: updateColl(res.data) } : res,
            { updatedAt }
        );
    };

    const mutation = useMutation<
        RecordType,
        MutationError,
        Partial<UseUpdateMutateParams<RecordType>>
    >({
        mutationFn: ({
            resource: callTimeResource = resource,
            id: callTimeId = paramsRef.current.id,
            data: callTimeData = paramsRef.current.data,
            meta: callTimeMeta = paramsRef.current.meta,
            previousData: callTimePreviousData = paramsRef.current.previousData,
        } = {}) => {
            return dataProvider
                .update(callTimeResource, {
                    id: callTimeId,
                    data: callTimeData,
                    previousData: callTimePreviousData,
                    meta: callTimeMeta,
                })
                .then(({ data }) => data);
        },
        ...reactMutationOptions,
        onMutate: async (
            variables: Partial<UseUpdateMutateParams<RecordType>>
        ) => {
            if (reactMutationOptions.onMutate) {
                const userContext =
                    (await reactMutationOptions.onMutate(variables)) || {};
                return {
                    snapshot: snapshot.current,
                    // @ts-ignore
                    ...userContext,
                };
            } else {
                return { snapshot: snapshot.current };
            }
        },
        onError: (error, variables = {}, context) => {
            if (reactMutationOptions.onError) {
                return reactMutationOptions.onError(error, variables, context);
            }
        },
        onSuccess: (
            data: RecordType,
            variables: Partial<UseUpdateMutateParams<RecordType>> = {},
            context: unknown
        ) => {
            if (mode.current === 'pessimistic') {
                const {
                    resource: callTimeResource = resource,
                    id: callTimeId = id,
                } = variables;
                updateCache({
                    resource: callTimeResource,
                    id: callTimeId,
                    data,
                });

                if (reactMutationOptions.onSuccess) {
                    reactMutationOptions.onSuccess(data, variables, context);
                }
            }
        },
        onSettled: (data, error, variables = {}, context) => {
            if (reactMutationOptions.onSettled) {
                return reactMutationOptions.onSettled(
                    data,
                    error,
                    variables,
                    context
                );
            }
        },
    });

    const update = async (
        // @ts-ignore
        callTimeResource: string = resource,
        callTimeParams: any = {},
        updateOptions: MutateOptions<
            RecordType,
            unknown,
            Partial<UseUpdateMutateParams<RecordType>>,
            unknown
        > & { mutationMode?: any; returnPromise?: boolean } = {}
    ) => {
        const { mutationMode, returnPromise, onSuccess, onSettled, onError } =
            updateOptions;

        paramsRef.current = params;

        if (mutationMode) {
            mode.current = mutationMode;
        }

        if (returnPromise && mode.current !== 'pessimistic') {
            console.warn(
                'The returnPromise parameter can only be used if the mutationMode is set to pessimistic'
            );
        }

        if (mode.current === 'pessimistic') {
            if (returnPromise) {
                return mutation.mutateAsync(
                    { resource: callTimeResource, ...callTimeParams },
                    { onSuccess, onSettled, onError }
                );
            }
            return mutation.mutate(
                { resource: callTimeResource, ...callTimeParams },
                { onSuccess, onSettled, onError }
            );
        }

        const {
            id: callTimeId = id,
            data: callTimeData = data,
            meta: callTimeMeta = meta,
        } = callTimeParams;

        const previousRecord = queryClient.getQueryData<RecordType>([
            callTimeResource,
            'getOne',
            { id: String(callTimeId), meta: callTimeMeta },
        ]);

        const queryKeys = [
            [
                callTimeResource,
                'getOne',
                { id: String(callTimeId), meta: callTimeMeta },
            ],
            [callTimeResource, 'getList'],
            [callTimeResource, 'getMany'],
            [callTimeResource, 'getManyReference'],
        ];

        snapshot.current = queryKeys.reduce(
            (prev, queryKey) =>
                prev.concat(queryClient.getQueriesData({ queryKey })),
            [] as Snapshot
        );

        await Promise.all(
            snapshot.current.map(([queryKey]) =>
                queryClient.cancelQueries({ queryKey })
            )
        );

        updateCache({
            resource: callTimeResource,
            id: callTimeId,
            data: callTimeData,
        });
    };

    return [update, mutation];
};

type Snapshot = [key: QueryKey, value: any][];

export interface UseUpdateMutateParams<RecordType extends unknown = any> {
    resource?: string;
    id?: any;
    data?: Partial<RecordType>;
    previousData?: any;
    meta?: any;
}

export type UseUpdateOptions<
    RecordType extends unknown = any,
    MutationError = unknown,
> = UseMutationOptions<
    RecordType,
    MutationError,
    Partial<UseUpdateMutateParams<RecordType>>
> & { mutationMode?: any };

export type UseUpdateResult<
    RecordType extends any = any,
    TReturnPromise extends boolean = boolean,
    MutationError = unknown,
> = [
    up: any,
    UseMutationResult<
        RecordType,
        MutationError,
        Partial<any & { resource?: string }>,
        unknown
    >,
];
