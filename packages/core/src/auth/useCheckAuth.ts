/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useAuthProvider, defaultAuthParams } from './useAuthProvider';
import { useLogout } from './useLogout';
import { useNotify } from '../notification';
import { useBasename } from '../routing';

type CheckAuth = (
    params?: any,
    logoutOnFailure?: boolean,
    redirectTo?: string,
    disableNotification?: boolean
) => Promise<any>;

/**
 *
 * @example
 *
 * import { useEffect,useState } from 'react';
 * import { useCheckAuth } from '@stbui/prophet-core';
 *
 * const Page = () => {
 *    const checkAuth = useCheckAuth();
 *    useEffect(() => {
 *        checkAuth().catch(() => {});
 *    }, []);
 *
 *    return <div>ok</div>;
 * };
 *
 * const MyApp = () => {
 *    const checkAuth = useCheckAuth();
 *    const [authenticated, setAuthenticated] = useState(true);
 *    useEffect(() => {
 *        checkAuth({}, false).then() => setAuthenticated(true)).catch(() => setAuthenticated(false));
 *    }, []);
 *
 *    return authenticated ? <div>ok</div> : <div>fail</div>;
 * };
 */
export const useCheckAuth = (): CheckAuth => {
    const authProvider = useAuthProvider();
    const logout = useLogout();
    const notify = useNotify();
    const basename = useBasename();
    const loginUrl = `${basename}/${defaultAuthParams.loginUrl}`;

    const checkAuth = useCallback(
        (
            params: any = {},
            logoutOnFailure = true,
            redirectTo = loginUrl,
            disableNotification = false
        ) =>
            authProvider.checkAuth(params).catch(error => {
                if (logoutOnFailure) {
                    logout(
                        {},
                        error && error.redirectTo
                            ? error.redirectTo
                            : redirectTo
                    );

                    const shouldSkipNotify =
                        disableNotification ||
                        (error && error.message === false);

                    !shouldSkipNotify &&
                        notify('prophet.auth.auth_check_error', {
                            type: 'warning',
                        });
                }

                throw error;
            }),
        [authProvider, logout, notify, loginUrl]
    );

    const checkAuthWithoutAuthProvider = () => Promise.resolve();

    return authProvider ? checkAuth : checkAuthWithoutAuthProvider;
};
