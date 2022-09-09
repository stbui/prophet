/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createElement } from 'react';
import { useAuthenticated } from './useAuthenticated';
import { usePermissions } from './usePermissions';

export interface WithPermissionsProps {
    authParams?: object;
    component?: any;
    [key: string]: any;
}
/**
 *
 * @example
 *
 * import { WithPermissions } from '@stuib/prophet-core';
 *
 * const View = ({ permissions }) => {
 *  return <div>{permissions === 'admin' ? <p>admin</p> : null}</div>
 * }
 * const Page = () => {
 *      return <WithPermissions authParams={{ name: 'stbui' }} component={<View permissions={permissions} />}></WithPermissions>
 * }
 */
export const WithPermissions = ({
    authParams,
    component,
    ...rest
}: WithPermissionsProps) => {
    useAuthenticated(authParams);
    const { permissions } = usePermissions(authParams);

    if (component) {
        return createElement(component, { permissions, ...rest });
    }

    return null;
};
