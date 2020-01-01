/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import useAuthProvider from './useAuthProvider';
import useLogout from './useLogout';
import { useNotify } from '../sideEffect';

/*
import { useEffect,useState } from 'react';
import { useCheckAuth } from '@stbui/prophet-core';

const Page = () => {
    const checkAuth = useCheckAuth();
    useEffect(() => {
        checkAuth().catch(() => {});
    }, []);

    return <div>ok</div>;
};

const Page = () => {
    const checkAuth = useCheckAuth();
    const [authenticated, setAuthenticated] = useState(true);
    useEffect(() => {
        checkAuth({}, false).then() => setAuthenticated(true)).catch(() => setAuthenticated(false));
    }, []);

    return authenticated ? <div>ok</div> : <div>fail</div>;
}; 
*/

const useCheckAuth = () => {
    const authProvider = useAuthProvider();
    const logout = useLogout();
    const notify = useNotify();

    const checkAuth = useCallback(
        (params = {}, logoutOnFailure = true, redirectTo = '/login') =>
            authProvider.checkAuth(params).catch(error => {
                if (logoutOnFailure) {
                    logout(
                        {},
                        error && error.redirectTo
                            ? error.redirectTo
                            : redirectTo
                    );

                    notify('登陆失效', 'error');
                }

                throw error;
            }),
        [authProvider, logout]
    );

    const checkAuthWithoutAuthProvider = useCallback(() => {
        return Promise.resolve();
    }, [history]);

    return authProvider ? checkAuth : checkAuthWithoutAuthProvider;
};

export default useCheckAuth;
