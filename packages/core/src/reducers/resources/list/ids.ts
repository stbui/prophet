import { CRUD_GET_LIST_SUCCESS } from '../../../actions';

export const ids = (previousStatus = [], { type, payload }) => {
  switch (type) {
    case CRUD_GET_LIST_SUCCESS:
      return payload.data.map(({ id }) => id);
    default:
      return previousStatus;
  }
};

export default ids;
