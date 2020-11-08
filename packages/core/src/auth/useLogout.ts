/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import useAuthProvider, { defaultAuthParams } from './useAuthProvider';
import { clearState } from '../actions';

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
    const dispatch = useDispatch();
    const authProvider = useAuthProvider();
    const history = useHistory();

    const logout = useCallback(
        (
            params = {},
            redirectTo = defaultAuthParams.loginUrl,
            redirectToCurrentLocationAfterLogin = true
        ) =>
            authProvider.logout(params).then(redirectToFromProvider => {
                dispatch(clearState());
                const redirectToParts = (
                    redirectToFromProvider || redirectTo
                ).split('?');
                const newLocation: any = {
                    pathname: redirectToParts[0],
                };

                if (
                    redirectToCurrentLocationAfterLogin &&
                    history.location &&
                    history.location.pathname
                ) {
                    newLocation.state = {
                        nextPathname: history.location.pathname,
                    };
                }

                if (redirectToParts[1]) {
                    newLocation.search = redirectToParts[1];
                }
                history.push(newLocation);
                return redirectToFromProvider;
            }),
        [authProvider, history, dispatch]
    );

    const logoutWithoutProvider = useCallback(() => {
        history.push({
            pathname: defaultAuthParams.loginUrl,
            state: {
                nextPathname: history.location && history.location.pathname,
            },
        });
        dispatch(clearState());
        return Promise.resolve();
    }, [history]);

    return authProvider ? logout : logoutWithoutProvider;
};

export default useLogout;
