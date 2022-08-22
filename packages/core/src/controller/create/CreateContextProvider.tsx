/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { CreateContext } from './CreateContext';
import { RecordContextProvider } from '../RecordContext';
import { SaveContextProvider } from '../SaveContext';

/**
 *
 * @param param0
 *
 * @example
 *
 * import { CreateContextProvider, useCreateController } from '@stbui/prophet-core';
 *
 * const View = () => {}
 *
 * const App = () => {
 *      const controllerProps = useCreateController(props);
 *      retrun <CreateContextProvider value={controllerProps}><View /></CreateContextProvider>
 * }
 */
export const CreateContextProvider = ({ value, children }) => (
    <CreateContext.Provider value={value}>
        <SaveContextProvider value={value}>
            <RecordContextProvider value={value}>
                {children}
            </RecordContextProvider>
        </SaveContextProvider>
    </CreateContext.Provider>
);
