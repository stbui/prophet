/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { ResourceContext } from './ResourceContext';

export const ResourceContextProvider = ({ children, value }) => (
    <ResourceContext.Provider value={value}>
        {children}
    </ResourceContext.Provider>
);
