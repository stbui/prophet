/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { GET_LIST, GET_ONE } from './dataFatchActions';

export const CRUD_GET_LIST = 'CRUD_GET_LIST';
export const CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
export const CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';
export const CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';

export const CRUD_GET_ONE = 'CRUD_GET_ONE';
export const CRUD_GET_ONE_LOADING = 'CRUD_GET_ONE_LOADING';
export const CRUD_GET_ONE_SUCCESS = 'CRUD_GET_ONE_SUCCESS';
export const CRUD_GET_ONE_FAILURE = 'CRUD_GET_ONE_FAILURE';

interface RequestPayload {
    pagination: any;
    sort: any;
    filter: object;
}
export interface CrudGetListAction {
    readonly type: typeof CRUD_GET_LIST;
    readonly payload: RequestPayload;
    readonly meta: {
        resource: string;
        fetch: typeof GET_LIST;
        onFailure: {
            notification: any;
        };
    };
}

export const crudGetList = (
    resource: string,
    pagination: any,
    sort: any,
    filter: object
): CrudGetListAction => ({
    type: CRUD_GET_LIST,
    payload: { pagination, sort, filter },
    meta: {
        resource,
        fetch: GET_LIST,
        onFailure: {
            notification: {
                type: 'warning',
                message: 'prophet.notification.http_error',
            },
        },
    },
});

export interface CrudGetOneAction {
    readonly type: typeof CRUD_GET_ONE;
    readonly payload: any;
    readonly meta: {
        resource: string;
        fetch: typeof GET_ONE;
        basePath: string;
        onFailure: {
            notification: any;
            redirectTo: any;
            refresh: any;
        };
    };
}
export const crudGetOne = (
    resource: string,
    id: string | number,
    basePath: string,
    refresh: boolean = true
): CrudGetOneAction => ({
    type: CRUD_GET_ONE,
    payload: { id },
    meta: {
        resource,
        fetch: GET_ONE,
        basePath,
        onFailure: {
            notification: {
                type: 'warning',
                message: 'prophet.notification.item_doesnt_exist',
            },
            redirectTo: 'list',
            refresh,
        },
    },
});
