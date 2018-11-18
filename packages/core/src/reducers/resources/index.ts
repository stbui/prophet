import { REGISTER_RESOURCE, UNREGISTER_RESOURCE } from '../../actions';
import data from './data';

export default (previousState = {}, { type, payload, meta }) => {
  switch (type) {
    case REGISTER_RESOURCE:
      const resuorceState = { props: payload, data: [], list: [] };
      return { ...previousState, [payload.name]: resuorceState };
    case UNREGISTER_RESOURCE:
      return { resources: 'UNREGISTER_RESOURCE' };
  }

  if (!meta || !meta.resource) {
    return previousState;
  }

  const resources = Object.keys(previousState);

  const newState = resources.reduce(
    (acc, resource) => ({
      ...acc,
      [resource]:
        meta.resource === resource
          ? {
              props: previousState[resource].props,
              data: data(previousState[resource].data, { type, payload, meta }),
              list: []
            }
          : previousState[resource]
    }),
    {}
  );

  return newState;
};

export const getResources = state =>
  Object.keys(state).map(key => state[key].props);
