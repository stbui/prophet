import { useCallback } from 'react';
import useAuthProvider from './useAuthProvider';

const useGetPermissions = (params = {}) => {
    const authProvider = useAuthProvider();

    const checkAuth = useCallback(
        (params = {}) => authProvider.getPermissions(params),
        [authProvider]
    );

    const getPermissionsWithoutProvider = useCallback(() => {
        return Promise.resolve([]);
    }, [authProvider]);

    return authProvider ? checkAuth : getPermissionsWithoutProvider;
};

export default useGetPermissions;
