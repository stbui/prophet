import { createContext, useContext } from 'react';

export const ShowContext = createContext({
    basePath: null,
    resource: null,
    record: null,
    loaded: null,
    loading: null,
    version: null,
});

export const useShowContext = () => {
    const context = useContext(ShowContext);
    return context;
};
