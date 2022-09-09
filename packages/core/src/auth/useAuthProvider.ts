/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';
import { AuthProviderContext } from './AuthProviderContext';
import { AuthProvider } from '../types';

export const defaultAuthParams = {
    loginUrl: '/login',
    afterLoginUrl: '/',
};

export const useAuthProvider = (): AuthProvider =>
    useContext(AuthProviderContext);
