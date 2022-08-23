/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { BasenameContext } from './BasenameContext';

export const BasenameContextProvider = ({ children, basename }) => (
    <BasenameContext.Provider value={basename}>
        {children}
    </BasenameContext.Provider>
);
