/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuthProvider from './useAuthProvider';

/**
 *
 * @example
 *
 * import { useLogin } from '@stbui/prophet-core';
 *
 * const LoginButton = () => {
 *      const login = useLogin();
 *      const onClick = () => {
 *          login({username:'stbui', password: '123456' }, '/user').then(()=>{
 *              console.log('ok')
 *          })
 *      }
 *      return <button onclick={onClick}>login</buton>
 * }
 */

const useLogin = () => {
    const authProvider = useAuthProvider();
    const history = useHistory();
    const location = useLocation();
    const nextPathName = location.state && location.state.nextPathname;

    const login = useCallback(
        (params = {}, redirectTo = '/') =>
            authProvider.login(params).then(res => {
                history.push(nextPathName || redirectTo);
                return res;
            }),
        [authProvider, history]
    );

    const loginWithoutProvider = useCallback(() => {
        history.push('/');
        return Promise.resolve();
    }, [history]);

    return authProvider ? login : loginWithoutProvider;
};

export default useLogin;
