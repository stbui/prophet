/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { cloneElement, FunctionComponent, ReactElement } from 'react';
import useAuthenticated from './useAuthenticated';

export interface AuthenticatedProps {
    children: ReactElement<any>;
    authParams?: object;
    location?: object;
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
const Authenticated: FunctionComponent<AuthenticatedProps> = ({
    children,
    authParams,
    location,
    ...rest
}) => {
    useAuthenticated(authParams);

    return cloneElement(children, rest);
};

export default Authenticated;
