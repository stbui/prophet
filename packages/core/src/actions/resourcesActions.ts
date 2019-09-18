/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { ResourceDefinition } from './interfaces';

export const REGISTER_RESOURCE = 'REGISTER_RESOURCE';
export const UNREGISTER_RESOURCE = 'UNREGISTER_RESOURCE';

export const registerResource = (resource: ResourceDefinition) => ({
    type: REGISTER_RESOURCE,
    payload: resource,
});

export const unregisterResource = (resourceName: string) => ({
    type: REGISTER_RESOURCE,
    payload: resourceName,
});
