/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';

import { ResourceDefinitionContext } from './ResourceDefinitionContext';

export const useResourceDefinitionContext = () =>
    useContext(ResourceDefinitionContext);
