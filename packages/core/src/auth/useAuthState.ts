/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useEffect } from 'react';
import { useCheckAuth } from './useCheckAuth';

interface AuthState {
    isLoading: boolean;
    authenticated?: boolean;
}

/**
 *
 * @param params
 *
 * @example
 *
 * import { useAuthState } from '@stbui/prophet-core';
 *
 *
 * const MyApp = () => {
 *     const { isLoading, authenticated } = useAuthState();
 *     if (isLoading) {
 *         return <div>{isLoading}</div>;
 *     }
 *     if (authenticated) {
 *        return <div>authenticated</div>;
 *     }
 *     return <div>ok</div>;
 * };
 */
export const useAuthState = (
    params: any = {},
    logoutOnFailure: boolean = false
): AuthState => {
    const [state, setState] = useState({
        isLoading: true,
        authenticated: true,
    });

    const checkAuth = useCheckAuth();

    useEffect(() => {
        checkAuth(params, logoutOnFailure)
            .then(() => setState({ isLoading: false, authenticated: true }))
            .catch(() => setState({ isLoading: false, authenticated: false }));
    }, [checkAuth, JSON.stringify(params), logoutOnFailure, setState]);

    return state;
};
