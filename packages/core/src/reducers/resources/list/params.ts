import { CRUD_CHANGE_LIST_PARAMS } from '../../../actions/listActions';

const initialState = {
  filter: {}
};

export default (previousState = initialState, { type, payload }) => {
  switch (type) {
    case CRUD_CHANGE_LIST_PARAMS:
      return payload;
    default:
      return previousState;
  }
};
