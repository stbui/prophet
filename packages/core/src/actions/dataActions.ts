import { GET_LIST } from './dataFatchActions';
import { DataAction } from './interfaces';

export const CRUD_GET_LIST = 'CRUD_GET_LIST';
export const CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
export const CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';
export const CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';

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
