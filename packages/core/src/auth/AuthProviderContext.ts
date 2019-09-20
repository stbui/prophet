import { createContext } from 'react';

const defaultProvider = {
    login: params => Promise.resolve(),
    logout: params => Promise.resolve(),
    checkAuth: params => Promise.resolve(),
    checkError: params => Promise.resolve(),
    getPermissions: params => Promise.resolve(),
};

const AuthProviderContext = createContext(defaultProvider);

export default AuthProviderContext;
