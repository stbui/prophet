import { createContext, useContext } from 'react';

export const CreateContext = createContext({
    basePath: null,
    resource: null,
    record: null,
    loaded: null,
    loading: null,
    redirect: null,
    save: null,
    saving: null,
    successMessage: null,
    version: null,
});

export const useCreateContext = () => {
    const context = useContext(CreateContext);
    return context;
};
