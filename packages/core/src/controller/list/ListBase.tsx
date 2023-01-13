/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

// @ts-nocheck
import React from 'react';
import { useListController, ListControllerProps } from './useListController';
import { ListContextProvider } from './ListContextProvider';
import { ResourceContextProvider } from '../../core';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <ListBase {...props}>list</ListBase>
 */
export const ListBase = ({ children, ...props }: ListControllerProps) => (
    <ResourceContextProvider value={props.resource}>
        <ListContextProvider value={useListController(props)}>
            {children}
        </ListContextProvider>
    </ResourceContextProvider>
);
