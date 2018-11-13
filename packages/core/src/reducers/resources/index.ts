import { REGISTER_RESOURCE, UNREGISTER_RESOURCE } from '../../actions';

export default (previousState = {}, { type, payload }) => {
  switch (type) {
    case REGISTER_RESOURCE:
      const resuorceState = { props: payload, data: [], list: [] };
      return { ...previousState, [payload.name]: resuorceState };
    case UNREGISTER_RESOURCE:
      return { resources: 'UNREGISTER_RESOURCE' };
    default:
      return previousState;
  }
};

export const getResources = state =>
  Object.keys(state).map(key => state[key].props);
