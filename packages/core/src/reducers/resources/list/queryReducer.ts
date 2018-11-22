import { SET_FILTERS } from '../../../actions/listActions';

export default (previousState, { type, payload }) => {
  console.log(previousState, { type, payload });
  switch (type) {
    case SET_FILTERS:
      return { ...previousState, filter: payload };
    default:
      return previousState;
  }
};
