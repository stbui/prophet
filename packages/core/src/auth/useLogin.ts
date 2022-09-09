/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthProvider, defaultAuthParams } from './useAuthProvider';
import { useBasename } from '../routing';
import { useNotificationContext } from '../notification';

type Login = (params: any, pathName?: string) => Promise<any>;

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
export const useLogin = (): Login => {
    const authProvider = useAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const basename = useBasename();

    const { resetNotifications } = useNotificationContext();
    const locationState = location.state as any;
    const nextPathName = locationState && locationState.nextPathname;
    const nextSearch = locationState && locationState.nextSearch;
    const afterLoginUrl = `${basename}/${defaultAuthParams.afterLoginUrl}`;

    const login = useCallback(
        (params: any = {}, pathName) =>
            authProvider.login(params).then(ret => {
                resetNotifications();

                if (ret && ret.hasOwnProperty('redirectTo')) {
                    if (ret) {
                        navigate(ret.redirectTo);
                    }
                } else {
                    const redirectUrl = pathName
                        ? pathName
                        : nextPathName + nextSearch || afterLoginUrl;
                    navigate(redirectUrl);
                }
                return ret;
            }),
        [
            authProvider,
            navigate,
            nextPathName,
            nextSearch,
            resetNotifications,
            afterLoginUrl,
        ]
    );

    const loginWithoutProvider = useCallback(() => {
        resetNotifications();
        navigate(afterLoginUrl);
        return Promise.resolve();
    }, [navigate, resetNotifications, afterLoginUrl]);

    return authProvider ? login : loginWithoutProvider;
};
