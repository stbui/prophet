/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { crudDelete } from '../actions/deleteAction';

export interface Props {
    children(props: any): ReactNode;
    resource: any;
    basePath: any;
}

export const DeleteController = (props: Props) => {
    const { children, resource, basePath } = props;
    const dispatch = useDispatch();

    const save = useCallback(
        (data: any, callback?: any, refresh?: boolean) => {
            dispatch(
                crudDelete(resource, basePath, data.id, data, refresh, callback)
            );
        },
        [resource, basePath]
    );

    return children({
        resource,
        basePath,
        update: save,
    });
};

export default DeleteController;
