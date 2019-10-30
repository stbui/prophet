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
}

export const useDeleteController = (props: DeleteProps) => {
    const { resource, basePath, id, record } = props;
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
                              notify('删除成功', 'success');
                          },
                    onFailure: onFailure
                        ? onFailure
                        : () => {
                              notify('删除失败', 'error');
                          },
                    refresh,
                }
            );
        },
        [resource, basePath, update]
    );

    return {
        resource,
        basePath,
        update: save,
        isDeleted: isDeleted,
    };
};

export default useDeleteController;
