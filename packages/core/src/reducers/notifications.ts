import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions';

export const notification = (previousState = '', { type, payload }) => {
  switch (type) {
    case SHOW_NOTIFICATION:
      return payload;
    default:
      return previousState;
  }
};

export default notification;
