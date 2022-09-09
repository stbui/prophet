/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useMemo } from 'react';
import defaults from 'lodash/defaults';

import { useResourceDefinitions } from './useResourceDefinitions';
import { useResourceContext } from './useResourceContext';
import { ResourceDefinition } from '../types';

/**
 *
 * const definition = useResourceDefinition();
 * console.log(definition);
 * // {
 * //   name: 'posts',
 * //   hasList: true,
 * //   hasEdit: true,
 * //   hasShow: true,
 * //   hasCreate: true,
 * //   options: {},
 * //   icon: PostIcon,
 * // }
 *
 *
 * const definition = useResourceDefinition({ resource: 'posts' });
 */
export const useResourceDefinition = (
    props?: UseResourceDefinitionOptions
): ResourceDefinition => {
    const resource = useResourceContext(props);
    const resourceDefinitions = useResourceDefinitions();
    const { hasCreate, hasEdit, hasList, hasShow, recordRepresentation } =
        props || {};

    const definition = useMemo(() => {
        return defaults(
            {},
            {
                hasCreate,
                hasEdit,
                hasList,
                hasShow,
                recordRepresentation,
            },
            resourceDefinitions[resource]
        );
    }, [
        resource,
        resourceDefinitions,
        hasCreate,
        hasEdit,
        hasList,
        hasShow,
        recordRepresentation,
    ]);

    return definition;
};

export interface UseResourceDefinitionOptions {
    readonly resource?: string;
    readonly hasList?: boolean;
    readonly hasEdit?: boolean;
    readonly hasShow?: boolean;
    readonly hasCreate?: boolean;
    readonly recordRepresentation?:
        | string
        | React.ReactElement
        | ((record: any) => string);
}
