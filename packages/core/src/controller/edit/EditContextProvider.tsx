/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { EditContext } from './EditContext';
import { RecordContextProvider } from '../RecordContext';
import { SaveContextProvider } from '../SaveContext';

/**
 *
 * @example
 *
 * import { EditContextProvider, useEditController } from '@stbui/prophet-core';
 *
 * const View = () => {}
 *
 * const App = () => {
 *      const controllerProps = useEditController(props);
 *      retrun <EditContextProvider value={controllerProps}><View /></EditContextProvider>
 * }
 */
export const EditContextProvider = ({ value, children }) => (
    <EditContext.Provider value={value}>
        <SaveContextProvider value={value}>
            <RecordContextProvider value={value && value.record}>
                {children}
            </RecordContextProvider>
        </SaveContextProvider>
    </EditContext.Provider>
);
