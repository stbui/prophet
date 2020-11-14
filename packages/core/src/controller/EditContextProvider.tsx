import React from 'react';
import { EditContext } from './EditContext';
import { RecordContextProvider } from './RecordContext';
import { SaveContextProvider } from './SaveContext';

export const EditContextProvider = ({ value, children }) => (
    <EditContext.Provider value={value}>
        <SaveContextProvider value={value}>
            <RecordContextProvider value={value}>
                {children}
            </RecordContextProvider>
        </SaveContextProvider>
    </EditContext.Provider>
);

export default EditContextProvider;
