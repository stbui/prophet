/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { createContext, useCallback, useState, useMemo } from 'react';
import isEqual from 'lodash/isEqual';

import { ResourceDefinition } from '../types';

export type ResourceDefinitions = {
    [name: string]: ResourceDefinition;
};

export type ResourceDefinitionContextValue = {
    definitions: ResourceDefinitions;
    register: (config: ResourceDefinition) => void;
    unregister: (config: ResourceDefinition) => void;
};

export const ResourceDefinitionContext =
    createContext<ResourceDefinitionContextValue>({
        definitions: {},
        register: () => {},
        unregister: () => {},
    });

/**
 * @example
 *
 * import { useResourceDefinition, useTranslate } from '@stbui/prophet';
 *
 * const PostMenuItem = () => {
 *     const { name, icon } = useResourceDefinition({ resource: 'posts' });
 *
 *     return (
 *          <MenuItem>
 *              <ListItemIcon>{icon}</ListItemIcon>
 *              {name}
 *          </MenuItem>
 *     );
 * };
 */
export const ResourceDefinitionContextProvider = ({
    definitions: defaultDefinitions = {},
    children,
}: {
    definitions?: ResourceDefinitions;
    children: React.ReactNode;
}) => {
    const [definitions, setState] =
        useState<ResourceDefinitions>(defaultDefinitions);

    const register = useCallback((config: ResourceDefinition) => {
        setState(prev =>
            isEqual(prev[config.name], config)
                ? prev
                : {
                      ...prev,
                      [config.name]: config,
                  }
        );
    }, []);

    const unregister = useCallback((config: ResourceDefinition) => {
        setState(prev => {
            const { [config.name]: _, ...rest } = prev;
            return rest;
        });
    }, []);

    const contextValue = useMemo(
        () => ({ definitions, register, unregister }),
        [definitions]
    );

    return (
        <ResourceDefinitionContext.Provider value={contextValue}>
            {children}
        </ResourceDefinitionContext.Provider>
    );
};
