/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { DELETE } from './dataFatchActions';
import { DataAction } from '../types';

export const CRUD_DELETE = 'CRUD_DELETE';
export const CRUD_DELETE_LOADING = 'CRUD_DELETE_LOADING';
export const CRUD_DELETE_SUCCESS = 'CRUD_DELETE_SUCCESS';
export const CRUD_DELETE_FAILURE = 'CRUD_DELETE_FAILURE';

interface RequestPayload {
    id: string | number;
    previousData: any;
}
export interface CrudDeleteAction {
    readonly type: typeof CRUD_DELETE;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof DELETE;
        onSuccess: {
            notification: any;
            redirectTo: any;
            refresh: any;
            basePath: string;
        };
        onFailure: {
            notification: any;
        };
    };
}

export const crudDelete = (
    resource: string,
    id: string | number,
    previousData: any,
    basePath: string,
    redirectTo: string = 'list',
    refresh: boolean = true
): CrudDeleteAction => ({
    type: CRUD_DELETE,
    payload: { id, previousData },
    meta: {
        resource,
        fetch: DELETE,
        onSuccess: {
            notification: {
                message: 'ra.notification.deleted',
                type: 'info',
            },
            refresh,
            redirectTo,
            basePath,
        },
        onFailure: {
            notification: {
                message: 'ra.notification.http_error',
                type: 'warning',
            },
        },
    },
});
