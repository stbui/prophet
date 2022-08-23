/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useLocation, useNavigate, Path } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import useAuthProvider, { defaultAuthParams } from './useAuthProvider';

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
const useLogout = (): Logout => {
    const authProvider = useAuthProvider();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useCallback(
        (
            params: any = {},
            redirectTo = defaultAuthParams.loginUrl,
            redirectToCurrentLocationAfterLogin = true
        ) =>
            authProvider.logout(params).then(redirectToFromProvider => {
                const redirectToParts = (
                    redirectToFromProvider || redirectTo
                ).split('?');
                const newLocation: any = {
                    pathname: redirectToParts[0],
                };

                if (
                    redirectToCurrentLocationAfterLogin &&
                    location &&
                    location.pathname
                ) {
                    newLocation.state = {
                        nextPathname: location.pathname,
                    };
                }

                if (redirectToParts[1]) {
                    newLocation.search = redirectToParts[1];
                }
                navigate(newLocation);
                return redirectToFromProvider;
            }),
        [authProvider, history]
    );

    const logoutWithoutProvider = useCallback(() => {
        // navigate({
        //     pathname: defaultAuthParams.loginUrl,
        //     {
        //         state: {
        //             nextPathname: location && location.pathname,
        //         },
        //     }
        // });

        // clear store
        return Promise.resolve();
    }, [navigate]);

    return authProvider ? logout : logoutWithoutProvider;
};

export default useLogout;
