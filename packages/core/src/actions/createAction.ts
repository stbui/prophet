/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { CREATE } from './dataFatchActions';

export const CRUD_CREATE = 'CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';
export const CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';

interface RequestPayload {
    data: any;
}
export interface CrudCreateAction {
    readonly type: typeof CRUD_CREATE;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof CREATE;
        onSuccess: {
            notification: any;
            redirectTo: any;
            basePath: string;
        };
        onFailure: {
            notification: any;
        };
    };
}

export const crudCreate = (
    resource: string,
    data: any,
    basePath: string,
    redirectTo: string = 'edit'
): CrudCreateAction => ({
    type: CRUD_CREATE,
    payload: { data },
    meta: {
        resource,
        fetch: CREATE,
        onSuccess: {
            notification: {
                message: 'prophet.notification.created',
                type: 'success',
            },
            redirectTo,
            basePath,
        },
        onFailure: {
            notification: {
                type: 'warning',
                message: 'prophet.notification.http_error',
            },
        },
    },
});
