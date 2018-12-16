import { CRUD_CREATE } from '../actions';

export default (previousState = false, { type, meta }) => {
  switch (type) {
    case CRUD_CREATE:
      return { redirect: meta.onSuccess && meta.onSuccess.redirectTo };
    default:
      return previousState;
  }
};
