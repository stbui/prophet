/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

// @ts-nocheck
import React from 'react';
import { useListController, ListControllerProps } from './useListController';
import { ListContextProvider } from './ListContextProvider';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <ListBase {...props}>list</ListBase>
 */
export const ListBase = ({ children, ...props }) => (
    <ListContextProvider value={useListController(props)}>
        {children}
    </ListContextProvider>
);
