/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext } from 'react';
import { AuthProvider, UserIdentity } from '../types';

const defaultIdentity: UserIdentity = { id: '' };

const defaultProvider: AuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getIdentity: () => Promise.resolve(defaultIdentity),
};

export const AuthProviderContext = createContext<AuthProvider>(defaultProvider);
