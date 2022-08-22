/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

export const SET_PAGE = 'SET_PAGE';
export const SET_PER_PAGE = 'SET_PER_PAGE';

export const SET_FILTER = 'SET_FILTER';

export const SET_SORT = 'SET_SORT';
export const SORT_ASC = 'ASC';
export const SORT_DESC = 'DESC';

export const CRUD_CHANGE_LIST_PARAMS = 'CRUD_CHANGE_LIST_PARAMS';

interface ListParams {
    sort: string;
    order: string;
    page: number;
    perPage: number;
    filter: any;
    displayedFilters: any;
}

export interface ChangeListParamsAction {
    readonly type: typeof CRUD_CHANGE_LIST_PARAMS;
    readonly payload: ListParams;
    readonly meta: { resource: string };
}

export const changeListParams = (
    resource: string,
    params: ListParams
): ChangeListParamsAction => ({
    type: CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource },
});
