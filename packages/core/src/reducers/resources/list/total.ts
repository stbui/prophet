/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { CRUD_GET_LIST_SUCCESS } from '../../../actions/dataActions';

export default (previousState = 0, { type, payload }) => {
  switch (type) {
    case CRUD_GET_LIST_SUCCESS:
      return payload.total;
    default:
      return previousState;
  }
};
