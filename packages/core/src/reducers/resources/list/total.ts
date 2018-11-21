import { CRUD_GET_LIST_SUCCESS } from '../../../actions/dataActions';

export default (previousState = {}, { type, payload }) => {
  switch (type) {
    case CRUD_GET_LIST_SUCCESS:
      return payload.total;
    default:
      return previousState;
  }
};
