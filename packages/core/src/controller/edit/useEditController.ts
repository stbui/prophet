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
    resource: string;
    basePath: string;
    id: string | number;
    successMessage?: string;
    queryOptions?: any;
    mutationOptions?: any;
}

export interface EditControllerProps {
    resource: string;
    basePath: string;
    record: any;
    id: string | number;
    loading: boolean;
    loaded: boolean;
    saving: boolean;
    save: (data: any, option: any) => void;
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
        basePath,
        id,
        successMessage,
        queryOptions = {},
        mutationOptions = {},
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
        loading,
        loaded,
    } = useGetOne(resource, { id, meta: queryMeta }, { ...otherQueryOptions });

    const [update, { isLoading: saving }] = useUpdate(
        resource,
        { id, previousData: record },
        { ...otherMutationOptions }
    );

    const save = useCallback(
        (data: any, { onSuccess, onFailure }: any = {}) => {},
        [resource, basePath, update, notify, redirect]
    );

    return {
        resource,
        basePath,
        record,
        id,
        loading,
        loaded,
        saving,
        save,
    };
};
