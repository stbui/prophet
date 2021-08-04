/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';
import { ResourceContext } from './ResourceContext';

/**
 *
 * @example
 *
 * import { useResourceContext, useGetResourceLabel } from '@stbui/prophet';
 *
 * const ResourceName = (props) => {
 *   const { resource } = useResourceContext(props);
 *   const getResourceLabel = useGetResourceLabel();
 *
 *   return getResourceLabel(resource);
 * }
 *
 * const App = () => {
 *   <ResourceContextProvider value="users">
 *      <ResourceName />
 *   </ResourceContextProvider>
 * }
 *
 * const Page = () => {
 *   return <ResourceName resource="users"/>
 * }
 *
 */
export const useResourceContext = props => {
    const context = useContext(ResourceContext);

    return (props && props.resource) || context;
};
