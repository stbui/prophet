/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { CREATE } from './dataFatchActions';
import { DataAction } from './interfaces';

export const CRUD_CREATE = 'CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';
export const CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';

export const crudCreate = (
    resource: string,
    data: any,
    basePath: string,
    redirectTo: string,
    refresh: boolean = false
): DataAction => ({
    type: CRUD_CREATE,
    payload: { data },
    meta: {
        resource,
        fetch: CREATE,
        onSuccess: {
            notification: {
                type: 'success',
                message: '创建成功',
                // description: ''
            },
            redirectTo,
            basePath,
            refresh,
        },
        onFailure: {
            notification: {
                type: 'warning',
                message: '创建失败',
                // description: ''
            },
        },
    },
});
