import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

const useAuthenticated = (params = {}) => {
    const checkAuth = useCheckAuth();
    useEffect(() => {
        checkAuth(params).catch(() => {});
    }, [checkAuth, params]);
};

export default useAuthenticated;
