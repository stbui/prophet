/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDelete } from '../dataProvider';
import { useNotify, useRedirect, useRefresh } from '../sideEffect';

export interface DeleteProps {
    resource: string;
    basePath: string;
    id: string | number;
    record: object;
    successMessage?: string;
}

/*
import { useDeleteController } from '@stbui/prophet-core';

const DeleteView = () => <div>...</div>

const pageComponent = props => {
    const controllerProps = useDeleteController(props);

    return <DeleteView { ...controllerProps } {...props } />;
}
*/

export const useDeleteController = (props: DeleteProps) => {
    const { resource, basePath, id, record, successMessage } = props;
    const notify = useNotify();
    const refresh = useRefresh();

    const [update, { loading: deleting }] = useDelete(resource, id, record);

    const remove = useCallback(
        (id: string | number, data, { onSuccess, onFailure }: any = {}) => {
            update(
                { id, data },
                {
                    onSuccess: onSuccess
                        ? onSuccess
                        : () => {
                            notify(successMessage || '删除成功', 'success');
                            refresh();
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
                }
            );
        },
        [resource, basePath, update, notify, successMessage]
    );

    return {
        resource,
        basePath,
        update: remove,
        remove,
        deleting: deleting,
    };
};

export default useDeleteController;
