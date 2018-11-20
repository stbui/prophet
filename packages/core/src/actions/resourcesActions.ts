export const REGISTER_RESOURCE = 'REGISTER_RESOURCE';
export const UNREGISTER_RESOURCE = 'UNREGISTER_RESOURCE';

export interface ResourceDefinition {
  readonly name: string;
  readonly label?: any;
  readonly hasList?: boolean;
  readonly hasEdit?: boolean;
  readonly hasShow?: boolean;
  readonly hasCreate?: boolean;
}

export const registerResource = (resource: ResourceDefinition) => ({
  type: REGISTER_RESOURCE,
  payload: resource
});

export const unregisterResource = (resourceName: string) => ({
  type: REGISTER_RESOURCE,
  payload: resourceName
});
