/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { useAuthProvider, defaultAuthParams } from './useAuthProvider';
import { useResetStore } from '../store';
import { useBasename } from '../routing';

type Logout = (
    params?: any,
    redirectTo?: string,
    redirectToCurrentLocationAfterLogin?: boolean
) => Promise<any>;

/**
 *
 * @example
 *
 * import { useLogout } from 'prophet-core';
 *
 * const LoginButton = () => {
 *      const logout = useLogout();
 *      const onClick = () => logout();
 *      return <button onclick={onClick}>Logout</buton>
 * }
 */
export const useLogout = (): Logout => {
    const authProvider = useAuthProvider();
    const queryClient = useQueryClient();
    const resetStore = useResetStore();
    const navigate = useNavigate();
    const location = useLocation();
    const basename = useBasename();
    const navigateRef = useRef(navigate);
    const locationRef = useRef(location);
    const loginUrl = `${basename}/${defaultAuthParams.loginUrl}`;

    const logout = useCallback(
        (
            params: any = {},
            redirectTo = loginUrl,
            redirectToCurrentLocationAfterLogin = true
        ) =>
            authProvider.logout(params).then(redirectToFromProvider => {
                if (redirectToFromProvider === false) {
                    resetStore();
                    queryClient.clear();
                    return;
                }

                const redirectToParts = (
                    redirectToFromProvider || redirectTo
                ).split('?');
                const newLocation: any = {
                    pathname: redirectToParts[0],
                };
                let newLocationOptions = {};

                if (
                    redirectToCurrentLocationAfterLogin &&
                    locationRef.current &&
                    locationRef.current.pathname
                ) {
                    newLocationOptions = {
                        state: {
                            nextPathname: locationRef.current.pathname,
                            nextSearch: locationRef.current.search,
                        },
                    };
                }

                if (redirectToParts[1]) {
                    newLocation.search = redirectToParts[1];
                }
                navigateRef.current(newLocation, newLocationOptions);
                resetStore();
                queryClient.clear();

                return redirectToFromProvider;
            }),
        [authProvider, resetStore, loginUrl, queryClient]
    );

    const logoutWithoutProvider = useCallback(() => {
        navigate(
            {
                pathname: loginUrl,
            },
            {
                state: {
                    nextPathname: location && location.pathname,
                },
            }
        );
        resetStore();
        queryClient.clear();
        return Promise.resolve();
    }, [resetStore, location, navigate, loginUrl, queryClient]);

    return authProvider ? logout : logoutWithoutProvider;
};
