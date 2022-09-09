/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { ResourceDefinitions } from './ResourceDefinitionContext';
import { useResourceDefinitionContext } from './useResourceDefinitionContext';

/**
 *
 * @example
 *
 * const definitions = useResourceDefinitions();
 * console.log(definitions.posts);
 * // {
 * //   name: 'posts',
 * //   hasList: true,
 * //   hasEdit: true,
 * //   hasShow: true,
 * //   hasCreate: true,
 * //   options: {},
 * //   icon: PostIcon,
 * //   recordRepresentation: 'title',
 * // }
 */
export const useResourceDefinitions = (): ResourceDefinitions =>
    useResourceDefinitionContext().definitions;
