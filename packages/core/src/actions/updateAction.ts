/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { UPDATE } from './dataFatchActions';
import { DataAction } from './interfaces';

export const CRUD_UPDATE = 'CRUD_UPDATE';
export const CRUD_UPDATE_LOADING = 'CRUD_UPDATE_LOADING';
export const CRUD_UPDATE_SUCCESS = 'CRUD_UPDATE_SUCCESS';
export const CRUD_UPDATE_FAILURE = 'CRUD_UPDATE_FAILURE';

export const crudUpdate = (
    resource: string,
    basePath: string,
    id: string | number,
    data: object,
    redirectTo: string,
    refresh: boolean = false,
    callback?: any
): DataAction => ({
    type: CRUD_UPDATE,
    payload: { id, data },
    meta: {
        resource,
        fetch: UPDATE,
        onSuccess: {
            notification: {
                type: 'info',
                message: '更新成功',
            },
            redirectTo,
            basePath,
            refresh,
            callback,
        },
        onFailure: {
            notification: {
                type: 'warning',
                message: '更新失败',
            },
            callback,
        },
    },
});
