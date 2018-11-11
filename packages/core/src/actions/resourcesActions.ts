export const REGISTER_RESOURCE = 'REGISTER_RESOURCE';
export const UNREGISTER_RESOURCE = 'UNREGISTER_RESOURCE';

export const registerResource = resource => ({
  type: REGISTER_RESOURCE,
  payload: resource
});

export const unregisterResource = resourceName => ({
  type: REGISTER_RESOURCE,
  payload: resourceName
});
