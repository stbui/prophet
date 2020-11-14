import React from 'react';
import { CreateContext } from './CreateContext';
import { RecordContextProvider } from './RecordContext';
import { SaveContextProvider } from './SaveContext';

export const CreateContextProvider = ({ value, children }) => (
    <CreateContext.Provider value={value}>
        <SaveContextProvider value={value}>
            <RecordContextProvider value={value}>
                {children}
            </RecordContextProvider>
        </SaveContextProvider>
    </CreateContext.Provider>
);

export default CreateContextProvider;
