/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

/**
 *
 * @param params
 *
 * @example
 *
 * import { useAuthenticated } from '@stbui/prophet-core';
 *
 * const MyApp = () => {
 *   useAuthenticated();
 *   return <div>ok</div>
 * }
 */
const useAuthenticated = (params = {}) => {
    const checkAuth = useCheckAuth();
    useEffect(() => {
        checkAuth(params).catch(() => {});
    }, [checkAuth, params]);
};

export default useAuthenticated;
