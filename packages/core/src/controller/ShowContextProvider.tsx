import React from 'react';
import { ShowContext } from './ShowContext';
import { RecordContextProvider } from './RecordContext';

export const ShowContextProvider = ({ value, children }) => (
    <ShowContext.Provider value={value}>
        <RecordContextProvider value={value}>{children}</RecordContextProvider>
    </ShowContext.Provider>
);

export default ShowContextProvider;
