import { createContext, useContext } from 'react';

export const EditContext = createContext({
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

export const useEditContext = () => {
    const context = useContext(EditContext);
    return context;
};
