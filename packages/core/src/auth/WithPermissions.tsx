/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createElement, FunctionComponent } from 'react';
import useAuthenticated from './useAuthenticated';
import usePermissions from './usePermissions';

export interface WithPermissionsProps {
    authParams?: object;
    component?: any;
    children?: any;
    [key: string]: any;
}
/**
 * import { WithPermissions } from 'prophet-core';
 * const View = ({ permissions }) => {
 *  return <div>{permissions === 'admin' ? <p>admin</p> : null}</div>
 * }
 * const Page = () => {
 *      return <WithPermissions authParams={{ name: 'stbui' }} render={({ permissions, ...props }) => <View permissions={permissions} {...props} />}></WithPermissions>
 * }
 */

const WithPermissions: FunctionComponent<WithPermissionsProps> = ({
    authParams,
    component,
    children,
    ...props
}) => {
    useAuthenticated(authParams);
    const { permissions } = usePermissions(authParams);

    if (component) {
        return createElement(component, { permissions, ...props });
    }

    return children({ permissions, ...props });
};

export default WithPermissions as any;
