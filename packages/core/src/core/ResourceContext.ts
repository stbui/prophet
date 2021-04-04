/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext } from 'react';

/**
 * @example
 *
 * import { useResource, useTranslate } from '@stbui/prophet';
 *
 * const MyCustomEditTitle = props => {
 *     const name = useResource(props);
 *
 *     return (
 *         <h1>{translate(`${name}.name`)}</h1>
 *     );
 * };
 */
export const ResourceContext = createContext(undefined);
