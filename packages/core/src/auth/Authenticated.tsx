/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { ReactNode } from 'react';
import { useAuthState } from './useAuthState';

export interface AuthenticatedProps {
    children: ReactNode;
    authParams?: object;
    requireAuth?: boolean;
}

/**
 *
 * @param props.authParams
 * @param props.location
 * @param props.location
 *
 * @example
 *
 * import { Authenticated } from '@stbui/prophet-core';
 *
 * const View = () => <div></div>;
 * const MyApp = () => <Authenticated authParams={{ name: 'stbui' }}><View /></Authenticated>
 */
export const Authenticated = (props: AuthenticatedProps) => {
    const { authParams, children, requireAuth = false } = props;

    const { isLoading, authenticated } = useAuthState(authParams, true);

    if ((requireAuth && isLoading) || !authenticated) {
        return null;
    }

    return children;
};
