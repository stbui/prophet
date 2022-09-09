/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useAuthProvider } from './useAuthProvider';
import { useLogout } from './useLogout';
import { useNotify } from '../notification';

type LogoutIfAccessDenied = (
    error?: any,
    disableNotification?: boolean
) => Promise<boolean>;

let timer;

const getErrorMessage = (error, defaultMessage) =>
    typeof error === 'string'
        ? error
        : typeof error === 'undefined' || !error.message
        ? defaultMessage
        : error.message;

const logoutIfAccessDeniedWithoutProvider = () => Promise.resolve(false);

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
export const useLogoutIfAccessDenied = (): LogoutIfAccessDenied => {
    const authProvider = useAuthProvider();
    const logout = useLogout();
    const notify = useNotify();
    const navigate = useNavigate();

    const logoutIfAccessDenied = useCallback(
        (error?: any, disableNotification?: boolean) =>
            authProvider
                .checkError(error)
                .then(() => false)
                .catch(async e => {
                    const logoutUser = e?.logoutUser ?? true;

                    if (timer) {
                        return true;
                    }
                    timer = setTimeout(() => {
                        timer = undefined;
                    }, 0);

                    const shouldNotify = !(
                        disableNotification ||
                        (e && e.message === false) ||
                        (error && error.message === false)
                    );
                    if (shouldNotify) {
                        authProvider
                            .checkAuth({})
                            .then(() => {
                                if (logoutUser) {
                                    notify(
                                        getErrorMessage(
                                            e,
                                            'ra.notification.logged_out'
                                        ),
                                        { type: 'warning' }
                                    );
                                } else {
                                    notify(
                                        getErrorMessage(
                                            e,
                                            'ra.notification.not_authorized'
                                        ),
                                        { type: 'warning' }
                                    );
                                }
                            })
                            .catch(() => {});
                    }
                    const redirectTo =
                        e && e.redirectTo
                            ? e.redirectTo
                            : error && error.redirectTo
                            ? error.redirectTo
                            : undefined;

                    if (logoutUser) {
                        logout({}, redirectTo);
                    } else {
                        navigate(redirectTo);
                    }

                    return true;
                }),
        [authProvider, logout, notify, navigate]
    );

    return authProvider
        ? logoutIfAccessDenied
        : logoutIfAccessDeniedWithoutProvider;
};
