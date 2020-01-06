/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { cloneElement, FunctionComponent } from 'react';
import useAuthenticated from './useAuthenticated';

export interface AuthenticatedProps {
    children: any;
    authParams?: object;
    location?: object;
}

/*
import { Authenticated } from '@stbui/prophet-core';
import View from './View';

const Page = () => (
    <Authenticated authParams={{ name: 'stbui' }}>
        <View />
    </Authenticated>
);
*/

const Authenticated: FunctionComponent<AuthenticatedProps> = ({
    children,
    authParams,
    location,
    ...other
}) => {
    useAuthenticated(authParams);

    return cloneElement(children, other);
};

export default Authenticated;
