/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import useAuthProvider from './useAuthProvider';
import useLogout from './useLogout';
import { useNotify } from '../sideEffect';

type LogoutIfAccessDenied = (
    error?: any,
    disableNotification?: boolean
) => Promise<boolean>;

let authCheckPromise;

/**
 *
 * @example
 *
 * import { useLogoutIfAccessDenied, usedataProvider, useNotify } from '@stbui/prophet-core';
 *
 * const test = () => {
 *     const dataProvider = usedataProvider;
 *     const logoutIfAccessDenied = useLogoutIfAccessDenied();
 *     const notify = useNotify()
 * 
 *     useEffect(() => {
 *         dataProvider.getOne('secret', { id: 123 })
 *             .catch(error => {
 *                  logoutIfAccessDenied(error);
 *                  notify('server error', 'warning');
 *              })
 *     }, []);
Ï * }
 */
const useLogoutIfAccessDenied = (): LogoutIfAccessDenied => {
    const authProvider = useAuthProvider();
    const logout = useLogout();
    const notify = useNotify();

    const logoutIfAccessDenied = useCallback(
        (error?: any, disableNotification?: boolean) => {
            if (!authCheckPromise) {
                authCheckPromise = authProvider
                    .checkError(error)
                    .then(() => false)
                    .catch(async e => {
                        const redirectTo =
                            e && e.redirectTo
                                ? e.redirectTo
                                : error && error.redirectTo
                                ? error.redirectTo
                                : undefined;

                        logout({}, redirectTo);

                        const shouldSkipNotify =
                            disableNotification ||
                            (e && e.message === false) ||
                            (error && error.message === false);
                        !shouldSkipNotify &&
                            notify(
                                'prophet.notification.logged_out',
                                'warning'
                            );
                        return true;
                    })
                    .finally(() => {
                        authCheckPromise = undefined;
                    });
            }

            return authCheckPromise;
        },
        [authProvider, logout, notify]
    );

    const logoutIfAccessDeniedWithoutProvider = () => Promise.resolve(false);

    return authProvider
        ? logoutIfAccessDenied
        : logoutIfAccessDeniedWithoutProvider;
};

export default useLogoutIfAccessDenied;
