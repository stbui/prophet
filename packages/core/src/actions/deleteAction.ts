import { DELETE } from './dataFatchActions';
import { DataAction } from './interfaces';

export const CRUD_DELETE = 'CRUD_DELETE';
export const CRUD_DELETE_LOADING = 'CRUD_DELETE_LOADING';
export const CRUD_DELETE_SUCCESS = 'CRUD_DELETE_SUCCESS';
export const CRUD_DELETE_FAILURE = 'CRUD_DELETE_FAILURE';

export const crudDelete = (resource: string, data): DataAction => ({
  type: CRUD_DELETE,
  payload: { data },
  meta: {
    resource,
    fetch: DELETE
  }
});
