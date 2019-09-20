import { useCallback } from 'react';
import useAuthProvider from './useAuthProvider';
import useLogout from './useLogout';
import { useNotify } from '../sideEffect';

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
