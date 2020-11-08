/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */
import { ResourceDefinition } from '../types';

export const REGISTER_RESOURCE = 'REGISTER_RESOURCE';
export const UNREGISTER_RESOURCE = 'UNREGISTER_RESOURCE';

export interface RegisterResourceAction {
    readonly type: typeof REGISTER_RESOURCE;
    readonly payload: ResourceDefinition;
}

export const registerResource = (resource: ResourceDefinition) => ({
    type: REGISTER_RESOURCE,
    payload: resource,
});

export interface UnregisterResourceAction {
    readonly type: typeof UNREGISTER_RESOURCE;
    readonly payload: string;
}

export const unregisterResource = (resourceName: string) => ({
    type: REGISTER_RESOURCE,
    payload: resourceName,
});
