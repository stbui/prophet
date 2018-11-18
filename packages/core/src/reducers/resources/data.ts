import { GET_LIST } from '../../actions/dataFatchActions';

export default (previousState = {}, { type, payload, meta }) => {
  switch (meta.fetchResponse) {
    case GET_LIST:
      return payload.data;
    default:
      return previousState;
  }
};
