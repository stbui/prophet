/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useUpdate, useGetOne } from '../dataProvider';
import { useNotify, useRedirect } from '../sideEffect';

export interface EditProps {
    resource: string;
    basePath: string;
    id: string | number;
    successMessage?: string;
}

export interface EditControllerProps {
    resource: string;
    basePath: string;
    record: any;
    id: string | number;
    loading: any;
    loaded: any;
    saving: any;
    save: any;
}

/*
import { useEditController } from '@stbui/prophet-core';

const EditView = () => <div>...</div>

const pageComponent = props => {
    const controllerProps = useEditController(props);

    return <EditView { ...controllerProps } {...props } />;
}
*/

export const useEditController = (props: EditProps): EditControllerProps => {
    const { resource, basePath, id, successMessage } = props;
    const notify = useNotify();
    const redirect = useRedirect();

    const { data: record, loading, loaded } = useGetOne(resource, id, {
        onFailure: error =>
            notify(
                typeof error === 'string'
                    ? error
                    : error.message || 'prophet.notification.http_error',
                'error'
            ),
    });

    const [update, { loading: saving }] = useUpdate(resource, id, {}, record);

    const save = useCallback(
        (
            data: any,
            { onSuccess, onFailure, refresh, redirectTo = 'list' } = {}
        ) =>
            update(
                { data },
                {
                    onSuccess: onSuccess
                        ? onSuccess
                        : () => {
                              notify(successMessage || '更新成功', 'success');
                              redirect(redirectTo, basePath, data.id);
                          },
                    onFailure: onFailure
                        ? onFailure
                        : error =>
                              notify(
                                  typeof error === 'string'
                                      ? error
                                      : error.message ||
                                            'prophet.notification.http_error',
                                  'error'
                              ),
                    refresh,
                }
            ),
        [resource, basePath, update, successMessage]
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

export default useEditController;
