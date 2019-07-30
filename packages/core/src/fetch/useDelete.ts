/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { crudDelete } from '../actions';

export interface DeleteProps {
    resource: string;
    basePath: string;
}

export const useDelete = (props: DeleteProps) => {
    const { resource, basePath } = props;
    const dispatch = useDispatch();

    const update = useCallback(
        (data: any, callback?: any, refresh?: boolean) =>
            dispatch(
                crudDelete(resource, basePath, data.id, data, refresh, callback)
            ),
        [resource, basePath]
    );

    return [update, {
        resource,
        basePath,
    }];
};

export default useDelete;
