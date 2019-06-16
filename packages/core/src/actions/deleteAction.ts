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
  id: number,
  data: any
): DataAction => ({
  type: CRUD_DELETE,
  payload: { id, data },
  meta: {
    resource,
    fetch: DELETE,
    onSuccess: {},
    onFail: {}
  }
});
