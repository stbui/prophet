/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useHistory } from 'react-router';
import useAuthProvider from './useAuthProvider';

/**
 * import { useLogout } from 'prophet-core';
 * const LoginButton = () => {
 *      const logout = useLogout();
 *      const onClick = () => logout();
 *      return <button onclick={onClick}>Logout</buton>
 * }
 */

const useLogout = () => {
    const authProvider = useAuthProvider();
    const history = useHistory();

    const logout = useCallback(
        (params = {}, redirectTo = '/login') =>
            authProvider.logout(params).then((res: any) => {
                history.push({
                    pathname: res || redirectTo,
                    state: {
                        nextPathname:
                            history.location && history.location.pathname,
                    },
                });
                return res;
            }),
        [authProvider, history]
    );

    const logoutWithoutProvider = useCallback(() => {
        history.push('/login');
        return Promise.resolve();
    }, [history]);

    return authProvider ? logout : logoutWithoutProvider;
};

export default useLogout;
