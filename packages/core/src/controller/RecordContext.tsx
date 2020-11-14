/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { createContext, useContext } from 'react';

export const RecordContext = createContext(undefined);

/**
 * @example
 *
 * const { record }  = useRecordContext()
 */
export const useRecordContext = () => {
    const context = useContext(RecordContext);

    return context;
};

/**
 *
 * @param param0
 *
 * @example
 *
 * import { RecordContext, useEditController, useRecordContext } from '@stbui/prophet-core';
 *
 * const  View = () => {
 *     const { record } = useRecordContext();
 * }
 *
 * const App = () => {
 *     const { record }= useEditController(props);
 *     return (
 *         <RecordContextProvider value={record}>
 *             <View />
 *         </RecordContextProvider>
 *     );
 * }
 */
export const RecordContextProvider = ({ value, children }) => (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
);
