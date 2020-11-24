/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

interface AuthState {
    loading: boolean;
    loaded: boolean;
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
 *     const { loading, authenticated } = useAuthState();
 *     if (loading) {
 *         return <Loading />;
 *     }
 *     if (authenticated) {
 *        return <div>authenticated</div>;
 *     }
 *     return <div></div>;
 * };
 */
const useAuthState = (params = {}): AuthState => {
    const [state, setState] = useState({
        loading: true,
        loaded: false,
        authenticated: true,
    });

    const checkAuth = useCheckAuth();

    useEffect(() => {
        checkAuth(params, false)
            .then(() =>
                setState({ loading: false, loaded: true, authenticated: true })
            )
            .catch(() =>
                setState({ loading: false, loaded: true, authenticated: false })
            );
    }, [JSON.stringify(params), setState]);

    return state;
};

export default useAuthState;
