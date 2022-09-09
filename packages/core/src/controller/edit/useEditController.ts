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
    resource?: string;
    id?: string | number;
    queryOptions?: any;
    mutationOptions?: any;
    mutationMode?: string;
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
        (data: any, { onSuccess, onFailure }: any = {}) => {},
        [resource, update, notify, redirect]
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
    };
};
