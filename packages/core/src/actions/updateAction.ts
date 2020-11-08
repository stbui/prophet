/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { UPDATE } from './dataFatchActions';

export const CRUD_UPDATE = 'CRUD_UPDATE';
export const CRUD_UPDATE_LOADING = 'CRUD_UPDATE_LOADING';
export const CRUD_UPDATE_SUCCESS = 'CRUD_UPDATE_SUCCESS';
export const CRUD_UPDATE_FAILURE = 'CRUD_UPDATE_FAILURE';

interface RequestPayload {
    id: string | number;
    data: any;
    previousData?: any;
}

export interface CrudUpdateAction {
    readonly type: typeof CRUD_UPDATE;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof UPDATE;
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

export const crudUpdate = (
    resource: string,
    id: string | number,
    data: any,
    previousData: any,
    basePath: string,
    redirectTo: string = 'show',
    refresh: boolean = true
): CrudUpdateAction => ({
    type: CRUD_UPDATE,
    payload: { id, data, previousData },
    meta: {
        resource,
        fetch: UPDATE,
        onSuccess: {
            notification: {
                type: 'info',
                message: 'prophet.notification.updated',
            },
            refresh,
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
