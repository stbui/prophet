/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDelete } from '../dataProvider';
import { useResourceContext } from '../core';
import { useNotify } from '../notification';
import { useRefresh } from '../loading';

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
            update({ id, data });
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
