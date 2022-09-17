/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useUpdate, useGetOne } from '../../dataProvider';
import { useResourceContext } from '../../core';
import { useNotify } from '../../notification';
import { useRedirect } from '../../routing';
import { useRefresh } from '../../loading';

export interface EditProps {
    disableAuthentication?: boolean;
    resource?: string;
    id?: string | number;
    queryOptions?: any;
    mutationOptions?: any;
    mutationMode?: string;
    redirect?: any;
    transform?: any;
}

export interface EditControllerProps {
    save: (data: any, option: any) => void;
    isFetching: any;
    isLoading: any;
    record: any;
    refetch: any;
    error: any;
    resource: any;
    saving: any;
    redirect: any;
}

/**
 *
 * @example
 *
 * import { useEditController } from '@stbui/prophet-core';
 *
 * const EditView = () => <div>...</div>
 *
 * const App = props => {
 *     const controllerProps = useEditController(props);
 *
 *     return <EditView { ...controllerProps } {...props } />;
 * }
 */
export const useEditController = (props: EditProps): EditControllerProps => {
    const {
        id,
        queryOptions = {},
        mutationOptions = {},
        mutationMode = 'undoable',
        redirect: redirectTo = 'list',
    } = props;
    const resource = useResourceContext(props);
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const { meta: queryMeta, ...otherQueryOptions } = queryOptions;
    const {
        onSuccess,
        onError,
        meta: mutationMeta,
        ...otherMutationOptions
    } = mutationOptions;

    const {
        data: record,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useGetOne(
        resource,
        { id, meta: queryMeta },
        {
            onError: () => {
                notify('propht.notification.item_doesnt_exist', {
                    type: 'warning',
                });
                redirect('list', resource);
                refresh();
            },
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
            ...otherQueryOptions,
        }
    );

    const recordCached = { id, previousData: record };

    const [update, { isLoading: saving }] = useUpdate(resource, recordCached, {
        ...otherMutationOptions,
        mutationMode,
    });

    const save = useCallback(
        (
            data: any,
            {
                onSuccess: onSuccessFromSave,
                onError: onErrorFromSave,
                transform: transformFromSave,
            }: any = {}
        ) => {
            update(
                resource,
                { id, data, meta: mutationMeta },
                {
                    onSuccess: async (data, variables, context) => {
                        if (onSuccessFromSave) {
                            return onSuccessFromSave(data, variables, context);
                        }

                        if (onSuccess) {
                            return onSuccess(data, variables, context);
                        }

                        notify('propht.notification.updated', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                            undoable: mutationMode === 'undoable',
                        });
                        redirect(redirectTo, resource, data.id, data);
                    },
                    onError: onErrorFromSave
                        ? onErrorFromSave
                        : onError
                        ? onError
                        : (error: Error | string) => {
                              notify(
                                  typeof error === 'string'
                                      ? error
                                      : error.message ||
                                            'propht.notification.http_error',
                                  {
                                      type: 'warning',
                                      messageArgs: {
                                          _:
                                              typeof error === 'string'
                                                  ? error
                                                  : error && error.message
                                                  ? error.message
                                                  : undefined,
                                      },
                                  }
                              );
                          },
                }
            );
        },
        [
            id,
            mutationMeta,
            mutationMode,
            notify,
            onError,
            onSuccess,
            redirect,
            redirectTo,
            resource,
            update,
            recordCached.previousData,
        ]
    );

    return {
        resource,
        record,
        saving,
        save,
        isFetching,
        isLoading,
        refetch,
        error,
        redirect: 'list',
    };
};
