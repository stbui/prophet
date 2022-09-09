/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEffect } from 'react';
import { useCheckAuth } from './useCheckAuth';

export type UseAuthenticatedOptions<ParamsType> = {
    enabled?: boolean;
    params?: ParamsType;
};

/**
 *
 * @param options
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
export const useAuthenticated = <ParamsType = any>(
    options: UseAuthenticatedOptions<ParamsType> = {}
) => {
    const { enabled = true, params = {} } = options;

    const checkAuth = useCheckAuth();
    useEffect(() => {
        if (enabled) {
            checkAuth(params).catch(() => {});
        }
    }, [checkAuth, enabled, params]);
};
