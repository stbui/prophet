/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { DELETE } from './dataFatchActions';
import { DataAction } from './interfaces';

export const CRUD_DELETE = 'CRUD_DELETE';
export const CRUD_DELETE_LOADING = 'CRUD_DELETE_LOADING';
export const CRUD_DELETE_SUCCESS = 'CRUD_DELETE_SUCCESS';
export const CRUD_DELETE_FAILURE = 'CRUD_DELETE_FAILURE';

export const crudDelete = (
    resource: string,
    basePath: string,
    id: string | number,
    data: any,
    refresh: boolean = true,
    callback?: any
): DataAction => ({
    type: CRUD_DELETE,
    payload: { id, data },
    meta: {
        resource,
        fetch: DELETE,
        onSuccess: {
            notification: {
                type: 'success',
                message: '删除成功',
            },
            refresh,
            basePath,
            callback,
        },
        onFail: {
            notification: {
                type: 'warning',
                message: '删除失败',
            },
            callback,
        },
    },
});
