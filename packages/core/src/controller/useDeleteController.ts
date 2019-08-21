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
}

export const useDeleteController = (props: DeleteProps) => {
    const { resource, basePath } = props;
    const save = useCallback(
        (id: any, data, { onSuccess, onFailure, refresh }: any = {}) => {
            useDelete(resource, id, data, { onSuccess, onFailure, refresh });
        },
        [resource, basePath]
    );

    return {
        resource,
        basePath,
        update: save,
    };
};

export default useDeleteController;
