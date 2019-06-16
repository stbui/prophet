import { FETCH_CANCEL, FETCH_END, FETCH_ERROR, FETCH_START } from '../actions';

export const loading = (previousState = 0, { type }) => {
  switch (type) {
    case FETCH_START:
      return previousState + 1;
    case FETCH_CANCEL:
    case FETCH_END:
    case FETCH_ERROR:
      return Math.max(previousState - 1, 0);
    default:
      return previousState;
  }
};

export default loading;
