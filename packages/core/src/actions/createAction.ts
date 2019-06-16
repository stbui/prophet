/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { CREATE } from './dataFatchActions';
import { DataAction } from './interfaces';

export const CRUD_CREATE = 'CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';
export const CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';

export const crudCreate = (
  resource: string,
  data: any,
  basePath: string,
  redirectTo: string
): DataAction => ({
  type: CRUD_CREATE,
  payload: { data },
  meta: {
    resource,
    fetch: CREATE,
    onSuccess: {
      redirectTo,
      basePath
    },
    onFailure: {}
  }
});
