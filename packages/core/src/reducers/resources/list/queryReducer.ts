import { SET_FILTERS, SET_PAGE } from '../../../actions/listActions';

export default (previousState, { type, payload }) => {
  switch (type) {
    case SET_PAGE:
      return { ...previousState, page: payload };
    case SET_FILTERS:
      return { ...previousState, filter: payload };
    default:
      return previousState;
  }
};
