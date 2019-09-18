/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useCallback } from 'react';
import { useDelete } from '../dataProvider';

export interface DeleteProps {
    resource: string;
    basePath: string;
    id: string | number;
    record: object;
}

export const useDeleteController = (props: DeleteProps) => {
    const { resource, basePath, id, record } = props;
    const [update, { loading: isDeleted }] = useDelete(resource, id, record);

    const save = useCallback(
        (id: any, data, { onSuccess, onFailure, refresh }: any = {}) => {
            update(null, { id, data }, { onSuccess, onFailure, refresh });
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
