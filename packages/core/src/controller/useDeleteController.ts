/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDelete } from '../dataProvider';
import { useNotify, useRedirect, useRefresh } from '../sideEffect';
import { useResourceContext } from '../core';

export interface DeleteProps {
    resource: string;
    basePath: string;
    id: string | number;
    record: object;
    successMessage?: string;
}

/**
 *
 * @param props
 *
 * @example
 *
 * import { useDeleteController } from '@stbui/prophet-core';
 *
 * const DeleteView = () => <div>...</div>
 *
 * const App = props => {
 *     const controllerProps = useDeleteController(props);
 *
 *     return <DeleteView { ...controllerProps } {...props } />;
 * }
 */
export const useDeleteController = (props: DeleteProps) => {
    const { basePath, id, record, successMessage } = props;
    const resource = useResourceContext(props);
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
