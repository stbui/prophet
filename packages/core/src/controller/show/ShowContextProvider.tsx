/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { ShowContext } from './ShowContext';
import { RecordContextProvider } from '../RecordContext';

/**
 *
 * @param param0
 *
 * @example
 *
 * import { ShowContextProvider, ShowContextProvider } from '@stbui/prophet-core';
 *
 * const View = () => {}
 *
 * const App = () => {
 *      const controllerProps = ShowContextProvider(props);
 *      retrun <ShowContextProvider value={controllerProps}><View /></ShowContextProvider>
 * }
 */
export const ShowContextProvider = ({ value, children }) => (
    <ShowContext.Provider value={value}>
        <RecordContextProvider value={value}>{children}</RecordContextProvider>
    </ShowContext.Provider>
);

export default ShowContextProvider;
