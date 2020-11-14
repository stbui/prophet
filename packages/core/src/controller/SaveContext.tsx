import React, { createContext, useContext } from 'react';

export const SaveContext = createContext({});

export const useSaveContext = () => {
    const context = useContext(SaveContext);

    return context;
};

export const SaveContextProvider = ({ value, children }) => (
    <SaveContext.Provider value={value}>{children}</SaveContext.Provider>
);
