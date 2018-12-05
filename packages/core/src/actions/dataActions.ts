import { GET_LIST } from './dataFatchActions';

export const CRUD_GET_LIST = 'CRUD_GET_LIST';
export const CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
export const CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';
export const CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';

export const CRUD_CREATE = 'CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';
export const CRUD_CREATET_FAILURE = 'CRUD_CREATET_FAILURE';

export interface DataAction {
  readonly type: typeof CRUD_GET_LIST | typeof CRUD_CREATE;
  readonly payload: object;
  readonly meta: object;
}

export const crudGetList = (
  resource: string,
  pagination,
  filter
): DataAction => ({
  type: CRUD_GET_LIST,
  payload: { pagination, ...filter },
  meta: {
    resource,
    fetch: GET_LIST
  }
});

export const crudCreate = (resource: string, data): DataAction => ({
  type: CRUD_CREATE,
  payload: { data },
  meta: {
    resource,
    fetch: CRUD_CREATE
  }
});
