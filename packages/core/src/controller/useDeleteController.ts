/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDelete } from '../dataProvider';
import { useNotify, useRedirect } from '../sideEffect';

export interface DeleteProps {
    resource: string;
    basePath: string;
    id: string | number;
    record: object;
    successMessage?: string;
}

/*
import { useDeleteController } from '@stbui/prophet-core';
import DeleteView from './DeleteView';

const create = props => {
    const controllerProps = useDeleteController(props);

    return <DeleteView { ...controllerProps } {...props } />;
}
*/

export const useDeleteController = (props: DeleteProps) => {
    const { resource, basePath, id, record, successMessage } = props;
    const notify = useNotify();
    const [update, { loading: isDeleted }] = useDelete(resource, id, record);

    const save = useCallback(
        (id: any, data, { onSuccess, onFailure, refresh }: any = {}) => {
            update(
                { id, data },
                {
                    onSuccess: onSuccess
                        ? onSuccess
                        : () => {
                              notify(successMessage || '删除成功', 'success');
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
            );
        },
        [resource, basePath, update, successMessage]
    );

    return {
        resource,
        basePath,
        update: save,
        isDeleted: isDeleted,
    };
};

export default useDeleteController;
