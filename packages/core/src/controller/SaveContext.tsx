/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { createContext, useContext } from 'react';

export const SaveContext = createContext({});

/**
 * @example
 *
 * const { save, saving }  = useSaveContext()
 */
export const useSaveContext = () => {
    const context = useContext(SaveContext);

    return context;
};

/**
 *
 * @param param0
 *
 * @example
 *
 * import { SaveContextProvider, useEditController, useRecordContext } from '@stbui/prophet-core';
 *
 * const  View = () => {
 *     const { record } = useRecordContext();
 * }
 *
 * const App = () => {
 *     const { record }= useEditController(props);
 *     return (
 *         <SaveContextProvider value={record}>
 *             <View />
 *         </SaveContextProvider>
 *     );
 * }
 */
export const SaveContextProvider = ({ value, children }) => (
    <SaveContext.Provider value={value}>{children}</SaveContext.Provider>
);
